import { z } from "zod";
import {
  courseReadSchema,
  courseRequestSchema,
  courseResponseSchema,
} from "../schemas/courses.schema";
import { QueryResult } from "pg";

export type tCoursesResponse = z.infer<typeof courseResponseSchema>;
export type tCoursesRequest = z.infer<typeof courseRequestSchema>;
export type tCoursesRead = z.infer<typeof courseReadSchema>;
export type tCoursesResult = QueryResult<tCoursesResponse>;
