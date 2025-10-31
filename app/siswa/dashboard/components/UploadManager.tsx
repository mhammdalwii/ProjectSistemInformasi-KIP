// Lokasi: app/siswa/dashboard/components/UploadManager.tsx

"use client";

import { User } from "@prisma/client";
import { UploadItem } from "./UploadItem";
import { updateDocumentUrl, submitVerification } from "../actions";
import { type PutBlobResult } from "@vercel/blob";
import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";

// Daftar dokumen
const documents = [
  { key: "urlKK", name: "Kartu Keluarga (KK)" },
  { key: "urlKIP", name: "Kartu KIP (Jika ada)" },
  { key: "urlKTPOrangTua", name: "KTP Kedua Orang Tua" },
  { key: "urlAkta", name: "Akta Kelahiran" },
  { key: "urlSKTM", name: "Surat Ket. Tidak Mampu (SKTM)" },
];

export function UploadManager({ siswa }: { siswa: User }) {
  const router = useRouter();
  const [isSubmitting, startSubmitTransition] = useTransition();

  // Callback untuk 'UploadItem'
  const handleUploadComplete = async (docKey: string, blob: PutBlobResult) => {
    // Panggil Server Action untuk menyimpan URL ke database
    try {
      await updateDocumentUrl(siswa.id, docKey, blob.url);
      // Refresh halaman untuk menunjukkan URL baru
      router.refresh();
    } catch (error) {
      console.error(error);
      alert("Gagal menyimpan URL file.");
    }
  };

  // Cek apakah semua dokumen WAJIB sudah di-upload
  // (KIP opsional, jadi kita tidak cek 'urlKIP')
  const allDocsUploaded = siswa.urlKK && siswa.urlKTPOrangTua && siswa.urlAkta && siswa.urlSKTM;

  // Fungsi untuk tombol "Ajukan Verifikasi"
  const handleSubmit = () => {
    if (!allDocsUploaded) {
      alert("Harap upload semua dokumen wajib (selain KIP) sebelum mengajukan.");
      return;
    }

    const isConfirmed = window.confirm("Apakah Anda yakin ingin mengajukan verifikasi? Anda tidak dapat mengubah berkas setelah diajukan.");

    if (isConfirmed) {
      startSubmitTransition(async () => {
        try {
          await submitVerification(siswa.id);
          router.refresh();
        } catch (error) {
          alert("Gagal mengajukan verifikasi.");
        }
      });
    }
  };

  return (
    <div className="space-y-6">
      <ul className="space-y-3">
        {documents.map((doc) => (
          <UploadItem
            key={doc.key}
            docName={doc.name}
            docKey={doc.key}
            // - Ambil URL dari 'siswa' berdasarkan 'key'
            currentUrl={siswa[doc.key as keyof User] as string | null}
            onUploadComplete={handleUploadComplete}
          />
        ))}
      </ul>

      {/* Tombol Ajukan Verifikasi */}
      {siswa.status === "BELUM_DIAJUKAN" && (
        <div className="text-center pt-4 border-t">
          <Button size="lg" onClick={handleSubmit} disabled={!allDocsUploaded || isSubmitting}>
            {isSubmitting ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
            {isSubmitting ? "Mengajukan..." : "Ajukan Verifikasi"}
          </Button>
          {!allDocsUploaded && <p className="text-sm text-gray-500 mt-2">Tombol akan aktif setelah semua dokumen wajib (selain KIP) di-upload.</p>}
        </div>
      )}

      {siswa.status === "PROSES" && <p className="text-center text-lg font-medium text-yellow-600">Berkas Anda sedang dalam proses verifikasi oleh Admin.</p>}
    </div>
  );
}
