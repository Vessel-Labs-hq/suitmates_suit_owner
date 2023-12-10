import z from "zod";
import { createSelectSchema, createStringSchema } from "./helpers";

export const InviteTenantSchema = z.object({
  email: createStringSchema("Email").email("Please provide a valid email"),
});

export const AttachTenantSchema = z.object({
  email: createStringSchema("Email").email("Please provide a valid email"),
  suite_id: createSelectSchema("Suite"),
});
