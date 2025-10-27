import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { createSiswa } from "../actions";

// Ini adalah Server Component, tidak perlu 'use client'
export default function TambahSiswaPage() {
  return (
    <Card className="max-w-3xl mx-auto">
      <CardHeader>
        <div className="flex items-center gap-4">
          <Button variant="outline" size="icon" asChild>
            <Link href="/dashboard">
              <ArrowLeft className="h-4 w-4" />
            </Link>
          </Button>
          <CardTitle>Tambah Data Siswa Baru</CardTitle>
        </div>
      </CardHeader>
      <CardContent>
        {/* Formulir ini akan memanggil 'createSiswa' saat disubmit */}
        <form action={createSiswa} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="nisn">NISN (Nomor Induk Siswa Nasional)</Label>
            <Input
              id="nisn"
              name="nisn" // <-- Atribut 'name' ini PENTING
              placeholder="Contoh: 0081234567"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="name">Nama Lengkap Siswa</Label>
            <Input
              id="name"
              name="name" // <-- Atribut 'name' ini PENTING
              placeholder="Contoh: Budi Santoso"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="kelas">Kelas (Opsional)</Label>
            <Input
              id="kelas"
              name="kelas" // <-- Atribut 'name' ini PENTING
              placeholder="Contoh: IX A"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="status">Status Pengajuan KIP</Label>
            <Select name="status" defaultValue="PROSES">
              <SelectTrigger id="status">
                <SelectValue placeholder="Pilih status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="PROSES">Proses Verifikasi</SelectItem>
                <SelectItem value="DITERIMA">Diterima</SelectItem>
                <SelectItem value="DITOLAK">Ditolak</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="flex justify-end gap-2">
            <Button variant="outline" asChild>
              <Link href="/dashboard">Batal</Link>
            </Button>
            <Button type="submit">Simpan Data</Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
