import { z } from "zod";
import {
  createFileSchema,
  createStringSchema,
  createDefaultError,
  createSelectSchema,
  createInputNumberSchema,
} from "./helpers";

export const PersonalInfoSchema = z.object({
  first_name: createStringSchema("First name"),
  last_name: createStringSchema("Last name"),
  phone_number: createStringSchema("Phone number"),
  // email: createStringSchema("Email").email("Invalid type provided for Email"),
  avatar: createFileSchema({ key: "Profile Image" }),
  bio: z.optional(createStringSchema({ key: "Bio" })),
});

export const SpaceInfoSchema = z.object({
  space_name: createStringSchema("Name"),
  space_address: createStringSchema("Address"),
  /**
   * https://github.com/colinhacks/zod/discussions/330#discussioncomment-7097769
   */
  space_size: createInputNumberSchema("Size"),
  space_amenities: z.array(createSelectSchema("Amenities"), {
    invalid_type_error: "Space amenities cannot be blank",
    required_error: "Space amenities is required",
  }),
});

export const SuiteDetailSchema = z.object({
  suite_number: createStringSchema("Number"),
  suite_size: createStringSchema("Size"),
  suite_cost: createInputNumberSchema("Cost"),
  suite_type: createSelectSchema("Type"),
  timing: createSelectSchema("Duration"),
});

/** 
 * {
    "suites": [
        {
            "suite_number": "HN923",
            "suite_type": "type",
            "suite_size": "234234ft",
            "suite_cost": 200000,
            "timing": "weekly"
        },
        {
            "suite_number": "23",
            "suite_type": "large room",
            "suite_size": "234ft",
            "suite_cost": 2230,
            "timing": "weekly"
        }
    ]
}
 */
export const SuiteInfoSchema = z.object(
  {
    suites: z.array(SuiteDetailSchema).min(1, "Suite Info is required"),
  },
  { ...createDefaultError("Suite Info") }
);

export const AccountInoSchema = z.object({
  account_number: createStringSchema("Account Number"),
  account_name: createStringSchema("Account Name"),
  routing_number: createStringSchema("Routing Number"),
});
