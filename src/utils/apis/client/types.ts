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
    required_error: "Age is required",
    invalid_type_error: "Age must be a number",
  }),
  worker_id: z.number({
    required_error: "Age is required",
    invalid_type_error: "Age must be a number",
  }),
  start_date: z.string().min(1, { message: "Start Date is required" }),
  end_date: z.string().min(1, { message: "End Date is required" }),
  alamat: z.string().min(1, { message: "Addres is required" }),
  description: z.string().min(1, { message: "Description is required" }),
});

export type ClientPostJobType = z.infer<typeof clientPostJobSchema>;
