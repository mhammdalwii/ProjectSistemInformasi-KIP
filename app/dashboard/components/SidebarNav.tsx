"use client";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { LayoutDashboard, CheckSquare, Settings } from "lucide-react";
import { cn } from "@/lib/utils";

const navLinks = [
  {
    href: "/dashboard",
    label: "Dashboard",
    icon: LayoutDashboard,
  },
  {
    href: "/dashboard/verifikasi",
    label: "Verifikasi Siswa",
    icon: CheckSquare,
  },
  {
    href: "/dashboard/pengaturan",
    label: "Pengaturan",
    icon: Settings,
  },
];

interface SidebarNavProps {
  isMobile?: boolean;
}

export function SidebarNav({ isMobile = false }: SidebarNavProps) {
  const pathname = usePathname();

  return (
    <nav
      className={cn("flex flex-col gap-2 p-4", {
        "bg-gray-800 text-white h-full": !isMobile,
      })}
    >
      {navLinks.map((link) => {
        const isActive = pathname === link.href;
        return (
          <Link
            key={link.href}
            href={link.href}
            className={cn("flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-all hover:bg-gray-700 hover:text-white", isActive ? "bg-blue-500 text-blue-500-foreground hover:bg-blue-700" : "text-gray-300")}
          >
            <link.icon className="h-5 w-5" />
            {link.label}
          </Link>
        );
      })}
    </nav>
  );
}
