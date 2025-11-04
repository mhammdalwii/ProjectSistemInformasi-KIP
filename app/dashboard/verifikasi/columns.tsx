"use client";

import { ColumnDef } from "@tanstack/react-table";
import { User, StatusKIP } from "@prisma/client";
import { ArrowUpDown, Eye } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
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
    case "BELUM_DIAJUKAN":
    default:
      return <Badge variant="secondary">Belum Mengajukan</Badge>;
  }
};
export const columns: ColumnDef<User>[] = [
  {
    accessorKey: "name",
    header: ({ column }) => (
      <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
        Nama Siswa
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
  },
  {
    accessorKey: "nisn",
    header: "NISN",
  },
  {
    accessorKey: "kelas",
    header: "Kelas",
  },

  // Kolom 4: Status (SANGAT PENTING)
  {
    accessorKey: "status",
    header: ({ column }) => (
      <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
        Status
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
    cell: ({ row }) => {
      const status = row.getValue("status") as StatusKIP;
      return getStatusBadge(status);
    },
  },

  // Kolom 5: Aksi (Tombol Verifikasi)
  {
    id: "actions",
    cell: ({ row }) => {
      const siswa = row.original;

      return (
        <Button asChild variant="outline" size="sm">
          <Link href={`/dashboard/verifikasi/${siswa.id}`}>
            <Eye className="mr-2 h-4 w-4" />
            Lihat & Verifikasi
          </Link>
        </Button>
      );
    },
  },
];
