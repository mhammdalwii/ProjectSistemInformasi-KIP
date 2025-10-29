// Lokasi: app/register/register-form.tsx

"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { registerSiswa } from "./actions"; // <-- Impor Server Action
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Loader2, AlertCircle, CheckCircle } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

export function RegisterForm() {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError(null);
    setSuccess(null);

    const formData = new FormData(event.currentTarget);

    startTransition(async () => {
      const result = await registerSiswa(formData);
      if (result.success) {
        setSuccess(result.message);
        // Arahkan ke login setelah 2 detik
        setTimeout(() => {
          router.push("/login");
        }, 2000);
      } else {
        setError(result.message);
      }
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {/* --- Pesan Error --- */}
      {error && (
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Error Registrasi</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      {/* --- Pesan Sukses --- */}
      {success && (
        <Alert variant="default" className="border-green-600">
          <CheckCircle className="h-4 w-4" />
          <AlertTitle>Berhasil!</AlertTitle>
          <AlertDescription>{success}</AlertDescription>
        </Alert>
      )}

      <div className="space-y-2">
        <Label htmlFor="name">Nama Lengkap Siswa</Label>
        <Input id="name" name="name" required disabled={isPending} />
      </div>

      <div className="space-y-2">
        <Label htmlFor="nisn">NISN</Label>
        <Input id="nisn" name="nisn" required disabled={isPending} />
      </div>

      <div className="space-y-2">
        <Label htmlFor="email">Email</Label>
        <Input id="email" name="email" type="email" required disabled={isPending} />
      </div>

      <div className="space-y-2">
        <Label htmlFor="password">Password</Label>
        <Input id="password" name="password" type="password" required disabled={isPending} />
      </div>

      <Button type="submit" className="w-full" disabled={isPending}>
        {isPending ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
        {isPending ? "Mendaftarkan..." : "Buat Akun"}
      </Button>
    </form>
  );
}
