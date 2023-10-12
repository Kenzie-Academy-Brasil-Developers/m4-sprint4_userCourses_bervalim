import { z } from "zod";

export const userResponseSchema = z.object({
  id: z.number().positive(),
  name: z.string().max(50).min(3),
  email: z.string().email().max(50).min(3),
  password: z.string().nonempty().max(255),
  admin: z.boolean().default(false),
});

export const userCreateRequestSchema = userResponseSchema.omit({ id: true });
export const userUpdateSchema = userCreateRequestSchema.partial();
export const userReturnSchema = userResponseSchema.omit({ password: true });
export const userReadSchema = userReturnSchema.array();
