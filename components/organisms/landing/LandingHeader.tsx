import Link from "next/link";
import { Button } from "@/components/ui/button";
import Image from "next/image";
export default function LandingHeader() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-white/90 backdrop-blur-sm">
      <div className="container mx-auto flex h-16 max-w-5xl items-center justify-between px-4">
        <div className="flex items-center gap-3">
          <Image src="/images/logo.png" alt="Logo Sekolah" width={35} height={35} className="rounded-md" />
          <span className="font-bold text-lg text-gray-800">SMPN 2 PAMBOANG</span>
        </div>
        <nav>
          <Button asChild>
            <Link href="/login">Login Pengguna</Link>
          </Button>
        </nav>
      </div>
    </header>
  );
}
