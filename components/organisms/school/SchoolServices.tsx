import Link from "next/link";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { GraduationCap, BookOpen, Trophy } from "lucide-react";

export default function SchoolServices() {
  return (
    <section id="layanan" className="py-20 bg-white dark:bg-gray-950">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center mb-12">
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-gray-900 dark:text-gray-100">Layanan Digital & Akademik</h2>
          <p className="max-w-[700px] text-gray-500 md:text-xl/relaxed dark:text-gray-400">Akses berbagai sistem informasi dan layanan sekolah dengan mudah.</p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {/* --- KARTU SISTEM KIP (UTAMA) --- */}
          <Card className="relative overflow-hidden border-2 border-blue-100 dark:border-blue-900 shadow-lg hover:shadow-xl transition-all">
            <div className="absolute top-0 right-0 p-3">
              <span className="flex h-3 w-3 rounded-full bg-green-500 animate-pulse"></span>
            </div>
            <CardHeader>
              <GraduationCap className="h-12 w-12 text-blue-600 mb-2" />
              <CardTitle className="text-2xl">Platform KIP</CardTitle>
              <CardDescription>Sistem pendaftaran dan pemberkasan Kartu Indonesia Pintar secara online.</CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="list-disc list-inside text-sm text-gray-600 dark:text-gray-400 space-y-1">
                <li>Pendaftaran Mandiri</li>
                <li>Upload Berkas Digital</li>
                <li>Cek Status Real-time</li>
              </ul>
            </CardContent>
            <CardFooter>
              <Button asChild className="w-full bg-blue-600 hover:bg-blue-700">
                <Link href="/kip">Akses Portal KIP</Link>
              </Button>
            </CardFooter>
          </Card>

          {/* Kartu Lain (Placeholder) */}
          <Card className="dark:bg-gray-900 dark:border-gray-800">
            <CardHeader>
              <BookOpen className="h-10 w-10 text-orange-500 mb-2" />
              <CardTitle>E-Library</CardTitle>
              <CardDescription>Perpustakaan digital untuk akses buku dan jurnal pelajaran.</CardDescription>
            </CardHeader>
            <CardFooter className="mt-auto">
              <Button variant="outline" className="w-full" disabled>
                Segera Hadir
              </Button>
            </CardFooter>
          </Card>

          <Card className="dark:bg-gray-900 dark:border-gray-800">
            <CardHeader>
              <Trophy className="h-10 w-10 text-yellow-500 mb-2" />
              <CardTitle>Prestasi Siswa</CardTitle>
              <CardDescription>Galeri pencapaian dan prestasi siswa SMPN 2 Pamboang.</CardDescription>
            </CardHeader>
            <CardFooter className="mt-auto">
              <Button variant="outline" className="w-full" disabled>
                Segera Hadir
              </Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    </section>
  );
}
