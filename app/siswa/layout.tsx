"use client";
import Link from "next/link";
import { useSession, signOut } from "next-auth/react";
import { Button } from "@/components/ui/button";
import { LogOut, School, Menu } from "lucide-react"; // Impor Menu
import { useRouter } from "next/navigation";
import { Suspense } from "react";
import { SidebarNav } from "./components/SidebarNav";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";

export default function SiswaLayout({ children }: { children: React.ReactNode }) {
  const { data: session, status } = useSession();
  const router = useRouter();

  if (status === "loading") {
    return <div className="flex min-h-screen items-center justify-center">Memuat sesi siswa...</div>;
  }

  if (status === "unauthenticated") {
    router.push("/login");
    return null;
  }

  const handleLogout = () => {
    signOut({ callbackUrl: "/" });
  };

  return (
    // 'Suspense' diperlukan jika Anda ingin menambahkan loading.tsx nanti
    <Suspense fallback={null}>
      <div className="min-h-screen w-full bg-gray-100">
        {/* --- 1. SIDEBAR DESKTOP (model layar besar) --- */}
        <aside className="hidden md:fixed md:inset-y-0 md:flex md:w-64 md:flex-col md:border-r md:bg-white">
          <div className="flex h-16 items-center border-b px-6">
            <Link href="/siswa/dashboard" className="flex items-center gap-2">
              <School className="h-6 w-6 text-blue-600" />
              <span className="font-bold text-lg text-gray-800">SISWA KIP</span>
            </Link>
          </div>
          <SidebarNav />
        </aside>

        {/* --- 2. KONTEN UTAMA (Header Mobile + Isi) --- */}
        <div className="flex flex-col md:pl-64">
          <header className="sticky top-0 z-10 flex h-16 items-center justify-between gap-4 border-b bg-white px-4 md:justify-end">
            {/* --- Tombol Menu/Sheet (model layar kecil) --- */}
            <div className="md:hidden">
              <Sheet>
                <SheetTrigger asChild>
                  <Button variant="outline" size="icon">
                    <Menu className="h-5 w-5" />
                    <span className="sr-only">Buka Menu Navigasi</span>
                  </Button>
                </SheetTrigger>
                <SheetContent side="left" className="p-0">
                  <SheetHeader>
                    {/* Judul tersembunyi untuk aksesibilitas */}
                    <SheetTitle className="sr-only">Menu Navigasi</SheetTitle>
                  </SheetHeader>
                  <div className="flex h-16 items-center border-b px-6">
                    <Link href="/siswa/dashboard" className="flex items-center gap-2">
                      <School className="h-6 w-6 text-blue-600" />
                      <span className="font-bold text-lg text-gray-800">SISWA KIP</span>
                    </Link>
                  </div>
                  {/* Gunakan SidebarNav di sini juga */}
                  <SidebarNav />
                </SheetContent>
              </Sheet>
            </div>

            {/* --- Info User & Logout (Selalu tampil) --- */}
            <div className="flex items-center gap-4">
              <Button variant="outline" size="sm" onClick={handleLogout}>
                <LogOut className="mr-2 h-4 w-4" />
                Logout
              </Button>
            </div>
          </header>

          {/* --- 3. ISI HALAMAN (children) --- */}
          <main className="flex-grow p-4 md:p-8">
            <div className="container mx-auto max-w-6xl p-0">{children}</div>
          </main>
        </div>
      </div>
    </Suspense>
  );
}
