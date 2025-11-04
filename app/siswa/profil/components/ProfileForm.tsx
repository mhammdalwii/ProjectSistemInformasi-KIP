"use client";
import { User } from "@prisma/client";
import { useTransition, useState } from "react";
import { updateSiswaProfile } from "../action";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Loader2, AlertCircle, CheckCircle } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

export function ProfileForm({ siswa }: { siswa: User }) {
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError(null);
    setSuccess(null);

    const isConfirmed = window.confirm("Apakah Anda yakin ingin menyimpan perubahan pada profil Anda?");
    if (!isConfirmed) return;

    const formData = new FormData(event.currentTarget);

    startTransition(async () => {
      const result = await updateSiswaProfile(formData);
      if (result.success) {
        setSuccess(result.message);
      } else {
        setError(result.message);
      }
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* --- Pesan Error --- */}
      {error && (
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      {/* --- Pesan Sukses --- */}
      {success && (
        <Alert variant="default" className="border-green-600 ">
          <CheckCircle className="h-4 w-4" />
          <AlertTitle>Berhasil!</AlertTitle>
          <AlertDescription>{success}</AlertDescription>
        </Alert>
      )}

      {/* Grid Responsif untuk form */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Kolom 1 */}
        <div className="space-y-2">
          <Label htmlFor="name">Nama Lengkap</Label>
          <Input id="name" name="name" defaultValue={siswa.name || ""} required disabled={isPending} />
        </div>
        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input id="email" name="email" value={siswa.email} disabled className="cursor-not-allowed bg-gray-100" />
        </div>
        <div className="space-y-2">
          <Label htmlFor="nisn">NISN</Label>
          <Input id="nisn" name="nisn" value={siswa.nisn || ""} disabled className="cursor-not-allowed bg-gray-100" />
        </div>

        {/* Kolom 2 */}
        <div className="space-y-2">
          <Label htmlFor="kelas">Kelas </Label>
          <Input id="kelas" name="kelas" defaultValue={siswa.kelas || ""} placeholder="Contoh: IX A" disabled={isPending} />
        </div>
        <div className="space-y-2">
          <Label htmlFor="nomorKIP">Nomor KIP </Label>
          <Input id="nomorKIP" name="nomorKIP" defaultValue={siswa.nomorKIP || ""} placeholder="Opsional, jika ada" disabled={isPending} />
        </div>
        <div className="space-y-2">
          <Label htmlFor="tahunPenerimaan">Tahun Penerimaan </Label>
          <Input id="tahunPenerimaan" name="tahunPenerimaan" type="number" defaultValue={siswa.tahunPenerimaan || ""} placeholder="Opsional, cth: 2023" disabled={isPending} />
        </div>
      </div>

      <div className="flex justify-end">
        <Button type="submit" disabled={isPending}>
          {isPending ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
          {isPending ? "Menyimpan..." : "Simpan Perubahan"}
        </Button>
      </div>
    </form>
  );
}
