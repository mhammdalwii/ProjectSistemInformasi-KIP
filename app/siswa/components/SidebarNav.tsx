"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";
import { LayoutDashboard, Info, Upload } from "lucide-react";

// Definisikan link navigasi siswa
const navLinks = [
  {
    href: "/siswa/dashboard",
    label: "Dashboard Saya",
    icon: LayoutDashboard,
  },
  {
    href: "/siswa/informasi",
    label: "Info Persyaratan",
    icon: Info,
  },
  {
    href: "/siswa/upload-berkas",
    label: "Upload Berkas",
    icon: Upload,
  },
  {
    href: "/siswa/profil",
    label: "Profil Saya",
    icon: Info,
  },
];

export function SidebarNav() {
  const pathname = usePathname(); // Hook untuk tahu kita di halaman mana

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
                variant: isActive ? "default" : "ghost",
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
