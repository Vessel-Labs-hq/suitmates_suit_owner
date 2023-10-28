import clsx, { type ClassValue } from "clsx";
import type { FieldValues, FormState } from "react-hook-form";
import { twMerge } from "tailwind-merge";

const isLocal =
  typeof window === "undefined" ? true : !!window.origin.includes("localhost");

export type ClassValues = ClassValue[];

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

interface ArrayFromNum<T> {
  length: number;
  startAtIndex?: boolean;
  fill?: T;
}
export const arrayFromNumber = <T = number>(args: ArrayFromNum<T>): T[] => {
  const { length, fill, startAtIndex } = args;

  const arr = Array.from({ length }, (_, idx) => {
    if (fill) return fill;

    return startAtIndex ? idx : idx + 1;
  });

  return arr as T[];
};

export const formatWord = (text: string) =>
  text
    .replace(/\s/g, "") // remove whitespace
    .replace(/-/g, " ") // convert hyphens to whitespace
    .replace(/([A-Z])/g, (match) => ` ${match}`) // replace uppercase with space and word
    .replace(/([_])/g, (_match) => ` `) // replace underscore with space
    .trim() // trim out excess whitespace
    .split(" ") // split words by space
    .map((word) => {
      if (word === "") return; // if word is empty string return
      if (word.length < 1) return word;
      return word[0].toUpperCase() + word.slice(1);
    })
    .filter(Boolean) // remove white space from inputs
    .join(" ");

export function camelCaseToSnakeCase(camelCase: string) {
  return camelCase.replace(/([A-Z])/g, "_$1").toLowerCase();
}

export const capitalizeFirstLetter = (str: string) => {
  const s0 = str[0].toUpperCase();

  const rest = str.slice(1);

  return s0 + rest;
};

export const checkIfNavLinkIsActive = (pathname: string) => {
  const isActiveFn = (url: string) => {
    if (url === "dashboard" && pathname === "/") {
      return true;
    }

    return pathname.includes(url);
  };

  return isActiveFn;
};

export const localLog = (...args: any[]) => {
  if (isLocal) {
    console.log(...args);
  }
};

/**
 * @example```tsx
 * const { unwrapFormErrors, assertFormError } = getFormStateError(formState)
 * const xyzError = unWrapErrors("xyz")
 * ```
 */
export const getFormStateError = <Inputs extends FieldValues>(
  formState: FormState<Inputs>
) => {
  const unwrapFormError = (key: keyof Inputs) => {
    const err = formState.errors[key]?.message;
    return err ? String(err) : undefined;
  };

  const assertFormError = (key: keyof Inputs): boolean => {
    return Boolean(formState.errors[key]?.message);
  };

  return { unwrapFormError, assertFormError };
};

export const assertQuery = (str: unknown): str is string => str !== undefined;

export const clampText = (str: string, maxLen = 23) => {
  if (str.length > maxLen) {
    return str.slice(0, maxLen - 3) + "...";
  }

  return str;
};

/**
 * pass generic to assert type
 */
export const parseDbSelectRecords = <Type = SelectData[]>(data: string) => {
  try {
    const res = JSON.parse(data) as Type;
    return res;
  } catch (error) {
    localLog(error);

    throw new Error("An error occurred while parsing the value");
  }
};

export const assertReactQueryError = (error: unknown) => {
  if (typeof error === "string") {
    return error;
  }

  if (typeof error === "object") {
    return JSON.stringify(error);
  }

  return String(error);
};
