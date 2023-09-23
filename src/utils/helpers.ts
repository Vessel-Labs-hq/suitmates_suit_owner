import clsx, { type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

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

export const formatWord = (camelCase: string) =>
  camelCase
    .replace(/\s/g, "")
    .replace(/-/g, " ")
    .replace(/([A-Z])/g, (match) => ` ${match}`)
    .replace(/([_])/g, (match) => ` `)
    .trim()
    .split(" ")
    .map((word) => word[0].toUpperCase() + word.slice(1))
    .join(" ");
