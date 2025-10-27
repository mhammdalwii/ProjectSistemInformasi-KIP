"use client";
import { ColumnDef, Row } from "@tanstack/react-table";
import { ArrowUpDown, MoreHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { Siswa, StatusKIP } from "@prisma/client";
import { useTransition } from "react";
import { deleteSiswa } from "./actions";
import Link from "next/link"; // Pastikan Link di-impor

// Helper status badge (tidak berubah)
const getStatusBadge = (status: StatusKIP) => {
  switch (status) {
    case "DITERIMA":
      return (
        <Badge variant="default" className="bg-green-600">
          Diterima
        </Badge>
      );
    case "DITOLAK":
      return <Badge variant="destructive">Ditolak</Badge>;
    case "PROSES":
    default:
      return (
        <Badge variant="outline" className="border-yellow-600 text-yellow-600">
          Proses
        </Badge>
      );
  }
};

// --- Komponen Aksi ---
// Ini adalah komponen Client yang berisi logika Hapus dan link Edit
const ActionsCell = ({ row }: { row: Row<Siswa> }) => {
  const [isPending, startTransition] = useTransition();
  const siswa = row.original;

  // Fungsi Hapus (tidak berubah)
  const handleDelete = (siswaId: string) => {
    const isConfirmed = window.confirm("Apakah Anda yakin ingin menghapus data siswa ini? Aksi ini tidak bisa dibatalkan.");

    if (isConfirmed) {
      startTransition(async () => {
        try {
          await deleteSiswa(siswaId);
        } catch (error) {
          console.error(error);
        }
      });
    }
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="h-8 w-8 p-0">
          <span className="sr-only">Buka menu</span>
          <MoreHorizontal className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuLabel>Aksi</DropdownMenuLabel>

        {/* --- INI BAGIAN YANG HILANG/SALAH --- */}
        <DropdownMenuItem asChild>
          <Link href={`/dashboard/edit/${siswa.id}`}>Edit Data</Link>
        </DropdownMenuItem>
        {/* ---------------------------------- */}

        <DropdownMenuSeparator />

        <DropdownMenuItem className="text-red-600" onClick={() => handleDelete(siswa.id)} disabled={isPending}>
          {isPending ? "Menghapus..." : "Hapus Data"}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
// --- Akhir Komponen Aksi ---

// Definisi Kolom (tidak berubah)
export const columns: ColumnDef<Siswa>[] = [
  // Kolom 1: Checkbox
  {
    id: "select",
    header: ({ table }) => <Checkbox checked={table.getIsAllPageRowsSelected() || (table.getIsSomePageRowsSelected() && "indeterminate")} onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)} aria-label="Select all" />,
    cell: ({ row }) => <Checkbox checked={row.getIsSelected()} onCheckedChange={(value) => row.toggleSelected(!!value)} aria-label="Select row" />,
    enableSorting: false,
    enableHiding: false,
  },

  // Kolom 2: NISN
  {
    accessorKey: "nisn",
    header: ({ column }) => (
      <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
        NISN
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
  },

  // Kolom 3: Nama
  {
    accessorKey: "name",
    header: ({ column }) => (
      <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
        Nama Siswa
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
  },

  // Kolom 4: Kelas
  {
    accessorKey: "kelas",
    header: "Kelas",
  },

  // Kolom 5: Status
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => getStatusBadge(row.getValue("status")),
  },

  // Kolom 6: Aksi
  // Memanggil komponen ActionsCell
  {
    id: "actions",
    cell: ({ row }) => <ActionsCell row={row} />,
  },
];
