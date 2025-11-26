import prismadb from "@/lib/db";
import { notFound } from "next/navigation";
import { VerificationCard } from "./components/VerificationCard";
import { Badge } from "@/components/ui/badge";
import { Metadata } from "next";

type StatusKIP = "PROSES" | "DITERIMA" | "DITOLAK";

const getStatusBadge = (status: StatusKIP) => {
  switch (status) {
    case "PROSES":
      return (
        <Badge className="border-yellow-600 text-yellow-600" variant="outline">
          Menunggu Verifikasi
        </Badge>
      );
    case "DITERIMA":
      return <Badge className="bg-green-600">Diterima</Badge>;
    case "DITOLAK":
      return <Badge variant="destructive">Ditolak</Badge>;
    default:
      return <Badge variant="secondary">Belum Mengajukan</Badge>;
  }
};

async function getSiswa(id: string) {
  const siswa = await prismadb.user.findUnique({
    where: {
      id,
      role: "SISWA",
    },
  });

  if (!siswa) {
    notFound();
  }

  return siswa;
}

// SEO & Keamanan
export const metadata: Metadata = {
  title: "Verifikasi Siswa",
  robots: "noindex, nofollow",
};

// Halaman Server Component
export default async function VerifikasiPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const siswa = await getSiswa(id);

  return (
    <div className="space-y-4">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2">
        <h1 className="text-3xl font-bold tracking-tight text-gray-900">Detail Siswa: {siswa.name}</h1>
        <div className="flex items-center gap-2">
          <span className="font-semibold">Status:</span>
          {/* cast ke StatusKIP supaya TypeScript happy */}
          {getStatusBadge(siswa.status as StatusKIP)}
        </div>
      </div>

      {/* Organisme Client */}
      <VerificationCard siswa={siswa} />
    </div>
  );
}
