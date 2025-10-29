// Lokasi: middleware.ts (di root folder)

import { withAuth } from "next-auth/middleware";
import { Role } from "@prisma/client";
import { NextResponse } from "next/server";

export default withAuth(
  function middleware(req) {
    return NextResponse.next();
  },
  {
    callbacks: {
      authorized: ({ req, token }) => {
        const { pathname } = req.nextUrl;

        // --- INI LOGIKA BARU KITA ---

        // 1. Jika tidak ada token (belum login), tolak.
        // Ini akan otomatis mengarahkan ke halaman login.
        if (!token) {
          return false;
        }

        // 2. Ambil peran (role) dari token
        const userRole = token.role as Role;

        // 3. Jika mencoba mengakses Dashboard Admin...
        if (pathname.startsWith("/dashboard")) {
          // ...hanya izinkan jika role-nya ADMIN
          return userRole === Role.ADMIN;
        }

        // 4. Jika mencoba mengakses Dashboard Siswa...
        if (pathname.startsWith("/siswa")) {
          // ...hanya izinkan jika role-nya SISWA
          return userRole === Role.SISWA;
        }

        // 5. Jika lolos dari semua cek di atas (seharusnya tidak terjadi)
        return false;
      },
    },
  }
);

// Tentukan rute mana saja yang HARUS dijaga
export const config = {
  matcher: ["/dashboard/:path*", "/siswa/:path*"],
};
