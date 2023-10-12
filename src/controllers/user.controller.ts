import { Request, Response } from "express";
import {
  tUserResponse,
  tUserReturnNoPassword,
} from "../interfaces/user.interface";
import { createUserService } from "../services/user.service";

export const createUserController = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const user: tUserReturnNoPassword = await createUserService(req.body);
  return res.status(201).json(user);
};
