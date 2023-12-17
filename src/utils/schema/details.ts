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
    email: createStringSchema("Email address"),
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
  // space_size: createInputNumberSchema("Size"),
  space_size_one: createInputNumberSchema("Space length"),
  space_size_two: createInputNumberSchema("Space breadth"),
  space_amenities: z
    .array(createStringSchema("Amenities"))
    .min(1, "Space Amenities cannot be empty"),
});

export const UpdateSpaceInfoSchema = SpaceInfoSchema.extend({
  space_size_one: z.optional(createInputNumberSchema("Size")),
  space_size_two: z.optional(createInputNumberSchema("Size")),
});

export const SuiteDetailSchema = z.object({
  suite_number: createStringSchema("Number"),
  suite_size_length: createStringSchema("Size"),
  suite_size_breadth: createStringSchema("Size"),
  suite_cost: createInputNumberSchema("Cost"),
  suite_type: createStringSchema("Type"),
  timing: createStringSchema("Duration"),
});

export const EditSuiteDetailSchema = SuiteDetailSchema.extend({
  id: createStringSchema("Suite Id"),
});

export const SuiteInfoSchema = z.object(
  {
    suites: z.array(SuiteDetailSchema).min(1, "Suite Info is required"),
  },
  { ...createDefaultError("Suite Info") }
);

export const EditSuiteInfoSchema = z.object(
  {
    suites: z.array(EditSuiteDetailSchema).min(1, "Suite Info is required"),
  },
  { ...createDefaultError("Suite Info") }
);

export const AccountInoSchema = z.object({
  account_number: createStringSchema("Account Number"),
  account_name: createStringSchema("Account Name"),
  routing_number: createStringSchema("Routing Number"),
});
