import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Combines multiple class values using the `clsx` and `twMerge` utility functions,
 * allowing for conditional and dynamic class generation.
 *
 * @function
 * @param {...ClassValue} inputs - Class values to be merged.
 * @returns {string} - Returns a string representing the combined class values.
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
