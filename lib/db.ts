// Lokasi: lib/db.ts
// TIDAK ADA PERUBAHAN DI SINI

import { PrismaClient } from "@prisma/client";

// Deklarasikan variabel global untuk menyimpan cache koneksi
declare global {
  var prisma: PrismaClient | undefined;
}

// Buat koneksi (atau gunakan yang di-cache jika sudah ada)
// Ini adalah praktik terbaik di lingkungan Next.js (serverless)
const prismadb = globalThis.prisma || new PrismaClient();

if (process.env.NODE_ENV !== "production") {
  globalThis.prisma = prismadb;
}

export default prismadb;
