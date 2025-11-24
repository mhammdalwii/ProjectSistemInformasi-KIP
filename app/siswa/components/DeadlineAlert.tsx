"use client";

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { CalendarClock, AlertTriangle, CalendarPlus } from "lucide-react";

interface DeadlineAlertProps {
  deadlineString: string | null;
  statusSiswa: string;
}

export function DeadlineAlert({ deadlineString, statusSiswa }: DeadlineAlertProps) {
  // Cek: Jika siswa sudah setor atau deadline belum diatur, sembunyikan alert
  if (statusSiswa !== "BELUM_DIAJUKAN" || !deadlineString) {
    return null;
  }

  const deadline = new Date(deadlineString);
  const today = new Date();

  // Hitung sisa hari
  const diffTime = deadline.getTime() - today.getTime();
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

  // Format tanggal indonesia
  const formattedDate = deadline.toLocaleDateString("id-ID", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  // --- LOGIKA MEMBUAT LINK GOOGLE CALENDAR ---
  const generateGoogleCalendarLink = () => {
    const dateStr = deadline.toISOString().split("T")[0].replace(/-/g, "");

    // Parameter URL
    const title = encodeURIComponent("Batas Akhir Pengumpulan Berkas KIP");
    const details = encodeURIComponent("Segera upload berkas KIP di website SMPN 2 Pamboang sebelum hari ini berakhir.");

    // Format URL Google Calendar Template
    // dates=START/END (Kita buat seharian penuh di tanggal deadline)
    return `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${title}&dates=${dateStr}/${dateStr}&details=${details}`;
  };
  // -------------------------------------------

  //  Sudah Lewat (Expired)
  if (diffDays < 0) {
    return (
      <Alert variant="destructive" className="mb-6 border-2 border-red-600 bg-red-50">
        <AlertTriangle className="h-5 w-5" />
        <AlertTitle className="text-lg font-bold">Masa Pengumpulan Berakhir</AlertTitle>
        <AlertDescription>Maaf, batas waktu telah berakhir pada {formattedDate}. Hubungi admin sekolah.</AlertDescription>
      </Alert>
    );
  }

  //  Masih Berlaku (Tampilkan Tombol Calendar)
  // Jika <= 7 hari, warnanya merah (mendesak). Jika > 7 hari, warnanya biru (info).
  const isUrgent = diffDays <= 7;

  return (
    <Alert
      variant={isUrgent ? "destructive" : "default"}
      className={`mb-6 flex flex-col md:flex-row justify-between items-start md:items-center gap-4 ${isUrgent ? "bg-red-50 border-red-500 text-red-900" : "bg-blue-50 border-blue-200 text-blue-900"}`}
    >
      <div className="flex-1">
        <div className="flex items-center gap-2 mb-1">
          {isUrgent ? <AlertTriangle className="h-5 w-5" /> : <CalendarClock className="h-5 w-5" />}
          <AlertTitle className="font-bold text-lg">{isUrgent ? "Segera Kumpulkan Berkas!" : "Pengingat Jadwal"}</AlertTitle>
        </div>
        <AlertDescription className="text-base">
          Batas akhir pengumpulan adalah <strong>{formattedDate}</strong> ({diffDays} hari lagi).
        </AlertDescription>
      </div>

      {/* TOMBOL GOOGLE CALENDAR */}
      <Button size="sm" variant="outline" className="bg-white hover:bg-gray-100 text-black border-gray-300 shadow-sm shrink-0" onClick={() => window.open(generateGoogleCalendarLink(), "_blank")}>
        <CalendarPlus className="mr-2 h-4 w-4" />
        Simpan ke Google Calendar
      </Button>
    </Alert>
  );
}
