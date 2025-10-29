// Lokasi: app/dashboard/components/SidebarNav.tsx

"use client"; // Kita butuh 'use client' untuk mendeteksi halaman aktif

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils"; // Fungsi helper dari Shadcn
import { Button, buttonVariants } from "@/components/ui/button";
import { LayoutDashboard, PlusCircle } from "lucide-react";

// Definisikan link navigasi kita
const navLinks = [
  {
    href: "/dashboard",
    label: "Dashboard",
    icon: LayoutDashboard,
  },
  {
    href: "/dashboard/tambah",
    label: "Tambah Siswa",
    icon: PlusCircle,
  },
  // Tambahkan link lain di sini
  // {
  //   href: "/dashboard/laporan",
  //   label: "Cetak Laporan",
  //   icon: FileText,
  // },
];

interface SidebarNavProps {
  isMobile?: boolean;
}

export function SidebarNav({ isMobile = false }: SidebarNavProps) {
  const pathname = usePathname();

  return (
    <nav className="flex flex-col gap-2 p-4">
      {navLinks.map((link) => {
        const isActive = pathname === link.href;
        return (
          <Link
            key={link.href}
            href={link.href}
            className={cn(
              buttonVariants({
                variant: isActive ? "default" : "ghost", // Aktif: 'default', Non-aktif: 'ghost'
                size: "default",
              }),
              "w-full justify-start"
            )}
          >
            <link.icon className="mr-2 h-4 w-4" />
            {link.label}
          </Link>
        );
      })}
    </nav>
  );
}
