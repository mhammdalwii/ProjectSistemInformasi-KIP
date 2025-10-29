// Lokasi: app/cek-status/page.tsx

import Link from "next/link";
import { CekStatusForm } from "./cek-status-form";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

// Ini adalah Server Component
export default function CekStatusPage() {
  return (
    // Kita buat layout sederhana di tengah layar
    <main className="flex min-h-screen w-full items-center justify-center bg-gray-100 p-4">
      <div className="w-full max-w-md">
        <Card>
          <CardHeader className="text-center">
            <CardTitle className="text-2xl">Cek Status Penerima KIP</CardTitle>
            <CardDescription>SMP Negeri 2 Pamboang</CardDescription>
          </CardHeader>
          <CardContent>
            {/* 1. Render komponen formulir (Client Component) */}
            <CekStatusForm />

            {/* 2. Tombol kembali ke Landing Page */}
            <Button variant="link" className="w-full mt-4" asChild>
              <Link href="/">Kembali ke Halaman Utama</Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    </main>
  );
}
