import { z } from "zod";

export const courseResponseSchema = z.object({
  id: z.number().positive(),
  name: z.string().max(15),
  description: z.string(),
});

export const courseRequestSchema = courseResponseSchema.omit({
  id: true,
});

export const courseReadSchema = courseResponseSchema.array();
