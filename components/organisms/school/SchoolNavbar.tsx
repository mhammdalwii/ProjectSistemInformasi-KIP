"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { School, Menu } from "lucide-react";

export default function SchoolNavbar() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-white/95 backdrop-blur supports-backdrop-filter:bg-white/60 dark:bg-gray-950/95 dark:border-gray-800">
      <div className="container flex h-16 items-center justify-between px-4">
        <div className="flex items-center gap-2">
          <School className="h-6 w-6 text-blue-600 dark:text-blue-400" />
          <span className="font-bold text-xl tracking-tight text-gray-900 dark:text-gray-100">SMPN 2 PAMBOANG</span>
        </div>

        {/* Menu Desktop */}
        <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-gray-600 dark:text-gray-300">
          <Link href="/" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
            Beranda
          </Link>
          <Link href="#profil" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
            Profil
          </Link>
          <Link href="#layanan" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
            Layanan Digital
          </Link>
          <Link href="#kontak" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
            Kontak
          </Link>
        </nav>

        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon" className="md:hidden">
            <Menu className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </header>
  );
}
