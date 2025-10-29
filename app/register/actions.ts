"use server";

import prismadb from "@/lib/db";
import { Role } from "@prisma/client";
import { z } from "zod";
import bcrypt from "bcrypt";
type RegisterResult = {
  success: boolean;
  message: string;
};

// Skema validasi untuk registrasi
const RegisterSchema = z.object({
  name: z.string().min(3, "Nama lengkap wajib diisi"),
  nisn: z.string().min(5, "NISN wajib diisi"),
  email: z.string().email("Email tidak valid"),
  password: z.string().min(6, "Password minimal 6 karakter"),
});

export async function registerSiswa(formData: FormData): Promise<RegisterResult> {
  // 1. Validasi data
  const validatedFields = RegisterSchema.safeParse({
    name: formData.get("name"),
    nisn: formData.get("nisn"),
    email: formData.get("email"),
    password: formData.get("password"),
  });

  if (!validatedFields.success) {
    return { success: false, message: "Data tidak valid. Periksa kembali." };
  }

  const { name, nisn, email, password } = validatedFields.data;

  try {
    // 2. Cek duplikat (Email)
    const existingUserByEmail = await prismadb.user.findUnique({
      where: { email: email },
    });
    if (existingUserByEmail) {
      return { success: false, message: "Email ini sudah terdaftar." };
    }

    // 3. Cek duplikat (NISN)
    const existingUserByNisn = await prismadb.user.findUnique({
      where: { nisn: nisn },
    });
    if (existingUserByNisn) {
      return { success: false, message: "NISN ini sudah terdaftar." };
    }

    // 4. Hash password
    const hashedPassword = await bcrypt.hash(password, 12);

    // 5. Buat user baru dengan role SISWA
    await prismadb.user.create({
      data: {
        email: email,
        password: hashedPassword,
        name: name,
        nisn: nisn,
        role: Role.SISWA,
        status: "BELUM_DIAJUKAN", // Status default
      },
    });

    return {
      success: true,
      message: "Registrasi berhasil! Silakan login.",
    };
  } catch (error) {
    console.error(error);
    return {
      success: false,
      message: "Terjadi kesalahan pada server.",
    };
  }
}
