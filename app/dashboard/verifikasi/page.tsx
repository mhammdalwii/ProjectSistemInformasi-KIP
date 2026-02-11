import prismadb from "@/lib/db";
import { columns } from "./columns";
import { DataTable } from "../components/data-table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Metadata } from "next";

export const dynamic = "force-dynamic";

// SEO & Keamanan
export const metadata: Metadata = {
  title: "Verifikasi Siswa",
  robots: "noindex, nofollow",
};

// Fungsi untuk mengambil data (kita pindahkan dari dashboard lama)
async function getSiswaData() {
  const data = await prismadb.user.findMany({
    where: {
      role: "SISWA",
    },
    orderBy: [{ status: "asc" }, { updatedAt: "desc" }],
  });
  return data;
}

// Ini adalah Halaman (Page) baru
export default async function VerifikasiSiswaPage() {
  const dataSiswa = await getSiswaData();

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold tracking-tight text-gray-900">Verifikasi Data Siswa</h1>
      <Card>
        <CardHeader>
          <CardTitle>Daftar Siswa</CardTitle>
        </CardHeader>
        <CardContent>
          {/* Render Organisme DataTable */}
          <DataTable columns={columns} data={dataSiswa} />
        </CardContent>
      </Card>
    </div>
  );
}
