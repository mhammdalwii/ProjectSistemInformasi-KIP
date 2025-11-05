"use client";

import { User, StatusKIP } from "@prisma/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { approveSiswa, rejectSiswa, resetSiswa } from "../../actions";
import { useTransition } from "react";
import { Loader2, Link as LinkIcon, CheckCircle, XCircle, AlertCircle, Info } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { EditStudentDialog } from "./EditStudentDialog";

// Definisikan tipe untuk dokumen
type DocumentKey = "urlKK" | "urlKIP" | "urlKTPOrangTua" | "urlAkta" | "urlSKTM";

const documents: { key: DocumentKey; name: string }[] = [
  { key: "urlKK", name: "Kartu Keluarga (KK)" },
  { key: "urlKIP", name: "Kartu KIP (Jika ada)" },
  { key: "urlKTPOrangTua", name: "KTP Kedua Orang Tua" },
  { key: "urlAkta", name: "Akta Kelahiran" },
  { key: "urlSKTM", name: "Surat Ket. Tidak Mampu (SKTM)" },
];

// Extend Siswa type dengan field opsional untuk dokumen
type SiswaWithDocuments = User & {
  urlKK?: string | null;
  urlKIP?: string | null;
  urlKTPOrangTua?: string | null;
  urlAkta?: string | null;
  urlSKTM?: string | null;
  nomorKIP?: string | null;
  tahunPenerimaan?: number | null;
};

export function VerificationCard({ siswa }: { siswa: SiswaWithDocuments }) {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  const handleAction = async (action: (id: string) => Promise<{ success: boolean; message: string }>, confirmMessage: string) => {
    const isConfirmed = window.confirm(confirmMessage);
    if (isConfirmed) {
      startTransition(async () => {
        try {
          const result = await action(siswa.id);
          if (result.success) {
            alert(result.message);
            router.refresh();
          } else {
            alert(`Gagal: ${result.message}`);
          }
        } catch (error) {
          alert("Terjadi kesalahan saat memproses aksi");
        }
      });
    }
  };

  const isLocked = siswa.status === StatusKIP.DITERIMA || siswa.status === StatusKIP.DITOLAK;

  const getStatusAlert = () => {
    switch (siswa.status) {
      case StatusKIP.PROSES:
        return (
          <Alert className="border-yellow-500 bg-yellow-50">
            <AlertCircle className="h-4 w-4 text-yellow-600" />
            <AlertTitle className="text-yellow-800">Menunggu Verifikasi</AlertTitle>
            <AlertDescription className="text-yellow-700">Silakan periksa dokumen dan lakukan aksi di bawah ini.</AlertDescription>
          </Alert>
        );
      case StatusKIP.DITERIMA:
        return (
          <Alert className="border-green-500 bg-green-50">
            <CheckCircle className="h-4 w-4 text-green-600" />
            <AlertTitle className="text-green-800">Status: Diterima</AlertTitle>
            <AlertDescription className="text-green-700">Siswa ini sudah diverifikasi dan diterima.</AlertDescription>
          </Alert>
        );
      case StatusKIP.DITOLAK:
        return (
          <Alert variant="destructive">
            <XCircle className="h-4 w-4" />
            <AlertTitle>Status: Ditolak</AlertTitle>
            <AlertDescription>Siswa ini telah ditolak.</AlertDescription>
          </Alert>
        );
      default:
        return (
          <Alert>
            <Info className="h-4 w-4" />
            <AlertTitle>Belum Diajukan</AlertTitle>
            <AlertDescription>Siswa ini belum melengkapi dan mengajukan berkas.</AlertDescription>
          </Alert>
        );
    }
  };

  return (
    <div className="space-y-6">
      {/*  Info & Dokumen */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/*  Info Siswa */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              Informasi Siswa
              <Badge variant={siswa.status === StatusKIP.DITERIMA ? "default" : siswa.status === StatusKIP.DITOLAK ? "destructive" : "secondary"}>{siswa.status}</Badge>
              <EditStudentDialog siswa={siswa} />
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <InfoItem label="Nama" value={siswa.name} />
            <InfoItem label="NISN" value={siswa.nisn} />
            <InfoItem label="Kelas" value={siswa.kelas} />
            <InfoItem label="Nomor KIP" value={siswa.nomorKIP || "Tidak ada"} />
            <InfoItem label="Tahun" value={siswa.tahunPenerimaan?.toString() || "Tidak ditentukan"} />
            <InfoItem label="Tanggal Daftar" value={siswa.createdAt.toLocaleDateString("id-ID")} />
          </CardContent>
        </Card>

        {/*  Berkas Dokumen */}
        <Card>
          <CardHeader>
            <CardTitle>Berkas Dokumen</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {documents.map((doc) => {
                const url = siswa[doc.key];
                const hasDocument = !!url;

                return (
                  <div key={doc.key} className="flex items-center justify-between p-3 border rounded-lg">
                    <span className="font-medium text-sm">{doc.name}</span>
                    {hasDocument ? (
                      <Button variant="outline" size="sm" asChild>
                        <Link href={url} target="_blank" rel="noopener noreferrer">
                          <LinkIcon className="mr-2 h-3 w-3" />
                          Lihat File
                        </Link>
                      </Button>
                    ) : (
                      <Badge variant="outline" className="text-xs">
                        Tidak ada
                      </Badge>
                    )}
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>
      </div>

      {/*  Aksi Verifikasi */}
      <Card>
        <CardHeader>
          <CardTitle>Aksi Verifikasi</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {getStatusAlert()}

          <div className="flex flex-col sm:flex-row gap-3">
            {!isLocked ? (
              <>
                <Button className="flex-1 bg-green-600 hover:bg-green-700 text-white" onClick={() => handleAction(approveSiswa, "Apakah Anda yakin ingin MENYETUJUI siswa ini?")} disabled={isPending || siswa.status !== StatusKIP.PROSES}>
                  {isPending ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
                  Setujui / Verifikasi
                </Button>

                <Button className="flex-1" variant="destructive" onClick={() => handleAction(rejectSiswa, "Apakah Anda yakin ingin MENOLAK siswa ini?")} disabled={isPending || siswa.status !== StatusKIP.PROSES}>
                  {isPending ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
                  Tolak
                </Button>
              </>
            ) : (
              <Button className="flex-1" variant="outline" onClick={() => handleAction(resetSiswa, "Kembalikan status ke 'PROSES'?")} disabled={isPending}>
                {isPending ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
                Reset Status ke Proses
              </Button>
            )}
          </div>

          {siswa.status === "BELUM_DIAJUKAN" && <p className="text-center text-sm text-muted-foreground">Aksi belum tersedia karena siswa belum mengajukan verifikasi.</p>}
        </CardContent>
      </Card>
    </div>
  );
}

// Komponen untuk menampilkan info
function InfoItem({ label, value }: { label: string; value: string | null | undefined | number }) {
  if (!value && value !== 0) return null;

  return (
    <div className="flex justify-between items-center py-2 border-b last:border-b-0">
      <dt className="font-medium text-sm text-gray-600">{label}</dt>
      <dd className="text-sm text-gray-900 text-right">{value}</dd>
    </div>
  );
}
