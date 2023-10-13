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

export const userCourseResponseSchema = z.object({
  id: z.number().positive(),
  active: z.boolean().default(true),
  userId: z.number().positive(),
  courseId: z.number().positive(),
});

export const userCourseRequestSchema = userCourseResponseSchema.omit({
  id: true,
});
