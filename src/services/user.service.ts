import { hash } from "bcryptjs";
import {
  tUserCreateRequest,
  tUserRead,
  tUserResult,
  tUserReturnNoPassword,
} from "../interfaces/user.interface";
import format from "pg-format";
import { client } from "../database";
import { userReadSchema, userReturnSchema } from "../schemas/user.schema";
import AppError from "../errors/App.error";

export const createUserService = async (
  bodyRequest: tUserCreateRequest
): Promise<tUserReturnNoPassword> => {
  bodyRequest.password = await hash(bodyRequest.password, 12);

  const query: string = format(
    'INSERT INTO "users" (%I) VALUES (%L) RETURNING *;',
    Object.keys(bodyRequest),
    Object.values(bodyRequest)
  );

  const data: tUserResult = await client.query(query);

  return userReturnSchema.parse(data.rows[0]);
};

export const readAllUserService = async (): Promise<tUserRead> => {
  const query: string = 'SELECT * FROM "users";';
  const data: tUserResult = await client.query(query);
  return userReadSchema.parse(data.rows);
};

export const readAllUserCoursesService = async (userId: string) => {
  const query: string = format(
    `
    SELECT 
      "u"."id" "userId",
      "u" "userName",
      "c"."id" "courseId",
      "c"."name" "courseName",
      "c"."description" "courseDescription",
      "uc"."active" "userActiveInCourse"
    FROM "courses" "c"
    JOIN "userCourses" "uc"
      ON "c"."id" = "uc"."courseId"
    JOIN "users" "u"
      ON "u"."id" = "uc"."userId"
    WHERE "u"."id" = (%L);
  `,
    userId
  );

  const data: tUserResult = await client.query(query);

  if (data.rowCount === 0) {
    throw new AppError("No course found", 404);
  }

  return data.rows;
};
