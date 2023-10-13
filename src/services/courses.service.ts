import format from "pg-format";
import {
  tCoursesRequest,
  tCoursesResponse,
  tCoursesResult,
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
