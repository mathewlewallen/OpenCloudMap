import { z } from "zod";

export const passkeyEmailSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
  firstName: z.string().min(2, "First name must be at least 2 characters").max(255),
  lastName: z.string().min(2, "Last name must be at least 2 characters").max(255),
});

export type PasskeyEmailSchema = z.infer<typeof passkeyEmailSchema>;
