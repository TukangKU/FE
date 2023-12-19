import * as z from "zod";

const MAX_FILE_SIZE = 500000000;
const ACCEPTED_IMAGE_TYPE = ["image/jpeg", "image/jpg", "image/png"];

export const clientProfileUpdateSchema = z.object({
  username: z.string().min(1, { message: "Fullname is required" }),
  full_name: z.string().min(1, { message: "Fullname is required" }),
  email: z
    .string()
    .min(1, { message: "Email is required" })
    .email("Not valid email"),
  password: z
    .string()
    .min(6, { message: "Password must be at least 6 characters" }),
  skills: z.string().min(1),
  phone_number: z.string().min(1, { message: "Phone number is required" }),
  address: z.string().min(1, { message: "Address is required" }),
  profile_picture: z
    .any()
    .refine(
      (files) => files?.[0]?.size <= MAX_FILE_SIZE,
      "Max image size is 5MB"
    )
    .refine(
      (files) => ACCEPTED_IMAGE_TYPE.includes(files?.[0]?.type),
      "Only .jpg, .jpeg, and .png formats are supported"
    ),
});

export type ClientUpdateType = z.infer<typeof clientProfileUpdateSchema>;

export interface Response {
  message: string;
  data: any
}

export interface Client {
  user_id: number;
  username: string;
  name: string;
  email: string;
  phone: string;
  address: string;
  image: string;
}

export interface UpdateClient {
  id: number;
  username: string;
  name: string;
  email: string;
  phone: string;
  image: string;
  address: string;
}

export interface JobOrder {
  workername: string;
  start_date: string;
  end_date: string;
  price: number;
  deskripsi: string;
}
export type RoleType = "client" | "worker";

export interface ProfileType {
  id: number;
  username: string;
  name: string;
  email: string;
  role: RoleType;
  image: string;
  phone: string;
  address: string;
}
