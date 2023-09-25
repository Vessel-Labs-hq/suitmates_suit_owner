import { z } from "zod";
import {
  createFileSchema,
  createStringSchema,
  createDefaultError,
  createSelectSchema,
} from "./helpers";

export const PersonalInfoSchema = z.object({
  firstName: createStringSchema("First name"),
  lastName: createStringSchema("Last name"),
  phoneNumber: createStringSchema("Phone number"),
  email: createStringSchema("Email").email("Invalid type provided for Email"),
  profileImage: createFileSchema({ key: "Profile Image" }),
});

export const SpaceInfoSchema = z.object({
  spaceName: createStringSchema("Name"),
  spaceAddress: createStringSchema("Address"),
  spaceSize: createStringSchema("Size"),
  spaceAmenities: createSelectSchema("Amenities"),
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

export const PaymentInfoSchema = z.object({
  cardNumber: createStringSchema("Card Number"),
  expiryDate: createStringSchema("Expiry Date"),
  cvv: createStringSchema("CVV"),
  nameOfCard: createStringSchema("Name"),
});
