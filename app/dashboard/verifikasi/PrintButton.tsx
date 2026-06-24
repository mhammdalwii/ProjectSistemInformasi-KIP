// Lokasi: app/dashboard/verifikasi/PrintButton.tsx
"use client";

import { Button } from "@/components/ui/button";
import { Printer } from "lucide-react";

export function PrintButton() {
  return (
    <Button onClick={() => window.print()} variant="outline" className="border-blue-600 text-blue-600 hover:bg-blue-50">
      <Printer className="mr-2 h-4 w-4" />
      Cetak Arsip Verifikasi
    </Button>
  );
}
