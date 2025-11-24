import prismadb from "@/lib/db";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { CalendarClock } from "lucide-react";
import { DeadlineForm } from "./components/DeadlineForm";

async function getCurrentDeadline() {
  const setting = await prismadb.systemSetting.findUnique({
    where: { key: "deadline_kip" },
  });
  return setting?.value ? new Date(setting.value) : null;
}

export default async function PengaturanPage() {
  const currentDeadline = await getCurrentDeadline();

  // Format tanggal untuk value input (YYYY-MM-DD)
  const defaultDateValue = currentDeadline ? currentDeadline.toISOString().split("T")[0] : "";

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold tracking-tight text-gray-900">Pengaturan Sistem</h1>

      <Card className="max-w-lg">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <CalendarClock className="h-5 w-5" />
            Jadwal Pengumpulan
          </CardTitle>
          <CardDescription>Atur tanggal batas akhir (jatuh tempo) pengumpulan berkas siswa.</CardDescription>
        </CardHeader>
        <CardContent>
          {/* Panggil Client Component di sini */}
          <DeadlineForm initialDate={defaultDateValue} />
        </CardContent>
      </Card>
    </div>
  );
}
