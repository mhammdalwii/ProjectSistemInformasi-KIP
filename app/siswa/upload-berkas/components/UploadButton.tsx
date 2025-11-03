// Lokasi: app/siswa/dashboard/components/UploadButton.tsx

"use client";

import { type PutBlobResult } from "@vercel/blob";
import { useState, useRef, useTransition } from "react";
import { Button } from "@/components/ui/button";
import { Loader2, Upload } from "lucide-react";

interface UploadButtonProps {
  label: string;
  onUploadComplete: (blob: PutBlobResult) => void;
}

export function UploadButton({ label, onUploadComplete }: UploadButtonProps) {
  const inputFileRef = useRef<HTMLInputElement>(null);
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);

  const handleUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    setError(null);

    const file = event.target.files?.[0];
    if (!file) {
      setError("File tidak dipilih.");
      return;
    }

    // Validasi ukuran file (5MB)
    if (file.size > 5 * 1024 * 1024) {
      setError("Ukuran file melebihi 5MB");
      return;
    }

    // Validasi tipe file
    const allowedTypes = ["application/pdf", "image/jpeg", "image/png", "image/jpg"];
    if (!allowedTypes.includes(file.type)) {
      setError("Tipe file tidak diizinkan. Hanya PDF, JPG, JPEG, PNG yang diperbolehkan.");
      return;
    }

    startTransition(async () => {
      try {
        const formData = new FormData();
        formData.append("file", file);

        const response = await fetch("/api/upload", {
          method: "POST",
          body: formData,
        });

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.error || "Gagal mengupload file");
        }

        const newBlob: PutBlobResult = await response.json();

        // Panggil fungsi callback dari parent
        onUploadComplete(newBlob);

        // Reset input file
        if (inputFileRef.current) {
          inputFileRef.current.value = "";
        }
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } catch (err: any) {
        console.error("Upload error:", err);
        setError(err.message || "Gagal meng-upload file.");
      }
    });
  };

  return (
    <div>
      <Button onClick={() => inputFileRef.current?.click()} variant="outline" size="sm" disabled={isPending}>
        {isPending ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Upload className="mr-2 h-4 w-4" />}
        {isPending ? "Mengupload..." : label}
      </Button>

      {/* Input file tersembunyi */}
      <input type="file" ref={inputFileRef} onChange={handleUpload} className="hidden" accept=".pdf,.jpg,.jpeg,.png" />
      {error && <p className="text-sm text-red-600 mt-2">{error}</p>}
    </div>
  );
}
