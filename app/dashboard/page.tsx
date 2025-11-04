import prismadb from "@/lib/db";
import { StatCard } from "./verifikasi/[id]/components/StatCard";
import { Users, Hourglass, CheckCircle, XCircle } from "lucide-react";

// Fungsi ini SEKARANG HANYA mengambil data statistik
async function getDashboardStats() {
  const totalSiswaQuery = prismadb.user.count({
    where: { role: "SISWA" },
  });
  const totalProsesQuery = prismadb.user.count({
    where: { role: "SISWA", status: "PROSES" },
  });
  const totalDiterimaQuery = prismadb.user.count({
    where: { role: "SISWA", status: "DITERIMA" },
  });
  const totalDitolakQuery = prismadb.user.count({
    where: { role: "SISWA", status: "DITOLAK" },
  });

  // Jalankan semua query secara paralel
  const [totalSiswa, totalProses, totalDiterima, totalDitolak] = await Promise.all([totalSiswaQuery, totalProsesQuery, totalDiterimaQuery, totalDitolakQuery]);

  return { totalSiswa, totalProses, totalDiterima, totalDitolak };
}

export default async function DashboardPage() {
  //  HANYA data statistik
  const { totalSiswa, totalProses, totalDiterima, totalDitolak } = await getDashboardStats();

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold tracking-tight text-gray-900">Dashboard Admin</h1>

      {/* Grid StatCard (Responsif) */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <StatCard title="Total Siswa Terdaftar" value={totalSiswa} icon={Users} />
        <StatCard title="Menunggu Verifikasi" value={totalProses} icon={Hourglass} />
        <StatCard title="Total Diterima" value={totalDiterima} icon={CheckCircle} />
        <StatCard title="Total Ditolak" value={totalDitolak} icon={XCircle} />
      </div>
    </div>
  );
}
