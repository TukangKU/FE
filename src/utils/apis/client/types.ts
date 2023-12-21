import * as z from "zod";

// const MAX_FILE_SIZE = 500000;
// const ACCEPTED_IMAGE_TYPES = ["image/jpeg", "image/jpg", "image/png"];

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
    // .refine(
    //   (files) => files?.[0]?.size <= MAX_FILE_SIZE,
    //   `Max image size is 5MB.`
    // )
    // .refine(
    //   (files) => {
    //     ACCEPTED_IMAGE_TYPES.includes(files?.[0]?.type)
    //     console.log("files", files.split('.')[1])
    //   },
    //   "Only .jpg, .jpeg, and .png formats are supported."
    // )
    .optional(),
});


export type ClientUpdateType = z.infer<typeof clientProfileUpdateSchema>;

export interface JobOrder {
  workername: string;
  start_date: string;
  end_date: string;
  price: number;
  deskripsi: string;
}
