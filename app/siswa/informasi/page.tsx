import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AlertTriangle, CheckCircle } from "lucide-react";

export default function InformasiPage() {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold tracking-tight text-gray-900">Informasi Persyaratan KIP</h1>

      <Card>
        <CardHeader>
          <CardTitle>Dokumen Wajib</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p>Pastikan Anda memiliki scan (foto jelas atau PDF) dari semua dokumen di bawah ini sebelum Anda mengajukan verifikasi.</p>
          <ul className="list-disc space-y-2 pl-5">
            <li>
              <strong>Kartu Keluarga (KK)</strong>
            </li>
            <li>
              <strong>Kartu Tanda Penduduk (KTP) Kedua Orang Tua</strong> (atau Wali)
            </li>
            <li>
              <strong>Akta Kelahiran Siswa</strong>
            </li>
            <li>
              <strong>Surat Keterangan Tidak Mampu (SKTM)</strong>
              <span className="ml-2 text-sm text-gray-500">(Dikeluarkan oleh Desa/Kelurahan, minimal tahun ini)</span>
            </li>
          </ul>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Dokumen Pendukung (Opsional)</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <ul className="list-disc space-y-2 pl-5">
            <li>
              <strong>Kartu KIP (SD/Lanjutan)</strong>
              <p className="text-sm text-gray-600">Sangat disarankan untuk di-upload jika Anda sudah memiliki Kartu Indonesia Pintar (KIP) dari jenjang SD/SMP sebelumnya.</p>
            </li>
          </ul>
        </CardContent>
      </Card>

      <Card className="border-l-4 border-yellow-500">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <AlertTriangle className="h-5 w-5 text-yellow-600" />
            Penting: Batas Ukuran & Tipe File
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          <p className="flex items-center gap-2">
            <CheckCircle className="h-4 w-4 text-green-600" />
            Tipe file yang diizinkan: <strong>PDF, JPG, JPEG, PNG</strong>.
          </p>
          <p className="flex items-center gap-2">
            <CheckCircle className="h-4 w-4 text-green-600" />
            Ukuran file maksimum: <strong>5 MB</strong>.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
