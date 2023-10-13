import { z } from "zod";
import {
  courseReadSchema,
  courseRequestSchema,
  courseResponseSchema,
  userCourseRequestSchema,
  userCourseResponseSchema,
} from "../schemas/courses.schema";
import { QueryResult } from "pg";

export type tCoursesResponse = z.infer<typeof courseResponseSchema>;
export type tCoursesRequest = z.infer<typeof courseRequestSchema>;
export type tCoursesRead = z.infer<typeof courseReadSchema>;
export type tCoursesResult = QueryResult<tCoursesResponse>;
export type tUserCourseResponse = z.infer<typeof userCourseResponseSchema>;
export type tUserCourseRequest = z.infer<typeof userCourseRequestSchema>;
export type tUserCourseResult = QueryResult<tUserCourseResponse>;
