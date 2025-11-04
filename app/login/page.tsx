// Lokasi: app/login/page.tsx

"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { signIn, getSession } from "next-auth/react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Image from "next/image";
import { Role } from "@prisma/client";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    try {
      // 1. Coba login (tanpa redirect)
      const res = await signIn("credentials", {
        redirect: false,
        email: email,
        password: password,
      });

      if (res?.error) {
        // Jika password/email salah
        setError("Email atau password salah. Coba lagi.");
      } else if (res?.ok) {
        // --- INI LOGIKA PENGALIHAN BARU ---
        // 2. Jika login berhasil, ambil data session TERBARU
        const session = await getSession();

        // 3. Cek peran (role) dari session
        const userRole = session?.user?.role as Role;

        if (userRole === Role.ADMIN) {
          // 4. Jika ADMIN, arahkan ke dashboard admin
          router.push("/dashboard");
        } else if (userRole === Role.SISWA) {
          // 5. Jika SISWA, arahkan ke dashboard siswa
          router.push("/siswa/dashboard");
        } else {
          // Fallback (jika terjadi kesalahan)
          setError("Gagal menentukan peran pengguna.");
        }
        // ---------------------------------
      }
    } catch (err) {
      setError("Terjadi kesalahan pada server.");
    }
  };

  return (
    <main className="flex min-h-screen items-center justify-center bg-gray-100 p-4">
      <Card className="w-full max-w-sm">
        <form onSubmit={handleLogin}>
          {/* ... (CardHeader, CardContent - Form Input) ... */}
          {/* Biarkan bagian ini sama persis */}
          <CardHeader className="text-center">
            <Image src="/images/logo.png" alt="Logo Sekolah" width={55} height={55} className="rounded-md m-auto" />
            <CardTitle className="mt-2 text-2xl">Login Pengguna</CardTitle>
            <CardDescription>Login sebagai Admin atau Siswa</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {error && <div className="rounded-md border border-red-300 bg-red-50 p-3 text-center text-sm text-red-700">{error}</div>}
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" placeholder="email@anda.com" required value={email} onChange={(e) => setEmail(e.target.value)} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input id="password" type="password" placeholder="••••••••" required value={password} onChange={(e) => setPassword(e.target.value)} />
            </div>
          </CardContent>
          <CardFooter className="flex flex-col gap-4 mt-4">
            <Button type="submit" className="w-full">
              Masuk
            </Button>
            {/* --- TAMBAHKAN LINK REGISTRASI --- */}
            <div className="text-center text-sm">
              Belum punya akun siswa?{" "}
              <Button variant="link" asChild className="p-0">
                <Link href="/register">Daftar di sini</Link>
              </Button>
            </div>
            {/* ------------------------------- */}
          </CardFooter>
        </form>
      </Card>
    </main>
  );
}
