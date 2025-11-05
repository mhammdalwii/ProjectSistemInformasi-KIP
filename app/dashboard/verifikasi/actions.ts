"use server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import prismadb from "@/lib/db";
import { Role, StatusKIP } from "@prisma/client";
import { revalidatePath } from "next/cache";
import z from "zod";

type ActionResult = {
  success: boolean;
  message: string;
};

// Fungsi Helper Keamanan: Memastikan hanya ADMIN yang bisa
async function verifyAdmin(): Promise<boolean> {
  const session = await getServerSession(authOptions);
  if (session?.user?.role !== Role.ADMIN) {
    return false;
  }
  return true;
}

// Aksi untuk menyetujui (verifikasi)
export async function approveSiswa(userId: string): Promise<ActionResult> {
  if (!(await verifyAdmin())) {
    return { success: false, message: "Akses ditolak (Bukan Admin)." };
  }

  try {
    await prismadb.user.update({
      where: { id: userId, role: Role.SISWA }, // Pastikan kita hanya update siswa
      data: {
        status: StatusKIP.DITERIMA,
      },
    });

    revalidatePath("/dashboard");
    revalidatePath(`/dashboard/verifikasi/${userId}`);
    return { success: true, message: "Siswa berhasil disetujui." };
  } catch (error) {
    return { success: false, message: "Gagal memperbarui data." };
  }
}

// Aksi untuk menolak
export async function rejectSiswa(userId: string): Promise<ActionResult> {
  if (!(await verifyAdmin())) {
    return { success: false, message: "Akses ditolak (Bukan Admin)." };
  }

  try {
    await prismadb.user.update({
      where: { id: userId, role: Role.SISWA },
      data: {
        status: StatusKIP.DITOLAK,
      },
    });

    revalidatePath("/dashboard");
    revalidatePath(`/dashboard/verifikasi/${userId}`);
    return { success: true, message: "Siswa berhasil ditolak." };
  } catch (error) {
    return { success: false, message: "Gagal memperbarui data." };
  }
}

// Aksi untuk mengembalikan status (jika admin salah klik)
export async function resetSiswa(userId: string): Promise<ActionResult> {
  if (!(await verifyAdmin())) {
    return { success: false, message: "Akses ditolak (Bukan Admin)." };
  }

  try {
    await prismadb.user.update({
      where: { id: userId, role: Role.SISWA },
      data: {
        status: StatusKIP.PROSES,
      },
    });

    revalidatePath("/dashboard");
    revalidatePath(`/dashboard/verifikasi/${userId}`);
    return { success: true, message: "Status siswa dikembalikan ke 'Proses'." };
  } catch (error) {
    return { success: false, message: "Gagal reset data." };
  }
}

const AdminEditSchema = z.object({
  userId: z.string().cuid("ID User tidak valid"),
  name: z.string().min(3, "Nama wajib diisi"),
  email: z.string().email("Email tidak valid"),
  nisn: z.string().min(5, "NISN wajib diisi"),
  kelas: z.string().optional(),
  nomorKIP: z.string().optional(),
  tahunPenerimaan: z.coerce.number().optional(),
});
/**
 * Meng-update data profil siswa (full akses oleh Admin)
 */
export async function adminUpdateSiswa(formData: FormData): Promise<ActionResult> {
  // Keamanan: Cek apakah ini Admin
  if (!(await verifyAdmin())) {
    return { success: false, message: "Akses ditolak." };
  }

  // Validasi data
  // 'Object.fromEntries' mengubah FormData menjadi objek biasa
  const validatedFields = AdminEditSchema.safeParse(Object.fromEntries(formData.entries()));

  if (!validatedFields.success) {
    // Kirim pesan error validasi pertama
    const firstError = validatedFields.error.issues[0]?.message || "Data tidak valid.";
    return { success: false, message: firstError };
  }

  const { userId, ...dataToUpdate } = validatedFields.data;

  try {
    // Update data siswa di database
    await prismadb.user.update({
      where: {
        id: userId,
        role: Role.SISWA, // Keamanan tambahan: pastikan yang diedit adalah SISWA
      },
      data: {
        ...dataToUpdate,
        // Konversi string kosong menjadi null agar valid di database
        kelas: dataToUpdate.kelas || null,
        nomorKIP: dataToUpdate.nomorKIP || null,
        tahunPenerimaan: dataToUpdate.tahunPenerimaan || null,
      },
    });

    // Revalidasi path (agar data baru tampil)
    revalidatePath("/dashboard/verifikasi"); // Refresh tabel utama
    revalidatePath(`/dashboard/verifikasi/${userId}`); // Refresh halaman detail
    return { success: true, message: "Data siswa berhasil diperbarui." };
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    // 5. Tangani error duplikat (NISN, Email, NomorKIP)
    if (error.code === "P2002") {
      if (error.meta?.target.includes("nisn")) {
        return { success: false, message: "NISN ini sudah terdaftar." };
      }
      if (error.meta?.target.includes("email")) {
        return { success: false, message: "Email ini sudah terdaftar." };
      }
      if (error.meta?.target.includes("nomorKIP")) {
        return { success: false, message: "Nomor KIP ini sudah terdaftar." };
      }
    }
    return { success: false, message: "Gagal memperbarui data." };
  }
}
