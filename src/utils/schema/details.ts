import { z } from "zod";
import {
  createFileSchema,
  createStringSchema,
  createDefaultError,
  createSelectSchema,
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
  space_size: createStringSchema("Size")
    .refine(
      (v) => {
        let n = Number(v);
        /** https://zod.dev/?id=refine */
        return !isNaN(n);
      },
      { message: "Space size should be a number" }
    )
    .refine((v) => Number(v) > 0, { message: "Number should be greater than 0" }),
  space_amenities: z.array(createSelectSchema("Amenities"), {
    invalid_type_error: "Space amenities cannot be blank",
    required_error: "Space amenities is required",
  }),
});

export const SuiteDetailSchema = z.object({
  suiteNumber: createStringSchema("Number"),
  suiteSize: createStringSchema("Size"),
  suiteCost: createStringSchema("Cost"),
  suiteType: createSelectSchema("Type"),
  suiteDuration: createSelectSchema("Duration"),
});

export const SuiteInfoSchema = z.object(
  {
    suiteInfo: z.array(SuiteDetailSchema).min(1, "Suite Info is required"),
  },
  { ...createDefaultError("Suite Info") }
);

export const AccountInoSchema = z.object({
  accountNumber: createStringSchema("Account Number"),
  accountName: createStringSchema("Account Name"),
  routingNumber: createStringSchema("Routing Number"),
});
