// Lokasi: app/dashboard/verifikasi/page.tsx

import prismadb from "@/lib/db";
import { columns } from "./columns";
import { DataTable } from "../components/data-table";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Metadata } from "next";
import { PrintButton } from "./PrintButton";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Verifikasi Siswa",
  robots: "noindex, nofollow",
};

// Fungsi mengambil 2 kelompok data sekaligus
async function getSiswaData() {
  // 1. Kelompok Menunggu Tindakan (PROSES)
  const pending = await prismadb.user.findMany({
    where: {
      role: "SISWA",
      status: "PROSES",
    },
    orderBy: { updatedAt: "desc" },
  });

  // 2. Kelompok Sudah Diputuskan (DITERIMA & DITOLAK) -> Untuk diarsipkan & dicetak
  const archived = await prismadb.user.findMany({
    where: {
      role: "SISWA",
      status: {
        in: ["DITERIMA", "DITOLAK"],
      },
    },
    orderBy: [{ status: "asc" }, { updatedAt: "desc" }],
  });

  return { pending, archived };
}

export default async function VerifikasiSiswaPage() {
  const { pending, archived } = await getSiswaData();

  return (
    <div className="space-y-8">
      <div className="space-y-8 print:hidden">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-gray-900">Verifikasi Data Siswa</h1>
          <p className="text-sm text-gray-500">Kelola antrean pengajuan dan cetak bukti rekapitulasi KIP</p>
        </div>

        {/* TABEL ANTREAN (Kuning) */}
        <Card className="border-l-4 border-l-yellow-500">
          <CardHeader>
            <CardTitle>Menunggu Verifikasi ({pending.length})</CardTitle>
            <CardDescription>Siswa yang baru mengajukan KIP dan butuh pemeriksaan berkas.</CardDescription>
          </CardHeader>
          <CardContent>
            <DataTable columns={columns} data={pending} />
          </CardContent>
        </Card>

        {/* TABEL ARSIP (Biru) + Tombol Cetak */}
        <Card className="border-l-4 border-l-blue-600">
          <CardHeader className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <CardTitle>Arsip Terverifikasi & Ditolak ({archived.length})</CardTitle>
              <CardDescription>Daftar siswa yang status pengajuannya sudah disetujui atau ditolak.</CardDescription>
            </div>
            <PrintButton />
          </CardHeader>
          <CardContent>
            <DataTable columns={columns} data={archived} />
          </CardContent>
        </Card>
      </div>

      <div className="hidden print:block text-black font-sans bg-white">
        {/* Kop Surat Sekolah */}
        <div className="text-center border-b-2 border-black pb-4 mb-6">
          <h2 className="text-xl font-bold uppercase tracking-wider">SMP Negeri 2 Pamboang</h2>
          <p className="text-sm font-semibold">LAPORAN REKAPITULASI HASIL VERIFIKASI KIP</p>
          <p className="text-xs text-gray-600">Dicetak pada: {new Date().toLocaleDateString("id-ID", { day: "2-digit", month: "long", year: "numeric" })}</p>
        </div>

        {/* Tabel Cetak Hitam Putih (Kontras Tinggi) */}
        <table className="w-full border-collapse border border-black text-sm">
          <thead>
            <tr className="bg-gray-100 border border-black">
              <th className="border border-black p-2 text-center w-12 font-bold">No.</th>
              <th className="border border-black p-2 text-left font-bold">Nama Siswa</th>
              <th className="border border-black p-2 text-center font-bold">NISN</th>
              <th className="border border-black p-2 text-center font-bold">Kelas</th>
              <th className="border border-black p-2 text-center font-bold">Status Bantuan</th>
            </tr>
          </thead>
          <tbody>
            {archived.length === 0 ? (
              <tr>
                <td colSpan={5} className="border border-black text-center p-6 italic text-gray-500">
                  Belum ada data arsip verifikasi
                </td>
              </tr>
            ) : (
              archived.map((siswa, index) => (
                <tr key={siswa.id} className="border border-black">
                  <td className="border border-black p-2 text-center">{index + 1}</td>
                  <td className="border border-black p-2 font-medium">{siswa.name || "-"}</td>
                  <td className="border border-black p-2 text-center">{siswa.nisn || "-"}</td>
                  <td className="border border-black p-2 text-center">{siswa.kelas || "-"}</td>
                  <td className="border border-black p-2 text-center font-bold">{siswa.status === "DITERIMA" ? <span className="text-green-700">DITERIMA (✓)</span> : <span className="text-red-700">DITOLAK (X)</span>}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>

        {/* Kolom Tanda Tangan Pengesahan (Makin Terlihat Profesional) */}
        <div className="mt-16 flex justify-end text-sm">
          <div className="text-center">
            <p>Pamboang, ............................ 2026</p>
            <p className="mb-16 font-semibold">Petugas Verifikasi KIP</p>
            <p className="border-b border-black font-semibold">( ................................................... )</p>
            <p className="text-xs text-gray-500">NIP.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
