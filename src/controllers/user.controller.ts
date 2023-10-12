import { Request, Response } from "express";
import { tUserResponse } from "../interfaces/user.interface";
import { createUserService } from "../services/user.service";

export const createUserController = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const user: tUserResponse = await createUserService(req.body);
  return res.status(201).json(user);
};
