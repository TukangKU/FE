/* eslint-disable @typescript-eslint/no-explicit-any */
import { RoleType } from "@/utils/types/api";
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

const baseSchema = z.object({
  role: z.string(),
});

export const updateJobSchema = z.discriminatedUnion("status", [
  z
    .object({
      status: z.literal("rejected"),
      note_negosiasi: z.string().optional(),
      harga: z.coerce.number().optional(),
    })
    .merge(baseSchema),
  z
    .object({
      status: z.literal("negotiation_to_client"),
      note_negosiasi: z
        .string()
        .min(1, { message: "Pesan negosiasi dibutuhkan" }),
      harga: z.coerce.number().gte(1, { message: "Masukan tawaran harga" }),
    })
    .merge(baseSchema),
  z
    .object({
      status: z.literal("negotiation_to_worker"),
      note_negosiasi: z
        .string()
        .min(1, { message: "Pesan negosiasi dibutuhkan" }),
      harga: z.coerce.number().gte(1, { message: "Masukan tawaran harga" }),
    })
    .merge(baseSchema),
  z
    .object({
      status: z.literal("negotiation"),
      note_negosiasi: z
        .string()
        .min(1, { message: "Pesan negosiasi dibutuhkan" }),
      harga: z.coerce.number().gte(1, { message: "Masukan tawaran harga" }),
    })
    .merge(baseSchema),
  z
    .object({
      status: z.literal("accepted"),
      note_negosiasi: z.string().optional(),
      harga: z.coerce.number().optional(),
    })
    .merge(baseSchema),
  z
    .object({
      status: z.literal("finished"),
      note_negosiasi: z.string().optional(),
      harga: z.coerce.number().optional(),
    })
    .merge(baseSchema),
  z
    .object({
      status: z.literal("pending"),
      note_negosiasi: z
        .string()
        .min(1, { message: "Pesan negosiasi dibutuhkan" }),
      harga: z.coerce.number().gte(1, { message: "Masukan tawaran harga" }),
    })
    .merge(baseSchema),
]);

export type UpdateJobSchema = z.infer<typeof updateJobSchema>;

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
  job_id: number;
  category: string;
  worker_name: string;
  client_name: string;
  foto: string;
  nohp: string;
  start_date: string;
  end_date: string;
  alamat: string;
  harga: number;
  deskripsi: string;
  note_negosiasi: string;
  status: string;
  status_payment: string;
}

export interface UpdateJob {
  deskripsi: string;
  price: string;
  status: string;
}

export interface RequestParams {
  path?: string;
  query?: string;
  sort?: "all" | "pending" | "negotiaton" | "accepted" | "rejected";
  filter?: string;
  limit?: string | number;
  page?: string | number;
}

export interface NewWorker {
  alamat: string;
  email: string;
  foto: string;
  id: number;
  job: { category: string; job_id: number; price: number }[];
  nama: string;
  nohp: number;
  role: RoleType;
  address: string;
  skill: string[];
  username: string;
}

export interface TransactionInfo {
  transaction_id: number;
  no_invoice: string;
  job_id: string;
  job_price: number;
  status: string;
  token: string;
  url: string;
}
