/* eslint-disable @typescript-eslint/no-explicit-any */
import * as z from "zod";

const MAX_FILE_SIZE = 5000000000000000000000;
const ACCEPTED_IMAGE_TYPE = ["image/jpeg", "image/jpg", "image/png"];

export const workerProfileUpdateSchema = z.object({
  user_id: z.number(),
  username: z.string().min(1, { message: "Username dibutuhkan" }),
  name: z.string().min(1, { message: "Nama lengkap dibutuhkan" }),
  email: z
    .string()
    .min(1, { message: "Email dibutuhkan" })
    .email("Bukan email yang valid"),
  skills: z.array(z.string()).refine((value) => value.some((item) => item), {
    message: "Pekerja harus memilih minimal salah satu skill yang dikuasai",
  }),
  phone: z.string().min(1, { message: "No HP dibutuhkan" }),
  address: z.string().min(1, { message: "Alamat dibutuhkan" }),
  image: z
    .any()
    .refine(
      (files) => files?.[0]?.size <= MAX_FILE_SIZE,
      "Ukuran gambar maksimal 5MB"
    )
    .refine(
      (files) => ACCEPTED_IMAGE_TYPE.includes(files?.[0]?.type),
      "hanya bisa memasukan gambar dengan format Only .jpg, .jpeg, and .png"
    )
    .optional(),
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
