// Lokasi: app/login/page.tsx

"use client"; // <-- Tandai sebagai Client Component

import { useState } from "react";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react"; // <-- Fungsi login dari NextAuth

// Impor "Atom" dari Shadcn
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { School } from "lucide-react";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  // Fungsi yang dipanggil saat tombol login diklik
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault(); // Mencegah reload halaman
    setError(""); // Bersihkan error sebelumnya

    try {
      // Ini adalah fungsi inti NextAuth
      // Dia akan memanggil API '...nextauth' yang akan kita buat
      const res = await signIn("credentials", {
        redirect: false, // Kita handle redirect manual
        email: email,
        password: password,
      });

      if (res?.error) {
        // Jika login gagal (misal: password salah)
        setError("Email atau password salah. Coba lagi.");
      } else if (res?.ok) {
        // Jika login berhasil
        router.push("/dashboard"); // Arahkan ke dashboard admin
      }
    } catch (err) {
      setError("Terjadi kesalahan pada server. Coba lagi nanti.");
    }
  };

  return (
    <main className="flex min-h-screen items-center justify-center bg-gray-100 p-4">
      <Card className="w-full max-w-sm">
        <form onSubmit={handleLogin}>
          <CardHeader className="text-center">
            <School className="mx-auto h-12 w-12 text-blue-600" />
            <CardTitle className="mt-2 text-2xl">Login Admin</CardTitle>
            <CardDescription>Masuk ke dashboard Sistem Pendataan KIP</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* Tampilkan pesan error jika ada */}
            {error && <div className="rounded-md border border-red-300 bg-red-50 p-3 text-center text-sm text-red-700">{error}</div>}
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" placeholder="admin@smpn2pamboang.sch.id" required value={email} onChange={(e) => setEmail(e.target.value)} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input id="password" type="password" placeholder="••••••••" required value={password} onChange={(e) => setPassword(e.target.value)} />
            </div>
          </CardContent>
          <CardFooter>
            <Button type="submit" className="w-full">
              Masuk
            </Button>
          </CardFooter>
        </form>
      </Card>
    </main>
  );
}
