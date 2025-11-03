import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import prismadb from "@/lib/db";
import { notFound, redirect } from "next/navigation";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { User } from "@prisma/client";
import { UploadManager } from "./components/UploadManager";
import Link from "next/link";

// Fungsi ini bisa kita copy dari dashboard
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

export default async function UploadBerkasPage() {
  const siswa = await getSiswaData();

  if (!siswa) {
    notFound();
  }

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold tracking-tight text-gray-900">Upload Berkas Persyaratan</h1>

      <Card>
        <CardHeader>
          <CardTitle>Kelengkapan Berkas</CardTitle>
          <CardDescription>{siswa.status === "BELUM_DIAJUKAN" ? "Silakan upload semua berkas yang dibutuhkan di bawah ini." : "Berkas Anda telah diajukan dan tidak dapat diubah."}</CardDescription>
        </CardHeader>
        <CardContent>
          {/* Render Organisme UploadManager */}
          {siswa.status === "BELUM_DIAJUKAN" ? (
            <UploadManager siswa={siswa} />
          ) : (
            // Tampilkan daftar file read-only
            <ul className="list-disc space-y-2 pl-5">
              <li>
                KK:{" "}
                {siswa.urlKK ? (
                  <Link href={siswa.urlKK} target="_blank" className="text-blue-600">
                    Lihat
                  </Link>
                ) : (
                  "Tidak ada"
                )}
              </li>
              <li>
                KIP:{" "}
                {siswa.urlKIP ? (
                  <Link href={siswa.urlKIP} target="_blank" className="text-blue-600">
                    Lihat
                  </Link>
                ) : (
                  "Tidak ada"
                )}
              </li>
              <li>
                KTP:{" "}
                {siswa.urlKTPOrangTua ? (
                  <Link href={siswa.urlKTPOrangTua} target="_blank" className="text-blue-600">
                    Lihat
                  </Link>
                ) : (
                  "Tidak ada"
                )}
              </li>
              <li>
                Akta:{" "}
                {siswa.urlAkta ? (
                  <Link href={siswa.urlAkta} target="_blank" className="text-blue-600">
                    Lihat
                  </Link>
                ) : (
                  "Tidak ada"
                )}
              </li>
              <li>
                SKTM:{" "}
                {siswa.urlSKTM ? (
                  <Link href={siswa.urlSKTM} target="_blank" className="text-blue-600">
                    Lihat
                  </Link>
                ) : (
                  "Tidak ada"
                )}
              </li>
            </ul>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
