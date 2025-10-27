// Lokasi: app/layout.tsx

import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import AuthProvider from "./auth-provider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  // ... (metadata Anda dari sebelumnya, tidak perlu diubah)
  title: "Sistem Pendataan KIP - SMP Negeri 2 Pamboang",
  description: "Portal resmi sistem informasi pendataan Kartu Indonesia Pintar (KIP) untuk siswa SMP Negeri 2 Pamboang.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id">
      <body className={inter.className}>
        {/* Bungkus semua konten dengan AuthProvider */}
        <AuthProvider>
          <div className="flex min-h-screen flex-col bg-gray-50">{children}</div>
        </AuthProvider>
      </body>
    </html>
  );
}
