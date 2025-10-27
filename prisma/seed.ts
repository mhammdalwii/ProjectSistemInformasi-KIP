import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();

async function main() {
  const email = "admin@smpn2pamboang.sch.id";
  const password = "admin123"; // Password admin pertama Anda

  // 1. Hapus admin lama jika ada
  await prisma.user.deleteMany({
    where: { email: email },
  });

  // 2. Hash password-nya
  const hashedPassword = await bcrypt.hash(password, 12);

  // 3. Buat user admin baru
  const adminUser = await prisma.user.create({
    data: {
      email: email,
      name: "Admin Sekolah",
      password: hashedPassword,
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
