import { Request, Response } from "express";
import {
  createCourseService,
  deactivateUserCourseRegistrationService,
  enrollUserInACourseService,
  readAllCoursesService,
} from "../services/courses.service";
import { tUserCourseRequest } from "../interfaces/courses.interface";
import { tUserCreateRequest } from "../interfaces/user.interface";

export const createCourseController = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const newCourse = await createCourseService(req.body);
  return res.status(201).json(newCourse);
};

export const readAllCoursesController = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const courses = await readAllCoursesService();
  return res.status(200).json(courses);
};

export const enrollUserInACourseController = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const bodyRequest: tUserCourseRequest = {
    active: true,
    userId: Number(req.params.userId),
    courseId: Number(req.params.courseId),
  };
  await enrollUserInACourseService(bodyRequest);
  return res
    .status(201)
    .json({ message: "User successfully vinculed to course" });
};

export const deactivateUserCourseRegistrationController = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const userId = Number(req.params.userId);
  const courseId = Number(req.params.courseId);

  await deactivateUserCourseRegistrationService(userId, courseId);
  return res.status(204).json();
};
