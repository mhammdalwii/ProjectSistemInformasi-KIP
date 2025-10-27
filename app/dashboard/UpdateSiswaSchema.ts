"use server"; // <-- Menandakan ini adalah Server Action

import { z } from "@/node_modules/zod/v4/classic/external.cjs";
import { SiswaSchema } from "./actions";

export const UpdateSiswaSchema = SiswaSchema.extend({
  id: z.string().cuid("ID Siswa tidak valid"),
});
