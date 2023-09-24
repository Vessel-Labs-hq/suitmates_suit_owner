import { z } from "zod";
import { createFileSchema, createStringSchema } from "./helpers";

export const PersonalInfoSchema = z.object({
  firstName: createStringSchema("First name"),
  lastName: createStringSchema("Last name"),
  phoneNumber: createStringSchema("Phone number"),
  email: createStringSchema("Email").email("Invalid type provided for Email"),
  bio: createStringSchema("Bio"),
  profileImage: createFileSchema({ key: "Profile Image" }),
});

export const BusinessInfoSchema = z.object({
  businessName: createStringSchema("Business Name"),
  openHours: createStringSchema("Open Hour(s)"),
  closeHours: createStringSchema("Closing Hour(s)"),
  workingDays: createStringSchema("Working day(s)"),
  occupation: createStringSchema("Occupation", 0).optional(),
  website: createStringSchema("Website", 0).optional(),
  license: createFileSchema({ key: "License" }).optional(),
});

export const PaymentInfoSchema = z.object({
  cardNumber: createStringSchema("Card Number"),
  expiryDate: createStringSchema("Expiry Date"),
  cvv: createStringSchema("CVV"),
  nameOfCard: createStringSchema("Name"),
});
