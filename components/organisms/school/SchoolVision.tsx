import { Target, CheckCircle2, Award } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

export default function SchoolVision() {
  return (
    <section id="profil" className="py-20 bg-white dark:bg-gray-950">
      <div className="container px-4 md:px-6">
        {/* --- Bagian Header --- */}
        <div className="text-center mb-16 space-y-4">
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl text-blue-600 dark:text-blue-400">Visi & Misi Sekolah</h2>
          <p className="max-w-[700px] mx-auto text-gray-500 dark:text-gray-400 md:text-xl">Pedoman kami dalam mewujudkan pendidikan berkualitas di SMP Negeri 2 Pamboang.</p>
        </div>

        <div className="grid gap-10 lg:grid-cols-2 items-center">
          {/* --- KOLOM KIRI: VISI (Besar & Mencolok) --- */}
          <div className="space-y-6">
            <div className="inline-flex items-center rounded-lg bg-blue-100 px-3 py-1 text-sm font-medium text-blue-800 dark:bg-blue-900/50 dark:text-blue-300">
              <Target className="mr-2 h-4 w-4" />
              Visi Sekolah
            </div>
            <h3 className="text-3xl font-bold leading-tight text-gray-900 dark:text-gray-100 sm:text-4xl">Terwujudnya Peserta Didik yang Beriman, Cerdas, Terampil, dan Berwawasan Lingkungan</h3>
            <p className="text-lg text-gray-600 dark:text-gray-400">Kami berkomitmen untuk membangun lingkungan belajar yang tidak hanya mengasah intelektual, tetapi juga membentuk karakter mulia dan kepedulian sosial.</p>
          </div>

          {/* --- KOLOM KANAN: MISI (Daftar Poin) --- */}
          <div className="space-y-4">
            <div className="inline-flex items-center rounded-lg bg-green-100 px-3 py-1 text-sm font-medium text-green-800 dark:bg-green-900/50 dark:text-green-300 mb-2">
              <Award className="mr-2 h-4 w-4" />
              Misi Sekolah
            </div>

            {/* List Misi */}
            <div className="grid gap-4">
              <Card className="border-l-4 border-l-blue-500 shadow-sm hover:shadow-md transition-shadow dark:bg-gray-900 dark:border-gray-800">
                <CardContent className="p-4 flex gap-4 items-start">
                  <CheckCircle2 className="h-6 w-6 text-blue-600 mt-1 shrink-0" />
                  <div>
                    <h4 className="font-semibold text-gray-900 dark:text-gray-100">Penguatan Karakter</h4>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Menanamkan keimanan dan ketaqwaan melalui kegiatan keagamaan rutin.</p>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-l-4 border-l-cyan-500 shadow-sm hover:shadow-md transition-shadow dark:bg-gray-900 dark:border-gray-800">
                <CardContent className="p-4 flex gap-4 items-start">
                  <CheckCircle2 className="h-6 w-6 text-cyan-600 mt-1 shrink-0" />
                  <div>
                    <h4 className="font-semibold text-gray-900 dark:text-gray-100">Pembelajaran Inovatif</h4>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Melaksanakan pembelajaran aktif, kreatif, efektif, dan menyenangkan berbasis teknologi.</p>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-l-4 border-l-indigo-500 shadow-sm hover:shadow-md transition-shadow dark:bg-gray-900 dark:border-gray-800">
                <CardContent className="p-4 flex gap-4 items-start">
                  <CheckCircle2 className="h-6 w-6 text-indigo-600 mt-1 shrink-0" />
                  <div>
                    <h4 className="font-semibold text-gray-900 dark:text-gray-100">Pengembangan Diri</h4>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Mengembangkan bakat dan minat siswa melalui kegiatan ekstrakurikuler yang beragam.</p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
