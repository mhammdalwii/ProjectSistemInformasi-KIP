// Lokasi: app/dashboard/page.tsx

import prismadb from "@/lib/db";
// KEMBALIKAN CARA IMPOR 'columns' MENJADI VARIABEL BIASA
import { columns } from "./columns";
import { DataTable } from "./data-table";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";

// Fungsi ambil data (tidak berubah)
async function getDataSiswa() {
  const data = await prismadb.siswa.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });
  return data;
}

// Halaman dashboard
export default async function DashboardPage() {
  const dataSiswa = await getDataSiswa();
  return (
    <div>
      {/* Header dan Tombol Tambah (tidak berubah) */}
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold tracking-tight text-gray-900">Data Siswa Penerima KIP</h1>
      </div>

      {/* Kirim 'columns' seperti biasa */}
      <DataTable columns={columns} data={dataSiswa} />
    </div>
  );
}
