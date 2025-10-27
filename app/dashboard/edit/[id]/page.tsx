// Lokasi: app/dashboard/edit/[id]/page.tsx

import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import prismadb from "@/lib/db";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { notFound } from "next/navigation";
import { EditForm } from "./edit-form";

export default async function EditSiswaPage({ params }: { params: { id: string } }) {
  const siswaId = params.id;

  // 1. Ambil data siswa dari database (tetap di server)
  const siswa = await prismadb.siswa.findUnique({
    where: {
      id: siswaId,
    },
  });

  // 2. Jika siswa tidak ditemukan
  if (!siswa) {
    notFound();
  }

  // 3. Render Card (Server) dan Form (Client)
  return (
    <Card className="max-w-3xl mx-auto">
      <CardHeader>
        <div className="flex items-center gap-4">
          <Button variant="outline" size="icon" asChild>
            <Link href="/dashboard">
              <ArrowLeft className="h-4 w-4" />
            </Link>
          </Button>
          <CardTitle>Edit Data Siswa</CardTitle>
        </div>
      </CardHeader>
      <CardContent>
        {/* Ganti seluruh <form> dengan komponen <EditForm> */}
        <EditForm siswa={siswa} />
      </CardContent>
    </Card>
  );
}
