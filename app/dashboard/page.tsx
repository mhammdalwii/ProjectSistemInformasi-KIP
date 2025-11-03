import prismadb from "@/lib/db";
import { columns } from "./columns";
import { DataTable } from "./data-table";
import { StatCard } from "./verifikasi/[id]/components/StatCard";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, Hourglass, CheckCircle, XCircle } from "lucide-react";

async function getDashboardData() {
  // 1. Definisikan semua query
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

  const dataSiswaQuery = prismadb.user.findMany({
    where: { role: "SISWA" },
    orderBy: [{ status: "asc" }, { updatedAt: "desc" }],
  });

  // 2. Jalankan semua query secara paralel (sangat cepat)
  const [totalSiswa, totalProses, totalDiterima, totalDitolak, dataSiswa] = await Promise.all([totalSiswaQuery, totalProsesQuery, totalDiterimaQuery, totalDitolakQuery, dataSiswaQuery]);

  // 3. Kembalikan semua data
  return { totalSiswa, totalProses, totalDiterima, totalDitolak, dataSiswa };
}

export default async function DashboardPage() {
  // Ambil semua data
  const { totalSiswa, totalProses, totalDiterima, totalDitolak, dataSiswa } = await getDashboardData();

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold tracking-tight text-gray-900">Dashboard Admin</h1>

      {/* --- INI BAGIAN BARU (STATISTIK) --- */}
      {/* Grid ini responsif */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <StatCard title="Total Siswa Terdaftar" value={totalSiswa} icon={Users} />
        <StatCard title="Menunggu Verifikasi" value={totalProses} icon={Hourglass} />
        <StatCard title="Total Diterima" value={totalDiterima} icon={CheckCircle} />
        <StatCard title="Total Ditolak" value={totalDitolak} icon={XCircle} />
      </div>
      {/* ------------------------------------- */}

      {/* --- Ini Tabel Anda, sekarang dibungkus Card --- */}
      <Card>
        <CardHeader>
          <CardTitle>Verifikasi Data Siswa</CardTitle>
        </CardHeader>
        <CardContent>
          <DataTable columns={columns} data={dataSiswa} />
        </CardContent>
      </Card>
    </div>
  );
}
