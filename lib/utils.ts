import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const formatTimestamp = (
  timestamp: number,
  includeTime: boolean = true
): string => {
  // We use Math.floor to handle the decimal points (.978)
  // ensuring the Date object receives a clean integer.
  const date = new Date(Math.floor(timestamp));

  // If the timestamp is invalid, return a fallback
  if (isNaN(date.getTime())) {
    return "Invalid Date";
  }

  return new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
    // Conditionally include time based on the boolean argument
    ...(includeTime && {
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    }),
  }).format(date);
};
