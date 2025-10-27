// Lokasi: app/dashboard/layout.tsx

"use client"; // Layout ini butuh interaksi (logout), jadi harus 'use client'

import Link from "next/link";
import { useSession, signOut } from "next-auth/react";
import { Button } from "@/components/ui/button";
import { LogOut, LayoutDashboard } from "lucide-react";
import { useRouter } from "next/navigation";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const { data: session, status } = useSession();
  const router = useRouter();

  if (status === "loading") {
    return <div className="flex min-h-screen items-center justify-center">Memuat data admin...</div>;
  }

  // Jika sesi tidak ada (seharusnya ini sudah di-handle middleware,
  // tapi ini sebagai pengaman ganda)
  if (status === "unauthenticated") {
    router.push("/login");
    return null;
  }

  // Fungsi untuk logout
  const handleLogout = () => {
    signOut({ callbackUrl: "/login" }); // Arahkan ke /login setelah logout
  };

  return (
    <div className="flex min-h-screen flex-col bg-gray-100">
      {/* Header Khusus Admin */}
      <header className="sticky top-0 z-50 w-full border-b bg-white shadow-sm">
        <div className="container mx-auto flex h-16 max-w-6xl items-center justify-between px-4">
          <Link href="/dashboard" className="flex items-center gap-2">
            <LayoutDashboard className="h-6 w-6 text-blue-600" />
            <span className="font-bold text-lg text-gray-800">Admin Dashboard</span>
          </Link>
          <div className="flex items-center gap-4">
            <span className="text-sm text-gray-600">
              Halo, <strong>{session?.user?.name || "Admin"}</strong>
            </span>
            <Button variant="outline" size="sm" onClick={handleLogout}>
              <LogOut className="mr-2 h-4 w-4" />
              Logout
            </Button>
          </div>
        </div>
      </header>

      {/* Konten Halaman (page.tsx) */}
      <main className="flex-grow p-4 md:p-8">
        <div className="container mx-auto max-w-6xl">{children}</div>
      </main>
    </div>
  );
}
