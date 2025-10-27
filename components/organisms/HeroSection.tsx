// Lokasi: components/organisms/HeroSection.tsx

import Link from "next/link";
import { Button } from "@/components/ui/button"; // Atom

export default function HeroSection() {
  return (
    <section className="py-20 text-center sm:py-32">
      <div className="container mx-auto max-w-3xl px-4">
        <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl md:text-6xl">Sistem Informasi Pendataan KIP</h1>
        <p className="mt-6 text-lg leading-8 text-gray-600 sm:text-xl">Portal terpusat untuk manajemen dan pendataan penerima Kartu Indonesia Pintar (KIP) di lingkungan SMP Negeri 2 Pamboang.</p>
        <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
          <Button asChild size="lg">
            <Link href="/login">Masuk Sebagai Admin</Link>
          </Button>
          <Button asChild size="lg" variant="outline">
            <Link href="/cek-status">Cek Status Siswa</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
