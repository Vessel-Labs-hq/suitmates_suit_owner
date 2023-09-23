import { z, type ZodType } from "zod";

export type InferSchema<T extends ZodType<any, any, any>> = z.infer<T>;


export const LoginSchema = z.object({
  email: z
  .string()
  .email({ message: "Invalid type provided for Email" })
  .min(1, { message: "Email is required" }),
  password: z.string().min(1, { message: "Password is required" }),
});

export type LoginType = z.infer<typeof LoginSchema>;
