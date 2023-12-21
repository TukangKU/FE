import * as z from "zod";

export const loginSchema = z.object({
  email: z
    .string()
    .min(1, { message: "email wajib diisi" })
    .email("Bukan email yang valid"),
  password: z.string().min(1, { message: "Password wajib diisi" }),
});

export const registerSchema = z
  .object({
    role: z.enum(["client", "worker"], {
      required_error: "Anda harus memilih peran",
    }),
    username: z.string().min(1, { message: "Username wajib diisi" }),
    email: z
      .string()
      .min(1, { message: "Email wajib diisi" })
      .email("Bukan email yang valid"),
    password: z
      .string()
      .min(6, { message: "Password minimal harus 6 karakter" }),
    repassword: z
      .string()
      .min(6, { message: "Ketik ulang password minimal harus 6 karakter" }),
  })
  .refine((data) => data.password === data.repassword, {
    message: "Password tidak cocok",
    path: ["repassword"],
  });

export type LoginType = z.infer<typeof loginSchema>;
export type RegisterType = z.infer<typeof registerSchema>;
