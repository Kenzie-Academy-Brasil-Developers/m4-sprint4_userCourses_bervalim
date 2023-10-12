import { Request, Response } from "express";
import {
  tUserRead,
  tUserResponse,
  tUserReturnNoPassword,
} from "../interfaces/user.interface";
import {
  createUserService,
  readAllUserService,
} from "../services/user.service";

export const createUserController = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const user: tUserReturnNoPassword = await createUserService(req.body);
  return res.status(201).json(user);
};

export const readAllUserController = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const users: tUserRead = await readAllUserService();
  return res.status(200).json(users);
};
