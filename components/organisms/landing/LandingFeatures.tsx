import { Database, FileText, UserCheck } from "lucide-react";
export default function LandingFeatures() {
  const features = [
    {
      name: "Pendataan Mandiri",
      description: "Siswa dapat mendaftarkan akun dan mengupload berkas secara mandiri.",
      icon: FileText,
    },
    {
      name: "Verifikasi Terpusat",
      description: "Admin dapat memverifikasi semua data yang masuk dalam satu dashboard.",
      icon: Database,
    },
    {
      name: "Transparan & Real-time",
      description: "Siswa dapat memantau status verifikasi berkas mereka kapan saja.",
      icon: UserCheck,
    },
  ];

  return (
    <section className="bg-white py-20 sm:py-24 dark:bg-gray-900">
      {" "}
      {/* Tambah dark bg */}
      <div className="container mx-auto max-w-5xl px-4">
        <div className="text-center">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-gray-100">
            {" "}
            {/* Tambah dark text */}
            Sistem yang Efisien dan Andal
          </h2>
          <p className="mt-4 text-lg text-gray-600 dark:text-gray-300">
            {" "}
            {/* Tambah dark text */}
            Dirancang untuk memudahkan proses administrasi bantuan pendidikan.
          </p>
        </div>

        <div className="mt-16 grid grid-cols-1 gap-y-10 md:grid-cols-3 md:gap-x-8">
          {features.map((feature) => (
            <div key={feature.name} className="flex flex-col rounded-lg border bg-gray-50 p-6 shadow-sm dark:bg-gray-800 dark:border-gray-700">
              {" "}
              {/* Tambah dark bg/border */}
              <div className="flex items-center gap-4">
                <feature.icon className="h-10 w-10 text-primary" />
                <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100">
                  {" "}
                  {/* Tambah dark text */}
                  {feature.name}
                </h3>
              </div>
              <p className="mt-4 text-base text-gray-600 dark:text-gray-300">{feature.description}</p> {/* Tambah dark text */}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
