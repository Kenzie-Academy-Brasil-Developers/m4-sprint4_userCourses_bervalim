import format from "pg-format";
import {
  tSessionRequestBody,
  tSessionResponse,
} from "../interfaces/session.interface";
import { client } from "../database";
import { tUserResponse, tUserResult } from "../interfaces/user.interface";
import AppError from "../errors/App.error";
import { compare } from "bcryptjs";
import { sign } from "jsonwebtoken";

export const loginService = async (
  bodyRequest: tSessionRequestBody
): Promise<tSessionResponse> => {
  const query: string = format(
    `SELECT * FROM "users" WHERE "email" = (%L);`,
    bodyRequest.email
  );

  const data: tUserResult = await client.query(query);

  if (data.rowCount === 0) {
    throw new AppError("Wrong email/password", 401);
  }

  const user: tUserResponse = data.rows[0];

  const verifyPassword: boolean = await compare(
    bodyRequest.password,
    user.password
  );

  if (!verifyPassword) {
    throw new AppError("Wrong email/password", 401);
  }

  const token: string = sign(
    { email: user.email, admin: user.admin },
    process.env.SECRET_KEY!,
    { subject: user.id.toString(), expiresIn: process.env.EXPIRES_IN }
  );

  return { token };
};
