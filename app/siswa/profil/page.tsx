import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import prismadb from "@/lib/db";
import { notFound, redirect } from "next/navigation";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { User } from "@prisma/client";
import { ProfileForm } from "./components/ProfileForm";
import { Metadata } from "next";

// SEO
export const metadata: Metadata = {
  title: "Profil Saya",
};

// Fungsi helper untuk ambil data (kita bisa refaktor ini nanti)
async function getSiswaData(): Promise<User | null> {
  const session = await getServerSession(authOptions);
  if (!session || !session.user || session.user.role !== "SISWA") {
    redirect("/login");
  }
  const siswa = await prismadb.user.findUnique({
    where: {
      id: session.user.id,
    },
  });
  return siswa;
}

export default async function ProfilPage() {
  const siswa = await getSiswaData();

  if (!siswa) {
    notFound();
  }

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold tracking-tight text-gray-900">Profil Saya</h1>

      <Card>
        <CardHeader>
          <CardTitle>Data Akun</CardTitle>
          <CardDescription>Perbarui data diri Anda. Data NISN dan Email tidak dapat diubah.</CardDescription>
        </CardHeader>
        <CardContent>
          <ProfileForm siswa={siswa} />
        </CardContent>
      </Card>
    </div>
  );
}
