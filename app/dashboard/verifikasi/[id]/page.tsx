import prismadb from "@/lib/db";
import { notFound } from "next/navigation";
import { VerificationCard } from "./components/VerificationCard";
import { Badge } from "@/components/ui/badge";
import { StatusKIP } from "@prisma/client";
import { Metadata } from "next";

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
      id: id,
      role: "SISWA",
    },
  });
  if (!siswa) {
    notFound();
  }
  return siswa;
}

export const metadata: Metadata = {
  title: "Verifikasi Siswa",
  robots: "noindex, nofollow",
};
interface PageProps {
  params: Promise<{ id: string }>;
}
export default async function VerifikasiPage({ params }: PageProps) {
  const { id } = await params;

  const siswa = await getSiswa(id);

  return (
    <div className="space-y-4">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2">
        <h1 className="text-3xl font-bold tracking-tight text-gray-900">Detail Siswa: {siswa.name}</h1>
        <div className="flex items-center gap-2">
          <span className="font-semibold">Status:</span>
          {getStatusBadge(siswa.status)}
        </div>
      </div>

      <VerificationCard siswa={siswa} />
    </div>
  );
}
