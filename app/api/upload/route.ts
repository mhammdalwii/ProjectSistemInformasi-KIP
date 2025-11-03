import { put } from "@vercel/blob";
import { NextResponse } from "next/server";

const MAX_FILE_SIZE_MB = 5;
const MAX_FILE_SIZE_BYTES = MAX_FILE_SIZE_MB * 1024 * 1024;

export async function POST(request: Request): Promise<NextResponse> {
  try {
    const formData = await request.formData();
    const file = formData.get("file") as File;

    // Validasi file
    if (!file) {
      return NextResponse.json({ error: "File tidak dipilih" }, { status: 400 });
    }

    // Validasi ukuran file
    if (file.size > MAX_FILE_SIZE_BYTES) {
      return NextResponse.json({ error: `Ukuran file melebihi batas ${MAX_FILE_SIZE_MB}MB` }, { status: 400 });
    }

    // Validasi tipe file
    const allowedTypes = ["application/pdf", "image/jpeg", "image/png", "image/jpg"];

    if (!allowedTypes.includes(file.type)) {
      return NextResponse.json({ error: "Tipe file tidak diizinkan" }, { status: 400 });
    }

    // Generate unique filename
    const timestamp = Date.now();
    const extension = file.name.split(".").pop();
    const filename = `${timestamp}.${extension}`;

    const blob = await put(filename, file, {
      access: "public",
    });

    console.log("Upload berhasil:", blob.url);

    return NextResponse.json(blob);
  } catch (error) {
    console.error("Error upload:", error);
    return NextResponse.json({ error: "Gagal mengupload file" }, { status: 500 });
  }
}
