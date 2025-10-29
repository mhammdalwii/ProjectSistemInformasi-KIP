import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import prismadb from "@/lib/db";
import { notFound, redirect } from "next/navigation";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { User } from "@prisma/client";

// Helper untuk Badge Status
const getStatusBadge = (status: string) => {
  switch (status) {
    case "DITERIMA":
      return <Badge className="bg-green-600">Diterima</Badge>;
    case "DITOLAK":
      return <Badge variant="destructive">Ditolak</Badge>;
    case "PROSES":
      return <Badge className="border-yellow-600 text-yellow-600">Proses Verifikasi</Badge>;
    case "BELUM_DIAJUKAN":
    default:
      return <Badge variant="outline">Belum Diajukan</Badge>;
  }
};

// Fungsi untuk mengambil data siswa
async function getSiswaData(): Promise<User | null> {
  // 1. Ambil sesi (info login) di server
  const session = await getServerSession(authOptions);

  if (!session || !session.user || session.user.role !== "SISWA") {
    // Ini seharusnya tidak terjadi karena ada middleware,
    // tapi sebagai pengaman ganda
    redirect("/login");
  }

  // 2. Ambil data lengkap siswa dari database
  const siswa = await prismadb.user.findUnique({
    where: {
      id: session.user.id,
    },
  });

  return siswa;
}

// Ini adalah Server Component (async)
export default async function SiswaDashboardPage() {
  const siswa = await getSiswaData();

  if (!siswa) {
    // Jika data tidak ditemukan
    return notFound();
  }

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold tracking-tight text-gray-900">Selamat Datang, {siswa.name}!</h1>

      {/* Kartu Status */}
      <Card>
        <CardHeader>
          <CardTitle>Status Pengajuan KIP Anda</CardTitle>
          <CardDescription>Periksa status verifikasi berkas Anda di bawah ini.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-4">
            <span className="text-lg font-medium">Status Saat Ini:</span>
            {getStatusBadge(siswa.status)}
          </div>
        </CardContent>
      </Card>

      {/* Kartu Upload Berkas (akan kita buat fungsional nanti) */}
      <Card>
        <CardHeader>
          <CardTitle>Kelengkapan Berkas</CardTitle>
          <CardDescription>Silakan lengkapi dan upload semua berkas yang dibutuhkan.</CardDescription>
        </CardHeader>
        <CardContent>
          <ul className="list-disc space-y-2 pl-5">
            <li>Kartu Keluarga (KK)</li>
            <li>Kartu KIP (jika ada)</li>
            <li>KTP Kedua Orang Tua</li>
            <li>Akta Kelahiran</li>
            <li>Surat Keterangan Tidak Mampu (SKTM)</li>
          </ul>
          {/* Nanti kita ganti ini dengan Form Upload */}
        </CardContent>
      </Card>
    </div>
  );
}
