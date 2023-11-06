import { z } from "zod";
import { createSelectSchema, createStringSchema } from "./helpers";

export const UpdateMaintenanceRequestSchema = z.object({
  repair_date: createStringSchema("Repair date"),
  repair_time: createSelectSchema("Repair time"),
  status: createSelectSchema("Status"),
});
