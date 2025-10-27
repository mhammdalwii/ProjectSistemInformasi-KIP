// Lokasi: components/organisms/CtaSection.tsx

import Link from "next/link";
import { Button } from "@/components/ui/button"; // Atom

export default function CtaSection() {
  return (
    <section className="bg-blue-600">
      <div className="container mx-auto max-w-6xl px-4 py-16 text-center">
        <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">Siap Memulai Pendataan?</h2>
        <p className="mt-4 text-lg text-blue-100">Masuk ke dashboard admin untuk mengelola data siswa penerima KIP.</p>
        <div className="mt-8">
          <Button asChild size="lg" variant="secondary">
            <Link href="/login">Login Admin</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
