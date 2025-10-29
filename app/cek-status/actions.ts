// Lokasi: app/cek-status/actions.ts

"use server"; // Menandakan ini adalah Server Action

import prismadb from "@/lib/db";
import { z } from "zod";
import { StatusKIP } from "@prisma/client";

// Skema validasi untuk NISN
const NisnSchema = z.string().min(5, "NISN harus valid").max(20);

// Tipe data yang aman untuk dikembalikan ke client
type CekStatusResult = {
  data?: {
    name: string;
    status: StatusKIP;
  };
  error?: string;
};

// Fungsi yang akan kita panggil dari formulir
export async function cekStatusSiswa(nisn: string): Promise<CekStatusResult> {
  // 1. Validasi input
  const validatedNisn = NisnSchema.safeParse(nisn);

  if (!validatedNisn.success) {
    return { error: "NISN yang Anda masukkan tidak valid." };
  }

  try {
    // 2. Cari siswa di database berdasarkan NISN
    const siswa = await prismadb.siswa.findUnique({
      where: {
        nisn: validatedNisn.data,
      },
    });

    // 3. Jika tidak ditemukan
    if (!siswa) {
      return { error: "Data NISN tidak ditemukan di sistem kami." };
    }

    // 4. Jika ditemukan, kirim HANYA data yang aman
    return {
      data: {
        name: siswa.name,
        status: siswa.status,
      },
    };
  } catch (error) {
    console.error(error);
    return { error: "Terjadi kesalahan pada server. Coba lagi nanti." };
  }
}
