import format from "pg-format";
import {
  tCoursesRead,
  tCoursesRequest,
  tCoursesResponse,
  tCoursesResult,
  tUserCourseRequest,
} from "../interfaces/courses.interface";
import { client } from "../database";

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
