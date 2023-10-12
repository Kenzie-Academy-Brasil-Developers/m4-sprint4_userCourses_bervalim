import { z } from "zod";
import {
  userCreateRequestSchema,
  userReadSchema,
  userResponseSchema,
  userReturnSchema,
  userUpdateSchema,
} from "../schemas/user.schema";
import { QueryResult } from "pg";

export type tUserResponse = z.infer<typeof userResponseSchema>;
export type tUserCreateRequest = z.infer<typeof userCreateRequestSchema>;
export type tUserUpdate = z.infer<typeof userUpdateSchema>;
export type tUserResult = QueryResult<tUserResponse>;
export type tUserReturnNoPassword = z.infer<typeof userReturnSchema>;
export type tUserRead = z.infer<typeof userReadSchema>;
