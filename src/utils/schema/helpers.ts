import { type ZodType, z } from "zod";

/**
 * 1kb = 1 * 1000 = 1000bytes
 * 1Mb = 1 * 1000kb
 */
const MAX_FILE_SIZE = 5_000_000;

const ACCEPTED_IMAGE_TYPES = ["image/jpeg", "image/jpg", "image/png", "image/webp"];

interface FileArgs {
  key: string;
  maxSize?: number;
  formats?: string[];
}

/**
 * https://github.com/colinhacks/zod/issues/387#issuecomment-1191390673
 *
 * This is modified to accept only single file vs all files
 */
export const createFileSchema = (args: FileArgs) => {
  const { key, formats = ACCEPTED_IMAGE_TYPES, maxSize = MAX_FILE_SIZE } = args;

  return z
    .any()
    .refine((file) => Boolean(file), `${key} is required`)
    .refine((file) => file?.size <= maxSize, `Max file size is 5MB`)
    .refine(
      (file) => formats.includes(file?.type),
      ".jpg, .jpeg, .png and .webp files are accepted"
    );
};

type TCreateString =
  | string
  | {
      key: string;
      min?: number;
      minMsg?: string;
    };

/**
 * If .optional() doesn't work add a min length of 0
 * it means that zod receives an input value for the string
 * hence making .optional() fail
 *
 * @example
 * ```tsx
 * const Schema = z.object({
 *   userName: createStringSchema("User name"),
 *   minUserName: createStringSchema("Min Username", 3), // would always say required if length less than 3
 *   minUserNameWithMsg: createStringSchema({
 *    key: "Min Username",
 *    min: 3,
 *    minMsg: "Min Length for username is three" // use this instead if length is greater than 1
 *   }),
 *   optionalName: createStringSchema("Optional Name", 0) // use 0 so that if empty string is passed, it validates
 * })
 * ```
 */
export const createStringSchema = (args: TCreateString, min = 1) => {
  const createDefaultErr = (key: string) => ({
    invalid_type_error: `Expected type for ${key} is string`,
    required_error: `${key} is required`,
  });

  if (typeof args === "string") {
    return z.string(createDefaultErr(args)).min(min, { message: `${args} cannot be blank` });
  }

  return z.string(createDefaultErr(args.key)).min(args.min ?? min, {
    message: args?.minMsg ?? `${args.key} cannot be blank`,
  });
};

export type InferSchema<T extends ZodType<any, any, any>> = z.infer<T>;

export const createDefaultError = (key: string) => ({
  required_error: `${key} cannot be blank`,
  invalid_type_error: `Invalid type provided for ${key}`,
});

export const createSelectSchema = (key: string) =>
  z.object(
    { label: createStringSchema("Label"), value: createStringSchema("Value") },
    { ...createDefaultError(key) }
  );

/**
 * used to assert values that should be number only but allow strings to be passed
 */
export const createInputNumberSchema = (key: string) =>
  createStringSchema(key)
    .refine(
      (v) => {
        let n = Number(v);
        /** https://zod.dev/?id=refine */
        return !isNaN(n);
      },
      { message: `${key} should be a number` }
    )
    .refine((v) => Number(v) > 0, { message: `${key} should be greater than 0` });
