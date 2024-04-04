import { z } from 'zod';
const passwordRegex = /^(?=.*[A-Z])(?=.*[!@#$%^&*]).{8,}$/;
export const passwordMessage =
  'Password must contain at least 8 characters, one uppercase letter, and one special character';
export const nameMessage = 'username must contain at least 3 chars';
export const emailMessage = 'must be a valid email';

export const UserSchema = z.object({
  name: z.string().min(3),
  email: z.string().email(),
  password: z
    .string()
    .min(8, passwordMessage)
    .regex(passwordRegex, passwordMessage),
});

export type userSchemaKeys = keyof z.infer<typeof UserSchema>;

export type loginSchemaType = typeof UserSchema;
