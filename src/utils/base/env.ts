import { z } from "zod";

/**
 *
 * https://catalins.tech/validate-environment-variables-with-zod/
 */
const clientSideENVSchema = z.object({
  NEXT_PUBLIC_API_URL: z.string().nonempty(),
  NEXT_PUBLIC_AUTH_KEY: z.string().nonempty(),
});

type TClientSideEnv = z.infer<typeof clientSideENVSchema>;

const clientSideEnv = clientSideENVSchema.parse({
  NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL,
  NEXT_PUBLIC_AUTH_KEY: process.env.NEXT_PUBLIC_AUTH_KEY,
});

type ClientENV = {
  [Key in keyof TClientSideEnv as Key extends `NEXT_PUBLIC_${infer U}`
    ? U
    : Key]: TClientSideEnv[Key];
};

export const clientENV: ClientENV = Object.fromEntries(
  Object.entries(clientSideEnv).map(([key, value]) => [
    key.replace("NEXT_PUBLIC_", ""),
    value,
  ])
) as ClientENV;
