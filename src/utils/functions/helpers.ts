import clsx, { type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

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

    return pathname === url;
  };

  return isActiveFn;
};
