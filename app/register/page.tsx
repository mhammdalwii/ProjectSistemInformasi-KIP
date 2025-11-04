import Link from "next/link";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { RegisterForm } from "./register-form";
import Image from "next/image";

export default function RegisterPage() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-gray-100 p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <Image src="/images/logo.png" alt="Logo Sekolah" width={55} height={55} className="rounded-md m-auto" />
          <CardTitle className="text-2xl">Registrasi Akun Siswa</CardTitle>
          <CardDescription>SMP Negeri 2 Pamboang</CardDescription>
        </CardHeader>
        <CardContent>
          {/* Render Client Component Form */}
          <RegisterForm />

          <div className="mt-4 text-center text-sm">
            Sudah punya akun?{" "}
            <Button variant="link" asChild className="p-0">
              <Link href="/login">Login di sini</Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    </main>
  );
}
