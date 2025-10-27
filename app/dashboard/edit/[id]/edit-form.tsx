// Lokasi: app/dashboard/edit/[id]/edit-form.tsx

"use client"; // <-- Tandai sebagai Client Component

import { useTransition } from "react";
import Link from "next/link";
import { Siswa } from "@prisma/client";
import { updateSiswa } from "@/app/dashboard/actions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface EditFormProps {
  siswa: Siswa;
}

export function EditForm({ siswa }: EditFormProps) {
  // Hook untuk loading state
  const [isPending, startTransition] = useTransition();

  // Fungsi yang menangani submit form
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    // 1. Hentikan aksi default form
    event.preventDefault();

    // 2. TAMPILKAN POPUP KONFIRMASI
    const isConfirmed = window.confirm("Apakah Anda yakin ingin menyimpan perubahan ini?");

    // 3. Jika dikonfirmasi
    if (isConfirmed) {
      // Ambil data form
      const formData = new FormData(event.currentTarget);

      // 4. Jalankan Server Action di dalam 'startTransition'
      startTransition(async () => {
        try {
          // Panggil server action dengan data form
          await updateSiswa(formData);
          // (redirect akan di-handle oleh server action)
        } catch (error) {
          console.error(error);
          // Tampilkan popup error jika gagal
          alert("Gagal menyimpan perubahan. Error: " + (error as Error).message);
        }
      });
    }
    // Jika tidak dikonfirmasi, tidak terjadi apa-apa
  };

  return (
    // Ganti <form action={...}> menjadi <form onSubmit={...}>
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Input tersembunyi untuk ID */}
      <input type="hidden" name="id" value={siswa.id} />

      <div className="space-y-2">
        <Label htmlFor="nisn">NISN</Label>
        <Input
          id="nisn"
          name="nisn"
          required
          defaultValue={siswa.nisn}
          disabled={isPending} // Nonaktifkan saat loading
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="name">Nama Lengkap Siswa</Label>
        <Input
          id="name"
          name="name"
          required
          defaultValue={siswa.name}
          disabled={isPending} // Nonaktifkan saat loading
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="kelas">Kelas (Opsional)</Label>
        <Input
          id="kelas"
          name="kelas"
          defaultValue={siswa.kelas || ""}
          disabled={isPending} // Nonaktifkan saat loading
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="status">Status Pengajuan KIP</Label>
        <Select name="status" defaultValue={siswa.status} disabled={isPending}>
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
        <Button type="submit" disabled={isPending}>
          {/* Ubah teks tombol berdasarkan loading state */}
          {isPending ? "Menyimpan..." : "Simpan Perubahan"}
        </Button>
      </div>
    </form>
  );
}
