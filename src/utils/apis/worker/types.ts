/* eslint-disable @typescript-eslint/no-explicit-any */
import * as z from "zod";

const MAX_FILE_SIZE = 5000000;
const ACCEPTED_IMAGE_TYPES = ["image/jpeg", "image/jpg", "image/png"];

export const workerProfileUpdateSchema = z.object({
  username: z.string().min(1, { message: "Username wajib diisi" }),
  nama: z.string().min(1, { message: "Nama lengkap wajib diisi" }),
  email: z
    .string()
    .min(1, { message: "Email wajib diisi" })
    .email("Bukan email yang valid"),
  skill: z
    .array(z.object({ value: z.number(), label: z.string() }))
    .min(1, { message: "Skill wajib diisi" }),
  nohp: z.string().min(1, { message: "Nomer HP wajib diisi" }),
  alamat: z.string().min(1, { message: "alamat wajib diisi" }),
  foto: z
    .any()
    .refine((files) => files?.size <= MAX_FILE_SIZE, `Max image size is 5MB`)
    .refine(
      (files) => ACCEPTED_IMAGE_TYPES.includes(files?.type),
      "Only .jpg, .jpeg, and .png formats are supported."
    )
    .optional()
    .or(z.literal("")),
});

export type WorkerUpdateType = z.infer<typeof workerProfileUpdateSchema>;

export interface Worker {
  user_id: number;
  username: string;
  name: string;
  email: string;
  phone: string;
  address: string;
  skills: string[];
  image: string;
}

export interface UpdateWorker {
  user_id: number;
  username: string;
  name: string;
  email: string;
  phone: string;
  address: string;
  skills: string[];
}

export interface JobWorker {
  workername: string;
  start_date: string;
  end_date: string;
  price: number;
  deskripsi: string;
}
