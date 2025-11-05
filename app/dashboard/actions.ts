"use server";
import prismadb from "@/lib/db";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { z } from "zod";

// 1. Definisikan skema validasi data menggunakan Zod
export const SiswaSchema = z.object({
  nisn: z.string().min(5, "NISN wajib diisi (minimal 5 karakter)"),
  name: z.string().min(3, "Nama wajib diisi (minimal 3 karakter)"),
  kelas: z.string().optional(),
  status: z.enum(["BELUM_DIAJUKAN", "PROSES", "DITERIMA", "DITOLAK"]),
  nomorKIP: z.string().optional(),
  tahunPenerimaan: z.coerce.number().optional().nullable(),
});

const UpdateSiswaSchema = SiswaSchema.extend({
  id: z.string().cuid("ID Siswa tidak valid"),
});

// Type untuk response error
type ActionState = {
  errors?: {
    nisn?: string[];
    name?: string[];
    kelas?: string[];
    status?: string[];
    nomorKIP?: string[];
    tahunPenerimaan?: string[];
  };
  message?: string;
  success?: boolean;
};

// Ini adalah fungsi utama yang akan dipanggil oleh formulir
export async function createSiswa(prevState: ActionState, formData: FormData): Promise<ActionState> {
  // 2. Ubah FormData menjadi objek biasa dan validasi
  const validatedFields = SiswaSchema.safeParse({
    nisn: formData.get("nisn"),
    name: formData.get("name"),
    kelas: formData.get("kelas"),
    status: formData.get("status"),
    nomorKIP: formData.get("nomorKIP"),
    tahunPenerimaan: formData.get("tahunPenerimaan"),
  });

  // 3. Jika data tidak valid, kembalikan error
  if (!validatedFields.success) {
    console.error("Validation error:", validatedFields.error.flatten());
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: "Data tidak valid. Silakan periksa kembali.",
    };
  }

  // 4. Ambil data yang sudah bersih
  const { nisn, name, kelas, status, nomorKIP, tahunPenerimaan } = validatedFields.data;

  // 5. Simpan ke database
  try {
    await prismadb.user.create({
      data: {
        nisn: nisn,
        name: name,
        kelas: kelas || null,
        status: status,
        nomorKIP: nomorKIP || null,
        tahunPenerimaan: tahunPenerimaan || null,
        email: `${nisn}@example.com`,
        password: nisn,
      },
    });
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    console.error("Database error:", error);
    // Tangani error jika NISN sudah ada (unique constraint)
    if (error.code === "P2002") {
      return {
        message: "NISN ini sudah terdaftar di sistem.",
      };
    }
    return {
      message: "Gagal menyimpan data ke database.",
    };
  }

  // 6. Jika berhasil:
  // - Bersihkan cache data di halaman dashboard
  revalidatePath("/dashboard");
  // - Arahkan pengguna kembali ke halaman dashboard
  redirect("/dashboard");
}

// Fungsi untuk menghapus data siswa
export async function deleteSiswa(siswaId: string): Promise<ActionState> {
  if (!siswaId) {
    return {
      message: "ID Siswa tidak valid.",
    };
  }

  try {
    // 1. Hapus data siswa dari database
    await prismadb.user.delete({
      where: {
        id: siswaId,
      },
    });

    // 2. Beri tahu Next.js untuk refresh data di halaman dashboard
    revalidatePath("/dashboard");

    // 3. Kembalikan pesan sukses
    return {
      success: true,
      message: "Data siswa berhasil dihapus.",
    };
  } catch (error) {
    console.error("Delete error:", error);
    return {
      message: "Gagal menghapus data. Pastikan data siswa ada di sistem.",
    };
  }
}

// --- FUNGSI UPDATE (BARU) ---
export async function updateSiswa(prevState: ActionState, formData: FormData): Promise<ActionState> {
  // 1. Validasi data
  const validatedFields = UpdateSiswaSchema.safeParse({
    id: formData.get("id"),
    nisn: formData.get("nisn"),
    name: formData.get("name"),
    kelas: formData.get("kelas"),
    status: formData.get("status"),
    nomorKIP: formData.get("nomorKIP"),
    tahunPenerimaan: formData.get("tahunPenerimaan"),
  });

  // 2. Jika data tidak valid
  if (!validatedFields.success) {
    console.error("Update validation error:", validatedFields.error.flatten());
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: "Data tidak valid. Silakan periksa kembali.",
    };
  }

  // 3. Ambil data yang sudah bersih
  const { id, nisn, name, kelas, status, nomorKIP, tahunPenerimaan } = validatedFields.data;

  // 4. Update data di database
  try {
    await prismadb.user.update({
      where: {
        id: id,
      },
      data: {
        nisn: nisn,
        name: name,
        kelas: kelas || null,
        status: status,
        nomorKIP: nomorKIP || null,
        tahunPenerimaan: tahunPenerimaan || null,
      },
    });
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    console.error("Update database error:", error);
    // Tangani jika NISN baru ternyata duplikat
    if (error.code === "P2002") {
      return {
        message: "NISN ini sudah terdaftar untuk siswa lain.",
      };
    }
    return {
      message: "Gagal memperbarui data.",
    };
  }

  // 5. Jika berhasil:
  revalidatePath("/dashboard");
  redirect("/dashboard");
}

// Fungsi untuk update document URL (dari komponen upload)
export async function updateDocumentUrl(userId: string, docKey: string, url: string): Promise<ActionState> {
  if (!userId || !docKey || !url) {
    return {
      message: "Data tidak lengkap.",
    };
  }

  try {
    await prismadb.user.update({
      where: {
        id: userId,
      },
      data: {
        [docKey]: url,
      },
    });

    revalidatePath("/siswa/dashboard");
    return {
      success: true,
      message: "Dokumen berhasil diupdate.",
    };
  } catch (error) {
    console.error("Update document error:", error);
    return {
      message: "Gagal menyimpan URL dokumen.",
    };
  }
}

// Fungsi untuk submit verifikasi
export async function submitVerification(userId: string): Promise<ActionState> {
  if (!userId) {
    return {
      message: "ID Siswa tidak valid.",
    };
  }

  try {
    await prismadb.user.update({
      where: {
        id: userId,
      },
      data: {
        status: "PROSES",
      },
    });

    revalidatePath("/siswa/dashboard");
    return {
      success: true,
      message: "Verifikasi berhasil diajukan.",
    };
  } catch (error) {
    console.error("Submit verification error:", error);
    return {
      message: "Gagal mengajukan verifikasi.",
    };
  }
}
