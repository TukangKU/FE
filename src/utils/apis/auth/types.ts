import * as z from "zod";

export const loginSchema = z.object({
  email: z
    .string()
    .min(1, { message: "Email is required" })
    .email("Not a valid email"),
  password: z.string().min(1, { message: "Password is required" }),
});

export const registerSchema = z
  .object({
    role: z.enum(["client", "worker"], {
      required_error: "You need to select a role.",
    }),
    username: z.string().min(1, { message: "Username is required" }),
    email: z
      .string()
      .min(1, { message: "Email is required" })
      .email("Not a valid email"),
    password: z
      .string()
      .min(6, { message: "Password must be at least 6 characters" }),
    repassword: z
      .string()
      .min(6, { message: "Retype password must be at least 6 characters" }),
  })
  .refine((data) => data.password === data.repassword, {
    message: "Passwords don't match",
    path: ["repassword"],
  });

export type LoginType = z.infer<typeof loginSchema>;
export type RegisterType = z.infer<typeof registerSchema>;
