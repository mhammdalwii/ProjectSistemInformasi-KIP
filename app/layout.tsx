// Lokasi: app/layout.tsx

import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import AuthProvider from "./auth-provider";
import { ThemeProvider } from "@/app/dashboard/components/theme-provider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Sistem Pendataan KIP - SMP Negeri 2 Pamboang",
  description: "Portal resmi sistem informasi pendataan Kartu Indonesia Pintar (KIP) untuk siswa SMP Negeri 2 Pamboang.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id" suppressHydrationWarning>
      <body className={inter.className}>
        <AuthProvider>
          <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
            <div className="flex min-h-screen flex-col bg-gray-50 dark:bg-gray-900">{children}</div>
          </ThemeProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
