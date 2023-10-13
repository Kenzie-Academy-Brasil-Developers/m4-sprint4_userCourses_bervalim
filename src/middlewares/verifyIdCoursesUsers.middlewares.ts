import { NextFunction, Request, Response } from "express";
import format from "pg-format";
import { client } from "../database";
import AppError from "../errors/App.error";

export const verifyIdCoursesUsers = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const { courseId } = req.params;
  const { userId } = req.params;

  const queryCourse: string = format(
    `SELECT * FROM "courses" WHERE id = (%L);`,
    courseId
  );

  const dataCourse = await client.query(queryCourse);

  if (dataCourse.rowCount === 0) {
    throw new AppError("User/course not found", 404);
  }

  const queryUser: string = format(
    `SELECT * FROM "users" WHERE id = (%L);`,
    userId
  );

  const dataUser = await client.query(queryUser);

  if (dataUser.rowCount === 0) {
    throw new AppError("User/course not found", 404);
  }

  return next();
};
