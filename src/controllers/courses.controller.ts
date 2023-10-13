import { NextFunction, Request, Response } from "express";
import { createCourseService } from "../services/courses.service";

export const createCourseController = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const newCourse = await createCourseService(req.body);
  return res.status(201).json(newCourse);
};
