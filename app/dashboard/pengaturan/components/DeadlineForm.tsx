"use client";

import { useState, useTransition } from "react";
import { updateDeadline } from "../actions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Loader2, CheckCircle, AlertCircle } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

interface DeadlineFormProps {
  initialDate: string;
}

export function DeadlineForm({ initialDate }: DeadlineFormProps) {
  const [isPending, startTransition] = useTransition();
  const [status, setStatus] = useState<{
    type: "success" | "error" | null;
    message: string;
  }>({ type: null, message: "" });

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setStatus({ type: null, message: "" });

    const formData = new FormData(event.currentTarget);

    startTransition(async () => {
      const result = await updateDeadline(formData);

      if (result.success) {
        // Tampilkan Pesan Sukses di UI
        setStatus({ type: "success", message: result.message });

        // Tampilkan POP UP
        alert("Berhasil! " + result.message);
      } else {
        setStatus({ type: "error", message: result.message });
      }
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {/* --- TAMPILAN NOTIFIKASI UI --- */}
      {status.type === "success" && (
        <Alert className="border-green-500 bg-green-50 text-green-900">
          <CheckCircle className="h-4 w-4" />
          <AlertTitle>Sukses</AlertTitle>
          <AlertDescription>{status.message}</AlertDescription>
        </Alert>
      )}

      {status.type === "error" && (
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Gagal</AlertTitle>
          <AlertDescription>{status.message}</AlertDescription>
        </Alert>
      )}
      {/* ----------------------------- */}

      <div className="space-y-2">
        <Label htmlFor="deadline">Tanggal Jatuh Tempo</Label>
        <Input type="date" id="deadline" name="deadline" defaultValue={initialDate} required disabled={isPending} />
      </div>

      <Button type="submit" disabled={isPending}>
        {isPending ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Menyimpan...
          </>
        ) : (
          "Simpan Jadwal"
        )}
      </Button>
    </form>
  );
}
