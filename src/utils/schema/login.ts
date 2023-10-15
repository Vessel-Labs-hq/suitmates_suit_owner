import { z, type ZodType } from "zod";

export type InferSchema<T extends ZodType<any, any, any>> = z.infer<T>;

export const LoginSchema = z.object({
  email: z
    .string()
    .min(1, { message: "Email is required" })
    .email({ message: "Please enter a valid Email" }),
  password: z.string().min(1, { message: "Password is required" }),
});

export type LoginType = z.infer<typeof LoginSchema>;

/** 
 * name: z.string(),
  avatar: z.string(),
 */
export const AuthResponseSchema = z.object({
  role: z.union([z.literal("owner"), z.literal("tenant")]),
  email: z.string(),
  id: z.number(),
  onboarded: z.boolean(),
  verified: z.boolean(),
  accessToken: z.string(),
  name: z.optional(z.string()),
  avatar: z.optional(z.string()),
});

/**
 *
 * Update AuthResponseSchema to add new properties
 */
export type AuthResponse = z.infer<typeof AuthResponseSchema>;
