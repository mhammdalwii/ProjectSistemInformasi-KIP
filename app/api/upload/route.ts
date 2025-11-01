import { handleUpload, type HandleUploadBody } from "@vercel/blob/client";
import { NextResponse } from "next/server";

const MAX_FILE_SIZE_MB = 5;
const MAX_FILE_SIZE_BYTES = MAX_FILE_SIZE_MB * 1024 * 1024;

// API Route ini menangani izin upload
export async function POST(request: Request): Promise<NextResponse> {
  const body = (await request.json()) as HandleUploadBody;

  try {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const jsonResponse = await (handleUpload as any)({
      body,
      request,
      allowedContentTypes: ["application/pdf", "image/jpeg", "image/png", "image/jpg"],
      maxSizeInBytes: MAX_FILE_SIZE_BYTES,
      token: process.env.VERCEL_BLOB_READ_WRITE_TOKEN,
      onBeforeUpload: async (filename: string) => {
        console.log(`Menerima izin untuk upload: ${filename}`);
        return {};
      },

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      onUploadCompleted: async ({ blob, tokenPayload }: any) => {
        console.log("blob upload completed", blob.pathname);
      },
    });

    return NextResponse.json(jsonResponse);
  } catch (error) {
    return NextResponse.json({ error: (error as Error).message }, { status: 400 });
  }
}
