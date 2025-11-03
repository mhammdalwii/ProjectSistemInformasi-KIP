// Lokasi: app/siswa/dashboard/actions.ts

"use server";

import prismadb from "@/lib/db";
import { revalidatePath } from "next/cache";

// Aksi untuk menyimpan URL file
export async function updateDocumentUrl(userId: string, docKey: string, url: string) {
  const validKeys = ["urlKK", "urlKIP", "urlKTPOrangTua", "urlAkta", "urlSKTM"];
  if (!validKeys.includes(docKey)) {
    throw new Error("Kunci dokumen tidak valid.");
  }

  try {
    await prismadb.user.update({
      where: { id: userId },
      data: {
        [docKey]: url,
      },
    });

    // Refresh path dashboard siswa
    revalidatePath("/siswa/dashboard");
  } catch (error) {
    console.error(error);
    throw new Error("Gagal memperbarui URL dokumen.");
  }
}

// Aksi untuk mengubah status menjadi 'PROSES'
export async function submitVerification(userId: string) {
  try {
    await prismadb.user.update({
      where: { id: userId },
      data: {
        status: "PROSES",
      },
    });

    revalidatePath("/siswa/dashboard");
  } catch (error) {
    console.error(error);
    throw new Error("Gagal mengajukan verifikasi.");
  }
}
