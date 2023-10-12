import { NextFunction, Request, Response } from "express";
import { tUserResult } from "../interfaces/user.interface";
import format from "pg-format";
import { client } from "../database";
import AppError from "../errors/App.error";

export const verifyEmailExists = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const { email } = req.body;

  if (!email) {
    return next();
  }

  const query: string = format(
    `SELECT * FROM "users"  WHERE "email" =(%L);`,
    email
  );
  const data: tUserResult = await client.query(query);

  if (data.rowCount > 0) {
    throw new AppError("Email already registered", 409);
  }

  return next();
};
