import { Request, Response } from "express";
import { tSessionResponse } from "../interfaces/session.interface";
import { loginService } from "../services/session.service";

export const loginController = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const userToken: tSessionResponse = await loginService(req.body);
  return res.status(200).json(userToken);
};
