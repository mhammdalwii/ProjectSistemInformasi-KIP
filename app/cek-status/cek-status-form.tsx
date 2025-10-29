// Lokasi: app/cek-status/cek-status-form.tsx

"use client"; // <-- Ini adalah Client Component

import { useState, useTransition } from "react";
import { cekStatusSiswa } from "./actions"; // <-- Impor Server Action
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge"; // Kita perlu Badge
import { Loader2, CheckCircle, XCircle } from "lucide-react";
import { StatusKIP } from "@prisma/client";

// Tipe data untuk menampung hasil
type ResultState = {
  name: string;
  status: StatusKIP;
} | null;

// Helper untuk Badge (sama seperti di dashboard)
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

export function CekStatusForm() {
  const [nisn, setNisn] = useState("");
  const [isPending, startTransition] = useTransition();
  const [result, setResult] = useState<ResultState>(null);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault(); // Mencegah reload halaman

    // Reset state
    setResult(null);
    setError(null);

    // Jalankan Server Action
    startTransition(async () => {
      const response = await cekStatusSiswa(nisn);

      if (response.error) {
        setError(response.error);
      } else if (response.data) {
        setResult(response.data);
      }
    });
  };

  return (
    <div className="space-y-4">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="nisn">Masukkan NISN Anda</Label>
          <Input id="nisn" name="nisn" placeholder="Ketik NISN di sini..." required value={nisn} onChange={(e) => setNisn(e.target.value)} disabled={isPending} />
        </div>
        <Button type="submit" className="w-full" disabled={isPending}>
          {isPending ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
          {isPending ? "Mencari..." : "Cek Status"}
        </Button>
      </form>
      {/* Jika Gagal (Error) */}
      {error && (
        <div className="flex flex-col items-center gap-2 rounded-md border border-red-200 bg-red-50 p-4 text-center">
          <XCircle className="h-10 w-10 text-red-600" />
          <p className="font-semibold text-red-700">Gagal Ditemukan</p>
          <p className="text-sm text-red-600">{error}</p>
        </div>
      )}

      {/* Jika Berhasil (Sukses) */}
      {result && (
        <div className="flex flex-col items-center gap-2 rounded-md border border-green-200 bg-green-50 p-4 text-center">
          <CheckCircle className="h-10 w-10 text-green-600" />
          <p className="font-semibold text-green-700">Data Ditemukan!</p>
          <p className="text-sm text-gray-600">
            Atas nama: <span className="font-bold">{result.name}</span>
          </p>
          <div className="flex items-center gap-2 text-sm">Status Anda: {getStatusBadge(result.status)}</div>
        </div>
      )}
    </div>
  );
}
