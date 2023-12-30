import * as z from "zod";

const MAX_FILE_SIZE = 5000000;
const ACCEPTED_IMAGE_TYPES = ["image/jpeg", "image/jpg", "image/png"];

export const clientProfileUpdateSchema = z.object({
  username: z.string().min(1, { message: "Username wajib diisi" }),
  nama: z.string().min(1, { message: "Nama lengkap wajib diisi" }),
  email: z
    .string()
    .min(1, { message: "Email wajib diisi" })
    .email("Bukan email yang valid"),
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

export type ClientUpdateType = z.infer<typeof clientProfileUpdateSchema>;

export interface JobOrder {
  workername: string;
  start_date: string;
  end_date: string;
  price: number;
  deskripsi: string;
}

export const clientPostJobSchema = z.object({
  skill_id: z.number({
    required_error: "Id skill dibutuhkan",
    invalid_type_error: "Id skill harus berupa angka",
  }),
  worker_id: z.number({
    required_error: "Id worker dibutuhkan",
    invalid_type_error: "Id worker harus berupa angka",
  }),
  start_date: z.string().min(1, { message: "Tanggal mulai harus diisi" }),
  end_date: z.string().min(1, { message: "Tanggal berakhir harus diisi" }),
  alamat: z.string().min(1, { message: "Alamat harus diisi" }),
  description: z.string().min(1, { message: "Deskripsi harus diisi" }),
});

export type ClientPostJobType = z.infer<typeof clientPostJobSchema>;

export interface WorkerDetails {
  id: number;
  cover_image: string;
  name: string;
  address: string;
  total_projects: number;
  skills: string[];
}

export interface WorkerAvailables {
  id: number;
  username: string;
  nama: string;
  alamat: string;
  email: string;
  foto: string;
  skill: {
    skill_id: number;
    skill: string;
  }[];
}
export interface Worker {
  username: string;
  nohp:string;
  email: string;
  alamat: string;
  skill: {
    skill_id: number;
    skill: string;
  }[];
  projectHistory: string[];
  foto: string;
}

