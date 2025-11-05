"use client";
import { useState, useTransition } from "react";
import { User } from "@prisma/client";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Loader2, Pencil, AlertCircle, CheckCircle } from "lucide-react";
import { adminUpdateSiswa } from "../../actions";

interface EditStudentDialogProps {
  siswa: User;
}

export function EditStudentDialog({ siswa }: EditStudentDialogProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError(null);
    setSuccess(null);

    const formData = new FormData(event.currentTarget);

    startTransition(async () => {
      const result = await adminUpdateSiswa(formData);
      if (result.success) {
        setSuccess(result.message);
        // Otomatis tutup dialog setelah 1.5 detik
        setTimeout(() => setIsOpen(false), 1500);
      } else {
        setError(result.message);
      }
    });
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm">
          <Pencil className="mr-2 h-4 w-4" />
          Edit Data Siswa
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-xl">
        <DialogHeader>
          <DialogTitle>Edit Data: {siswa.name}</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* --- Pesan Status --- */}
          {error && (
            <Alert variant="destructive">
              <AlertCircle className="h-4 w-4" />
              <AlertTitle>Error</AlertTitle>
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}
          {success && (
            <Alert variant="default" className="border-green-600">
              <CheckCircle className="h-4 w-4" />
              <AlertTitle>Berhasil!</AlertTitle>
              <AlertDescription>{success}</AlertDescription>
            </Alert>
          )}

          {/* Input ID tersembunyi */}
          <input type="hidden" name="userId" value={siswa.id} />

          {/* Grid Responsif */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="name">Nama Lengkap</Label>
              <Input id="name" name="name" defaultValue={siswa.name || ""} required disabled={isPending} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" name="email" type="email" defaultValue={siswa.email} required disabled={isPending} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="nisn">NISN</Label>
              <Input id="nisn" name="nisn" defaultValue={siswa.nisn || ""} required disabled={isPending} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="kelas">Kelas</Label>
              <Input id="kelas" name="kelas" defaultValue={siswa.kelas || ""} disabled={isPending} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="nomorKIP">Nomor KIP</Label>
              <Input id="nomorKIP" name="nomorKIP" defaultValue={siswa.nomorKIP || ""} disabled={isPending} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="tahunPenerimaan">Tahun Penerimaan</Label>
              <Input id="tahunPenerimaan" name="tahunPenerimaan" type="number" defaultValue={siswa.tahunPenerimaan || ""} disabled={isPending} />
            </div>
          </div>

          <DialogFooter>
            <Button type="submit" disabled={isPending}>
              {isPending ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
              {isPending ? "Menyimpan..." : "Simpan Perubahan"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
