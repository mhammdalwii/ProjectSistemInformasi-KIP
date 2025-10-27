// Lokasi: components/organisms/HowItWorksSection.tsx

import FeatureCard from "@/components/molecules/FeatureCard";
// Ikon
import { Database, FileText, UserCheck } from "lucide-react";

export default function HowItWorksSection() {
  const features = [
    {
      icon: UserCheck,
      title: "Validasi Data",
      description: "Admin login untuk memverifikasi dan memvalidasi data siswa calon penerima KIP.",
    },
    {
      icon: Database,
      title: "Pendataan Terpusat",
      description: "Data disimpan secara terpusat, memudahkan pencarian dan manajemen data siswa.",
    },
    {
      icon: FileText,
      title: "Pelaporan Cepat",
      description: "Hasilkan laporan periodik untuk dinas pendidikan atau evaluasi internal dengan satu klik.",
    },
  ];

  return (
    <section className="bg-white py-20 sm:py-24">
      <div className="container mx-auto max-w-6xl px-4">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">Alur Kerja Sistem</h2>
          <p className="mt-4 text-lg text-gray-600">Dirancang untuk efisiensi dan akurasi data.</p>
        </div>

        {/* 5. RESPONSIVE: 1 kolom di HP, 3 kolom di desktop */}
        <div className="mt-16 grid grid-cols-1 gap-8 md:grid-cols-3">
          {features.map((feature) => (
            <FeatureCard key={feature.title} icon={feature.icon} title={feature.title} description={feature.description} />
          ))}
        </div>
      </div>
    </section>
  );
}
