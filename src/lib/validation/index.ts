import * as z from "zod";

/**
 * Validation schema for user signup. It enforces constraints on the input values
 * for name, username, email, and password.
 */
export const SignupValidation = z.object({
  name: z
    .string()
    .min(5, { message: "The name should be at least 5 characters" }),
  username: z
    .string()
    .min(5, { message: "The username should be at least 5 characters" }),
  email: z.string().email(),
  password: z
    .string()
    .min(8, { message: "The password should be at least 8 characters" }),
});

/**
 * Validation schema for user signin. It enforces constraints on the input values
 * for email and password.
 */
export const SigninValidation = z.object({
  email: z.string().email(),
  password: z
    .string()
    .min(8, { message: "The password should be at least 8 characters" }),
});
