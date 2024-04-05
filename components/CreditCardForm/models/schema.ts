import { z } from 'zod';
const expDateRegex = /^(0[1-9]|1[0-2])\/([0-9]{2})$/;
export const cardNumberMessage = 'credit card number must be 16 numbers long';
export const expDateMessage = 'must be a valid date (MM/YY)';

export const CardSchema = z.object({
  cardNumber: z.string().length(16, cardNumberMessage),
  expDate: z.string().regex(expDateRegex, expDateMessage),
});

export type cardSchemaKeys = keyof z.infer<typeof CardSchema>;
