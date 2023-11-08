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

export const EditPersonalInfoSchema = z
  .object({
    first_name: createStringSchema("First name"),
    last_name: createStringSchema("Last name"),
    phone_number: createStringSchema("Phone number"),
    // email: createStringSchema("Email address"),
    bio: createStringSchema("Bio"),
    avatar: z.union([z.string(), createFileSchema({ key: "Profile Image" })]),
  })
  .deepPartial();

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

export const UpdateSpaceInfoSchema = SpaceInfoSchema.extend({
  space_size: z.optional(z.any()),
});

export const SuiteDetailSchema = z.object({
  suite_number: createStringSchema("Number"),
  suite_size: createStringSchema("Size"),
  suite_cost: createInputNumberSchema("Cost"),
  suite_type: createSelectSchema("Type"),
  timing: createSelectSchema("Duration"),
});

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
