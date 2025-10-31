// Lokasi: app/siswa/dashboard/components/UploadButton.tsx

"use client";

import { type PutBlobResult } from "@vercel/blob";
import { upload } from "@vercel/blob/client";
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

    startTransition(async () => {
      try {
        // 'upload' akan memanggil /api/upload/route.ts kita
        const newBlob = await upload(file.name, file, {
          access: "public",
          handleUploadUrl: "/api/upload",
        });

        // Panggil fungsi callback dari parent
        onUploadComplete(newBlob);
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } catch (err: any) {
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
      <input type="file" ref={inputFileRef} onChange={handleUpload} className="hidden" accept="application/pdf,image/*" />
      {error && <p className="text-sm text-red-600 mt-2">{error}</p>}
    </div>
  );
}
