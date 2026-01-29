import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import logo from "@/public/images/hero-bg.jpg";
import Image from "next/image";

export default function SchoolHero() {
  return (
    <section className="relative overflow-hidden bg-gray-50 dark:bg-gray-900 py-20 lg:py-32">
      <div className="container px-4 md:px-6">
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-8 items-center">
          <div className="space-y-6">
            <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none bg-clip-text text-transparent bg-linear-to-r from-blue-600 to-cyan-500 dark:from-blue-400 dark:to-cyan-300">
              Mewujudkan Generasi Cerdas & Berakhlak
            </h1>
            <p className="max-w-[600px] text-gray-500 md:text-xl dark:text-gray-400">Selamat datang di website resmi SMP Negeri 2 Pamboang. Pusat informasi, prestasi, dan layanan digital terintegrasi.</p>
            <div className="flex flex-col gap-2 min-[400px]:flex-row">
              <Button asChild size="lg" className="bg-blue-600 hover:bg-blue-700">
                <Link href="#profil">
                  Tentang Sekolah <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg">
                <Link href="#layanan">Layanan Siswa</Link>
              </Button>
            </div>
          </div>

          {/* Ilustrasi Gambar Sekolah */}
          <div className="mx-auto aspect-video overflow-hidden rounded-xl relative sm:w-full lg:order-last border shadow-xl dark:border-gray-800">
            <Image src={logo} alt="Gedung Sekolah" fill className="object-cover object-center" priority />
          </div>
        </div>
      </div>
    </section>
  );
}
