// Lokasi: prisma/seed.ts

import { PrismaClient, Role } from "@prisma/client"; // Impor Role
import bcrypt from "bcrypt";

const prisma = new PrismaClient();

async function main() {
  const email = "admin@smpn2pamboang.sch.id";
  const password = "admin123";

  // Hapus admin lama jika ada
  await prisma.user.deleteMany({
    where: { email: email },
  });

  const hashedPassword = await bcrypt.hash(password, 12);

  // Buat user admin baru dengan ROLE: ADMIN
  const adminUser = await prisma.user.create({
    data: {
      email: email,
      name: "Admin Sekolah",
      password: hashedPassword,
      role: Role.ADMIN,
    },
  });

  console.log(`Admin berhasil dibuat: ${adminUser.email}`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
