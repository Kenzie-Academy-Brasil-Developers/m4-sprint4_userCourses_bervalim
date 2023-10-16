import { Request, Response } from "express";
import { tUserRead, tUserReturnNoPassword } from "../interfaces/user.interface";
import {
  createUserService,
  readAllUserCoursesService,
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

export const readAllUserCoursesController = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const courses = await readAllUserCoursesService(req.params.userId);
  return res.status(200).json(courses);
};
