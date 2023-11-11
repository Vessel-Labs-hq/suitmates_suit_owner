import z from "zod";
import { createStringSchema } from "./helpers";

export const InviteTenantSchema = z.object({
  email: createStringSchema("Email").email("Please provide a valid email"),
});
