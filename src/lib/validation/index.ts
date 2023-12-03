import * as z from "zod";

/* The code is defining a validation schema for a signup form. It uses the `zod` library to create a
schema object called `SignupValidation`. */
export const SignupValidation = z.object({
    name: z.string().min(5, {message: "The name should atleast be 5 characters"}),
    username: z.string().min(5, {message: "The username should atleast be 5 characters"}),
    email: z.string().email(),
    password: z.string().min(8, {message: "The password should atleast be 8 characters"})
  });

  export const SigninValidation = z.object({
    email: z.string().email(),
    password: z.string().min(8, {message: "The password should atleast be 8 characters"})
  });