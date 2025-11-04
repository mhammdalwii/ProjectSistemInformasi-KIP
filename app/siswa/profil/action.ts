"use server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import prismadb from "@/lib/db";
import { Role } from "@prisma/client";
import { revalidatePath } from "next/cache";
import { z } from "zod";

// Tipe untuk nilai kembalian
type ProfileUpdateResult = {
  success: boolean;
  message: string;
};

// Skema Zod HANYA untuk field yang boleh diedit
const ProfileSchema = z.object({
  name: z.string().min(3, "Nama lengkap wajib diisi"),
  kelas: z.string().optional(),
  nomorKIP: z.string().optional(),
  tahunPenerimaan: z.coerce.number().optional(),
});

export async function updateSiswaProfile(formData: FormData): Promise<ProfileUpdateResult> {
  // Keamanan: Ambil sesi server
  const session = await getServerSession(authOptions);
  if (!session?.user?.id || session.user.role !== Role.SISWA) {
    return { success: false, message: "Akses ditolak." };
  }

  // Validasi data
  const validatedFields = ProfileSchema.safeParse({
    name: formData.get("name"),
    kelas: formData.get("kelas"),
    nomorKIP: formData.get("nomorKIP"),
    tahunPenerimaan: formData.get("tahunPenerimaan"),
  });

  if (!validatedFields.success) {
    return { success: false, message: "Data tidak valid." };
  }

  const { name, kelas, nomorKIP, tahunPenerimaan } = validatedFields.data;

  try {
    // Update data HANYA untuk user yang sedang login
    await prismadb.user.update({
      where: {
        id: session.user.id,
      },
      data: {
        name: name,
        kelas: kelas || null,
        nomorKIP: nomorKIP || null,
        tahunPenerimaan: tahunPenerimaan || null,
      },
    });

    // 4. Revalidasi path
    revalidatePath("/siswa/profil");
    return { success: true, message: "Profil berhasil diperbarui." };
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    if (error.code === "P2002" && error.meta?.target.includes("nomorKIP")) {
      return { success: false, message: "Nomor KIP ini sudah terdaftar." };
    }
    return { success: false, message: "Gagal memperbarui profil." };
  }
}
