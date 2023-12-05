import { z } from "zod";
import { createSelectSchema, createStringSchema } from "./helpers";

export const UpdateMaintenanceRequestSchema = z.object({
  repair_date: z.coerce.date({
    required_error: "Repair date is needed",
    invalid_type_error: "Please provide a valid type for date",
  }),
  repair_time: createStringSchema("Repair time"),
  status: createStringSchema("Status"),
});
