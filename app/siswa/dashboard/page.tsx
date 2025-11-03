import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import prismadb from "@/lib/db";
import { notFound } from "next/navigation";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { User } from "@prisma/client";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { AlertCircle, CheckCircle, Upload } from "lucide-react";

// Fungsi untuk menampilkan badge status
const getStatusBadge = (status: string) => {
  switch (status) {
    case "DITERIMA":
      return <Badge className="bg-green-600">Diterima</Badge>;
    case "DITOLAK":
      return <Badge className="bg-red-600">Ditolak</Badge>;
    case "MENUNGGU":
      return <Badge className="bg-yellow-600">Menunggu</Badge>;
    default:
      return <Badge className="bg-gray-400">Belum Diajukan</Badge>;
  }
};

// Fungsi untuk ambil data siswa yang login
async function getSiswaData(): Promise<User | null> {
  const session = await getServerSession(authOptions);
  if (!session?.user?.email) return null;

  const siswa = await prismadb.user.findUnique({
    where: { email: session.user.email },
  });

  return siswa;
}

export default async function SiswaDashboardPage() {
  const siswa = await getSiswaData();

  if (!siswa) {
    notFound();
  }

  const allDocsUploaded = siswa.urlKK && siswa.urlKTPOrangTua && siswa.urlAkta && siswa.urlSKTM;

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

      {/* Kartu Kelengkapan Berkas */}
      <Card>
        <CardHeader>
          <CardTitle>Kelengkapan Berkas</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {allDocsUploaded ? (
            <div className="flex items-center gap-3 text-green-700">
              <CheckCircle className="h-5 w-5" />
              <p className="font-medium">Semua dokumen wajib Anda sudah lengkap.</p>
            </div>
          ) : (
            <div className="flex items-center gap-3 text-yellow-700">
              <AlertCircle className="h-5 w-5" />
              <p className="font-medium">Anda belum melengkapi semua dokumen wajib.</p>
            </div>
          )}
          <p>{siswa.status === "BELUM_DIAJUKAN" ? "Silakan kelola semua berkas Anda di halaman 'Upload Berkas'." : "Berkas Anda sudah diajukan dan tidak dapat diubah."}</p>
          <Button asChild>
            <Link href="/siswa/upload-berkas">
              <Upload className="mr-2 h-4 w-4" />
              Buka Halaman Upload Berkas
            </Link>
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
