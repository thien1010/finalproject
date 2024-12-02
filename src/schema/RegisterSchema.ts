import { z } from "zod";
const dateOfBirthPattern = /^\d{4}-(0[1-9]|1[012])-(0[1-9]|[12]\d|3[01])$/; // YYYY-MM-DD pattern

const dateOfBirthSchema = z.string().regex(dateOfBirthPattern, {
  message: "Invalid date format. Please enter DD-MM-YYYY.",
});
export const RegisterSchema = z.object({
  fullName: z.string().min(5, { message: "Please enter your fullname" }),
  email: z.string().email({ message: "Invalid email format" }),
  password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters" }),
  dateOfBirth: dateOfBirthSchema.optional(),
});

export type RegisterSchemaType = z.infer<typeof RegisterSchema>;
