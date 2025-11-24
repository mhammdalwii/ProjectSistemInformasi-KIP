"use server";

import prismadb from "@/lib/db";
import { z } from "zod";
import { StatusKIP } from "@prisma/client";

// Skema validasi untuk NISN
const NisnSchema = z.string().min(5, "NISN harus valid").max(20);

type CekStatusResult = {
  data?: {
    name: string;
    status: StatusKIP;
  };
  error?: string;
};

// Fungsi yang akan kita panggil dari formulir
export async function cekStatusSiswa(nisn: string): Promise<CekStatusResult> {
  // Validasi input
  const validatedNisn = NisnSchema.safeParse(nisn);

  if (!validatedNisn.success) {
    return { error: "NISN yang Anda masukkan tidak valid." };
  }

  try {
    const siswa = await prismadb.user.findUnique({
      where: {
        nisn: validatedNisn.data,
        // Opsional: Pastikan role-nya SISWA (untuk keamanan ekstra)
        // role: 'SISWA'
      },
    });
    // -------------------------------

    // Jika tidak ditemukan
    if (!siswa) {
      return { error: "Data NISN tidak ditemukan di sistem kami." };
    }

    // 4. Jika ditemukan, kirim HANYA data yang aman
    return {
      data: {
        name: siswa.name || "Nama Tidak Tersedia",
        status: siswa.status,
      },
    };
  } catch (error) {
    console.error(error);
    return { error: "Terjadi kesalahan pada server. Coba lagi nanti." };
  }
}
