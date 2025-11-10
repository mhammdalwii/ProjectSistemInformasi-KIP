"use client";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { School } from "lucide-react";
export default function LandingHeader() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-white/90 backdrop-blur-sm dark:bg-gray-950/90 dark:border-gray-800">
      <div className="container mx-auto flex h-16 max-w-5xl items-center justify-between px-4">
        <div className="flex items-center gap-3">
          <School className="h-6 w-6 text-primary" />
          <span className="font-bold text-lg text-gray-800 dark:text-gray-100">SMPN 2 PAMBOANG</span>
        </div>
        <nav className="flex items-center gap-2">
          <Button asChild>
            <Link href="/login">Login Pengguna</Link>
          </Button>
        </nav>
      </div>
    </header>
  );
}
