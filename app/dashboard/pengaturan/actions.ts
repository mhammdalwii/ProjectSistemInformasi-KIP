"use server";

import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import prismadb from "@/lib/db";
import { Role } from "@prisma/client";
import { revalidatePath } from "next/cache";

export async function updateDeadline(formData: FormData): Promise<{ success: boolean; message: string }> {
  const session = await getServerSession(authOptions);

  if (session?.user?.role !== Role.ADMIN) {
    return { success: false, message: "Akses ditolak." };
  }

  const dateString = formData.get("deadline") as string;

  if (!dateString) {
    return { success: false, message: "Tanggal tidak valid." };
  }

  try {
    const deadlineDate = new Date(dateString);
    deadlineDate.setHours(23, 59, 59);

    await prismadb.systemSetting.upsert({
      where: { key: "deadline_kip" },
      update: { value: deadlineDate.toISOString() },
      create: {
        key: "deadline_kip",
        value: deadlineDate.toISOString(),
      },
    });

    revalidatePath("/dashboard/pengaturan");
    revalidatePath("/siswa/dashboard");

    return { success: true, message: "Jadwal jatuh tempo berhasil diperbarui." };
  } catch (error) {
    console.error(error);
    return { success: false, message: "Gagal menyimpan jadwal." };
  }
}
