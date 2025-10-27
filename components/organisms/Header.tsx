import Link from "next/link";
import { Button } from "@/components/ui/button";
import { School } from "lucide-react";

export default function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-white/95 backdrop-blur-sm">
      <div className="container mx-auto flex h-16 max-w-6xl items-center justify-between px-4">
        <Link href="/" className="flex items-center gap-2">
          <School className="h-6 w-6 text-blue-600" />
          <span className="font-bold text-lg text-gray-800">SMPN 2 PAMBOANG</span>
        </Link>
        <nav>
          {/* 3. MENGGUNAKAN SHADCN/UI (Atoms) */}
          <Button asChild>
            <Link href="/login">Login Admin</Link>
          </Button>
        </nav>
      </div>
    </header>
  );
}
