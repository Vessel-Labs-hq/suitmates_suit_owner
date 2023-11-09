import z from "zod";
import { createSelectSchema, createStringSchema } from "./helpers";

export const AddTenantByInviteSchema = z.object({
  email: createStringSchema("Email").email("Please provide a valid email"),
  suite_id: createSelectSchema("Suite"),
});
