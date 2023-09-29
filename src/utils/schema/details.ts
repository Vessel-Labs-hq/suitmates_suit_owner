import { z } from "zod";
import {
  createFileSchema,
  createStringSchema,
  createDefaultError,
  createSelectSchema,
} from "./helpers";

/** 
 * interface PersonalInfoPayload {
  email: string;
  first_name?: string;
  last_name?: string;
  phone_number?: string;
  bio?: string;
  onboarded?: boolean;
  avatar?: string;
  password?: string;
}

 */

export const PersonalInfoSchema = z.object({
  first_name: createStringSchema("First name"),
  last_name: createStringSchema("Last name"),
  phone_number: createStringSchema("Phone number"),
  email: createStringSchema("Email").email("Invalid type provided for Email"),
  avatar: createFileSchema({ key: "Profile Image" }),
});

export const SpaceInfoSchema = z.object({
  space_name: createStringSchema("Name"),
  space_address: createStringSchema("Address"),
  space_size: createStringSchema("Size"),
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
