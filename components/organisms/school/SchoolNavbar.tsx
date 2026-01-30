"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { School, Menu, X, LogIn } from "lucide-react";

export default function SchoolNavbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const closeMenu = () => setIsMobileMenuOpen(false);

  const navLinks = [
    { href: "/", label: "Beranda" },
    { href: "#profil", label: "Profil" },
    { href: "#layanan", label: "Layanan Digital" },
    { href: "#kontak", label: "Kontak" },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-white/95 backdrop-blur supports-backdrop-filter:bg-white/60 dark:bg-gray-950/95 dark:border-gray-800 transition-all">
      <div className="container flex h-16 items-center justify-between px-4">
        <Link href="/" className="flex items-center gap-2.5 transition-opacity hover:opacity-80" onClick={closeMenu}>
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-600 text-white">
            <School className="h-5 w-5" />
          </div>
          <div className="flex flex-col">
            <span className="font-bold text-lg leading-none tracking-tight text-gray-900 dark:text-gray-100">SMPN 2</span>
            <span className="text-xs font-semibold tracking-widest text-blue-600 dark:text-blue-400">PAMBOANG</span>
          </div>
        </Link>

        {/* Hidden di HP, Muncul di Laptop (md) */}
        <nav className="hidden md:flex items-center gap-8 text-sm font-medium">
          {navLinks.map((link) => (
            <Link key={link.href} href={link.href} className="relative text-gray-600 hover:text-blue-600 dark:text-gray-300 dark:hover:text-blue-400 transition-colors">
              {link.label}
            </Link>
          ))}
        </nav>
        <div className="flex items-center gap-3">
          {/* Tombol Hamburger (Hanya di HP) */}
          <Button variant="ghost" size="icon" className="md:hidden text-gray-500 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-800" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
            {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>
      </div>

      {/* --- MENU MOBILE (DROPDOWN) --- */}
      {isMobileMenuOpen && (
        <div className="md:hidden border-t bg-white dark:bg-gray-950 dark:border-gray-800 animate-in slide-in-from-top-5 duration-200">
          <nav className="flex flex-col p-4 space-y-3">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="flex items-center h-10 px-4 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-100 hover:text-blue-600 dark:text-gray-200 dark:hover:bg-gray-800 dark:hover:text-blue-400 transition-colors"
                onClick={closeMenu}
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
}
