// Lokasi: app/siswa/dashboard/components/UploadItem.tsx

"use client";

import { Button } from "@/components/ui/button";
import { UploadButton } from "./UploadButton";
import { CheckCircle, Link as LinkIcon } from "lucide-react";
import Link from "next/link";
import { type PutBlobResult } from "@vercel/blob";

interface UploadItemProps {
  docName: string;
  docKey: string;
  currentUrl: string | null;
  onUploadComplete: (docKey: string, blob: PutBlobResult) => Promise<void>;
}

export function UploadItem({ docName, docKey, currentUrl, onUploadComplete }: UploadItemProps) {
  const handleComplete = async (blob: PutBlobResult) => {
    // Panggil Server Action dari parent
    await onUploadComplete(docKey, blob);
  };

  return (
    <li className="flex flex-col md:flex-row md:items-center justify-between gap-2 p-3 border rounded-lg">
      <div className="flex items-center gap-2">
        {currentUrl ? <CheckCircle className="h-5 w-5 text-green-600" /> : <CheckCircle className="h-5 w-5 text-gray-300" />}
        <span className="font-medium">{docName}</span>
      </div>

      <div className="flex gap-2">
        {currentUrl && (
          <Button variant="secondary" size="sm" asChild>
            <Link href={currentUrl} target="_blank">
              <LinkIcon className="mr-2 h-4 w-4" />
              Lihat File
            </Link>
          </Button>
        )}
        <UploadButton label={currentUrl ? "Upload Ulang" : "Upload File"} onUploadComplete={handleComplete} />
      </div>
    </li>
  );
}
