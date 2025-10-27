// Lokasi: middleware.ts (di root folder)

// Impor middleware default dari next-auth
export { default } from "next-auth/middleware";

// Tentukan halaman mana saja yang ingin Anda proteksi
// '/dashboard/:path*' berarti:
// - /dashboard
// - /dashboard/tambah-siswa
// - /dashboard/kelola-data/etc
export const config = {
  matcher: ["/dashboard/:path*"],
};
