import { NextFunction, Request, Response } from "express";
import AppError from "../errors/App.error";
import { verify } from "jsonwebtoken";

export const verifyToken = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const authorization = req.headers.authorization;
  console.log(authorization);
  if (!authorization) {
    throw new AppError("Missing bearer token", 401);
  }
  const token: string = authorization.split(" ")[1];
  const decodeToken = verify(token, process.env.SECRET_KEY!);
  res.locals = { ...res.locals, decodeToken };
  return next();
};
