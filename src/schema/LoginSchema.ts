import { z } from "zod";

export const LoginSchema = z.object({
  email: z.string().email({ message: "Please enter your email address" }),
  password: z.string().min(8, { message: "Please enter your password" }),
});

export type LoginSchemaType = z.infer<typeof LoginSchema>;
