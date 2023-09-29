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

export const AuthResponseSchema = z.object({
  role: z.string(),
  email: z.string(),
  id: z.number(),
  onboarded: z.boolean(),
  verified: z.boolean(),
  accessToken: z.string(),
});

/**
 *
 * Update AuthResponseSchema to add new properties
 */
export type AuthResponse = z.infer<typeof AuthResponseSchema>;
