/* eslint-disable @typescript-eslint/no-explicit-any */
import * as z from "zod";

// const MAX_FILE_SIZE = 500000000;
// const ACCEPTED_IMAGE_TYPE = ["image/jpeg", "image/jpg", "image/png"];

export const workerProfileUpdateSchema = z.object({
  username: z.string().min(1, { message: "Username wajib diisi" }),
  nama: z.string().min(1, { message: "Nama lengkap wajib diisi" }),
  email: z
    .string()
    .min(1, { message: "Email wajib diisi" })
    .email("Bukan email yang valid"),
  skills: z.any(),
  nohp: z.string().min(1, { message: "Nomer HP wajib diisi" }),
  alamat: z.string().min(1, { message: "alamat wajib diisi" }),
  foto: z
    .any()
    // .refine(
    //   (files) => files?.[0]?.size <= MAX_FILE_SIZE,
    //   "Ukuran gambar maksimal adalah 5MB"
    // )
    // .refine(
    //   (files) => ACCEPTED_IMAGE_TYPE.includes(files?.[0]?.type),
    //   "Hanya format .jpg, .jpeg, and .png yang didukung"
    // ),
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
