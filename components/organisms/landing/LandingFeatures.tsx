// Lokasi: components/organisms/landing/LandingFeatures.tsx

// (Kita asumsikan Anda perlu menginstal 'lucide-react' jika belum ada)
import { Database, FileText, UserCheck } from "lucide-react";

export default function LandingFeatures() {
  const features = [
    {
      name: "Pendataan Mandiri",
      description: "Siswa dapat mendaftarkan akun dan mengupload berkas secara mandiri.",
    },
    {
      name: "Verifikasi Terpusat",
      description: "Admin dapat memverifikasi semua data yang masuk dalam satu dashboard.",
    },
    {
      name: "Transparan & Real-time",
      description: "Siswa dapat memantau status verifikasi berkas mereka kapan saja.",
    },
  ];

  return (
    <section className="bg-white py-20 sm:py-24">
      <div className="container mx-auto max-w-5xl px-4">
        <div className="text-center">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">Sistem yang Efisien dan Andal</h2>
          <p className="mt-4 text-lg text-gray-600">Dirancang untuk memudahkan proses administrasi bantuan pendidikan.</p>
        </div>

        {/* Responsive Grid */}
        <div className="mt-16 grid grid-cols-1 gap-y-10 md:grid-cols-3 md:gap-x-8">
          {features.map((feature) => (
            <div key={feature.name} className="flex flex-col rounded-lg border bg-gray-50 p-6">
              <h3 className="text-lg font-semibold text-gray-900">{feature.name}</h3>
              <p className="mt-2 text-base text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
