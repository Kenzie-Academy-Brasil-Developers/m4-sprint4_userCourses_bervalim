import { Router } from "express";
import { validateBody } from "../middlewares/validateBody.middleware";
import { courseRequestSchema } from "../schemas/courses.schema";
import { verifyToken } from "../middlewares/verifyToken.middleware";
import { verifyPermission } from "../middlewares/verifyPermission.middleware";
import { createCourseController } from "../controllers/courses.controller";

export const coursesRouter: Router = Router();
coursesRouter.post(
  "/",
  verifyToken,
  verifyPermission,
  validateBody(courseRequestSchema),
  createCourseController
);
