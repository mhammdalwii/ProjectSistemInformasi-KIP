// Lokasi: app/dashboard/layout.tsx

"use client";

import Link from "next/link";
import { useSession, signOut } from "next-auth/react";
import { Button } from "@/components/ui/button";
import { School, LogOut, Menu } from "lucide-react"; // Impor ikon Menu
import { useRouter } from "next/navigation";
import { Suspense } from "react";
import { SidebarNav } from "./components/SidebarNav";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { LoadingSpinner } from "./components/LoadingSpinner";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const { data: session, status } = useSession();
  const router = useRouter();

  if (status === "loading") {
    return (
      <LoadingSpinner
        text="Memuat sesi admin..."
        fullScreen={true} // 'true' untuk menutupi semua
      />
    );
  }

  if (status === "unauthenticated") {
    router.push("/login");
    return null;
  }

  const handleLogout = () => {
    signOut({ callbackUrl: "/login" });
  };

  return (
    <Suspense fallback={null}>
      <div className="min-h-screen w-full bg-gray-100">
        {/* --- Sidebar Desktop (Biarkan sama) --- */}
        <aside className="hidden md:fixed md:inset-y-0 md:flex md:w-64 md:flex-col md:border-r md:bg-white">
          <div className="flex h-16 items-center border-b px-6">
            <Link href="/dashboard" className="flex items-center gap-2">
              <School className="h-6 w-6 text-blue-600" />
              <span className="font-bold text-lg text-gray-800">ADMIN KIP</span>
            </Link>
          </div>
          <SidebarNav />
        </aside>

        {/* --- Konten Utama (Biarkan sama) --- */}
        <div className="flex flex-col md:pl-64">
          <header className="sticky top-0 z-10 flex h-16 items-center justify-between gap-4 border-b bg-white px-4 md:justify-end">
            {/* --- Tombol Menu/Sheet --- */}
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
                    <SheetTitle className="sr-only">Menu Navigasi</SheetTitle>
                  </SheetHeader>

                  {/* Header visual Anda (Logo) */}
                  <div className="flex h-16 items-center border-b px-6">
                    <Link href="/dashboard" className="flex items-center gap-2">
                      <School className="h-6 w-6 text-blue-600" />
                      <span className="font-bold text-lg text-gray-800">ADMIN KIP</span>
                    </Link>
                  </div>

                  {/* Navigasi */}
                  <SidebarNav isMobile={true} />
                </SheetContent>
                {/* ----------------------------- */}
              </Sheet>
            </div>

            {/* --- Info User & Logout (Biarkan sama) --- */}
            <div className="flex items-center gap-4">
              <span className="text-sm text-gray-600">
                Halo, <strong>{session?.user?.name || "Admin"}</strong>
              </span>
              <Button variant="outline" size="sm" onClick={handleLogout}>
                <LogOut className="mr-2 h-4 w-4" />
                Logout
              </Button>
            </div>
          </header>

          {/* --- Isi Halaman (Biarkan sama) --- */}
          <main className="flex-grow p-4 md:p-8">{children}</main>
        </div>
      </div>
    </Suspense>
  );
}
