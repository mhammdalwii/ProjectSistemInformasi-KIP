"use server"; // <-- Menandakan ini adalah Server Action
import prismadb from "@/lib/db";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { z } from "zod";

// 1. Definisikan skema validasi data menggunakan Zod
const SiswaSchema = z.object({
  nisn: z.string().min(5, "NISN wajib diisi (minimal 5 karakter)"),
  name: z.string().min(3, "Nama wajib diisi (minimal 3 karakter)"),
  kelas: z.string().optional(), // Kelas boleh kosong
  status: z.enum(["PROSES", "DITERIMA", "DITOLAK"]), // Harus salah satu dari ini
});

const UpdateSiswaSchema = SiswaSchema.extend({
  id: z.string().cuid("ID Siswa tidak valid"),
});

// Ini adalah fungsi utama yang akan dipanggil oleh formulir
export async function createSiswa(formData: FormData) {
  // 2. Ubah FormData menjadi objek biasa dan validasi
  const validatedFields = SiswaSchema.safeParse({
    nisn: formData.get("nisn"),
    name: formData.get("name"),
    kelas: formData.get("kelas"),
    status: formData.get("status"),
  });

  // 3. Jika data tidak valid, kembalikan error
  if (!validatedFields.success) {
    console.error(validatedFields.error);
    // Di aplikasi nyata, kita akan kirim pesan error ini ke form
    // Untuk saat ini, kita lempar error sederhana
    throw new Error("Data tidak valid.");
  }

  // 4. Ambil data yang sudah bersih
  const { nisn, name, kelas, status } = validatedFields.data;

  // 5. Simpan ke database
  try {
    await prismadb.siswa.create({
      data: {
        nisn: nisn,
        name: name,
        kelas: kelas || null, // Simpan null jika 'kelas' kosong
        status: status,
      },
    });
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    // Tangani error jika NISN sudah ada (unique constraint)
    if (error.code === "P2002") {
      throw new Error("NISN ini sudah terdaftar di sistem.");
    }
    throw new Error("Gagal menyimpan data ke database.");
  }

  // 6. Jika berhasil:
  // - Bersihkan cache data di halaman dashboard
  revalidatePath("/dashboard");
  // - Arahkan pengguna kembali ke halaman dashboard

  // --- FUNGSI DELETE (BARU) ---
  redirect("/dashboard");
}

// Fungsi untuk menghapus data siswa
export async function deleteSiswa(siswaId: string) {
  if (!siswaId) {
    throw new Error("ID Siswa tidak valid.");
  }

  try {
    // 1. Hapus data siswa dari database
    await prismadb.siswa.delete({
      where: {
        id: siswaId,
      },
    });

    // 2. Beri tahu Next.js untuk refresh data di halaman dashboard
    revalidatePath("/dashboard");

    // 3. Kembalikan pesan sukses (opsional)
    return { success: true, message: "Data siswa berhasil dihapus." };
  } catch (error) {
    console.error(error);
    throw new Error("Gagal menghapus data.");
  }
}

// --- FUNGSI UPDATE (BARU) ---
export async function updateSiswa(formData: FormData) {
  // 1. Validasi data
  const validatedFields = UpdateSiswaSchema.safeParse({
    id: formData.get("id"),
    nisn: formData.get("nisn"),
    name: formData.get("name"),
    kelas: formData.get("kelas"),
    status: formData.get("status"),
  });

  // 2. Jika data tidak valid
  if (!validatedFields.success) {
    console.error(validatedFields.error);
    throw new Error("Data tidak valid.");
  }

  // 3. Ambil data yang sudah bersih
  const { id, nisn, name, kelas, status } = validatedFields.data;

  // 4. Update data di database
  try {
    await prismadb.siswa.update({
      where: {
        id: id, // <-- Tentukan siswa mana yang akan di-update
      },
      data: {
        // <-- Data barunya
        nisn: nisn,
        name: name,
        kelas: kelas || null,
        status: status,
      },
    });
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    // Tangani jika NISN baru ternyata duplikat
    if (error.code === "P2002") {
      throw new Error("NISN ini sudah terdaftar untuk siswa lain.");
    }
    throw new Error("Gagal memperbarui data.");
  }

  // 5. Jika berhasil:
  revalidatePath("/dashboard"); // Refresh data di dashboard
  redirect("/dashboard"); // Kembalikan ke dashboard
}
