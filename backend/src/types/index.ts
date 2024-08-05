import { z } from "zod";

export const signupInput = z.object({
  username: z.string().email(),
  password: z.string().min(6),
  name: z.string().optional(),
});

export type SignupSchema = z.infer<typeof signupInput>;

const signinInput = z.object({
  username: z.string().email(),
  password: z.string().min(6),
  name: z.string().optional(),
});

export type SigninSchema = z.infer<typeof signinInput>;
