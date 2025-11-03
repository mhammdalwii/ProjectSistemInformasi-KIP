"use server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import prismadb from "@/lib/db";
import { Role, StatusKIP } from "@prisma/client";
import { revalidatePath } from "next/cache";

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
