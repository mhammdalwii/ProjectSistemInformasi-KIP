"use client"; // Layout ini butuh 'use client' untuk session dan logout

import Link from "next/link";
import { useSession, signOut } from "next-auth/react";
import { Button } from "@/components/ui/button";
import { LogOut, School } from "lucide-react";
import { useRouter } from "next/navigation";

export default function SiswaLayout({ children }: { children: React.ReactNode }) {
  const { data: session, status } = useSession();
  const router = useRouter();

  if (status === "loading") {
    return <div className="flex min-h-screen items-center justify-center">Memuat sesi siswa...</div>;
  }

  // Pengaman ganda, walau sudah ada middleware
  if (status === "unauthenticated") {
    router.push("/login");
    return null;
  }

  const handleLogout = () => {
    signOut({ callbackUrl: "/" });
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header Sederhana untuk Siswa */}
      <header className="sticky top-0 z-50 w-full border-b bg-white shadow-sm">
        <div className="container mx-auto flex h-16 max-w-6xl items-center justify-between px-4">
          <Link href="/siswa/dashboard" className="flex items-center gap-2">
            <School className="h-6 w-6 text-blue-600" />
            <span className="font-bold text-lg text-gray-800">Dashboard Siswa</span>
          </Link>
          <div className="flex items-center gap-4">
            <span className="text-sm text-gray-600">
              Halo, <strong>{session?.user?.name || "Siswa"}</strong>
            </span>
            <Button variant="outline" size="sm" onClick={handleLogout}>
              <LogOut className="mr-2 h-4 w-4" />
              Logout
            </Button>
          </div>
        </div>
      </header>

      {/* Konten Halaman Siswa */}
      <main className="p-4 md:p-8">
        <div className="container mx-auto max-w-6xl">{children}</div>
      </main>
    </div>
  );
}
