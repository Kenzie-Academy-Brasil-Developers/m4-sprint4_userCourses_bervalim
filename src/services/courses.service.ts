import format from "pg-format";
import {
  tCoursesRead,
  tCoursesRequest,
  tCoursesResponse,
  tCoursesResult,
  tUserCourseRequest,
  tUserCourseResult,
} from "../interfaces/courses.interface";
import { client } from "../database";
import AppError from "../errors/App.error";

export const createCourseService = async (
  bodyRequest: tCoursesRequest
): Promise<tCoursesResponse> => {
  const query = format(
    `INSERT INTO "courses" (%I) VALUES (%L) RETURNING *;`,
    Object.keys(bodyRequest),
    Object.values(bodyRequest)
  );

  const data: tCoursesResult = await client.query(query);
  return data.rows[0];
};

export const readAllCoursesService = async (): Promise<tCoursesRead> => {
  const query = `SELECT * FROM "courses";`;
  const data: tCoursesResult = await client.query(query);
  return data.rows;
};

export const enrollUserInACourseService = async (
  bodyRequest: tUserCourseRequest
): Promise<void> => {
  const query: string = format(
    `INSERT INTO "userCourses" (%I)
    VALUES (%L)
    RETURNING *;
    `,
    Object.keys(bodyRequest),
    Object.values(bodyRequest)
  );

  await client.query(query);
};

export const deactivateUserCourseRegistrationService = async (
  userId: number,
  courseId: number
) => {
  const query: string = `UPDATE "userCourses" SET "active"=false WHERE "userId" = $1 AND "courseId" =$2;`;
  await client.query(query, [userId, courseId]);
};

export const readAllUserCoursesService = async (courseId: string) => {
  const query: string = format(
    `
    SELECT 
      "u"."id" "userId",
      "u"."name" "userName",
      "c"."id" "courseId",
      "c"."name" "courseName",
      "c"."description" "courseDescription",
      "uc"."active" "userActiveInCourse"
    FROM "users" "u"
    JOIN "userCourses" "uc"
      ON "u"."id" = "uc"."userId"
    JOIN "courses" "c"
      ON "c"."id" = "uc"."courseId"
    WHERE "c"."id" = (%L)
    ;`,
    courseId
  );

  const data: tUserCourseResult = await client.query(query);

  if (data.rowCount === 0) {
    throw new AppError("User/course not found");
  }
  return data.rows;
};
