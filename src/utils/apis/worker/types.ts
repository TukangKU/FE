import * as z from "zod";

const MAX_FILE_SIZE = 500000000;
const ACCEPTED_IMAGE_TYPE = ["image/jpeg", "image/jpg", "image/png"];

export const workerProfileUpdateSchema = z.object({
  user_id: z.number(),
  username: z.string().min(1, { message: "Fullname is required" }),
  name: z.string().min(1, { message: "Fullname is required" }),
  email: z
    .string()
    .min(1, { message: "Email is required" })
    .email("Not valid email"),
  // password: z
  //   .string()
  //   .min(6, { message: "Password must be at least 6 characters" }),
  skills: z.any().array(),
  phone: z.string().min(1, { message: "Phone number is required" }),
  address: z.string().min(1, { message: "Address is required" }),
  image: z
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

export type WorkerUpdateType = z.infer<typeof workerProfileUpdateSchema>;

export interface Response {
  message: string;
  data: any;
}

export interface Worker {
  user_id: number;
  username: string;
  name: string;
  email: string;
  // passowrd: string;
  phone: string;
  address: string;
  skills: Skills[];
  image: string;
}

export interface Skills {
  skill_id: number;
  skill_name: string;
}

export interface JobWorker {
  workername: string;
  start_date: string;
  end_date: string;
  price: number;
  deskripsi: string;
}
