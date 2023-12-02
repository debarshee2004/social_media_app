import * as z from "zod";

export const SignupValidation = z.object({
    name: z.string().min(5, {message: "The name should atleast be 5 characters"}),
    username: z.string().min(5, {message: "The username should atleast be 5 characters"}),
    email: z.string().email(),
    password: z.string().min(8, {message: "The password should atleast be 8 characters"})
  });