import { Router } from "express";
import { validateBody } from "../middlewares/validateBody.middleware";
import { courseRequestSchema } from "../schemas/courses.schema";
import { verifyToken } from "../middlewares/verifyToken.middleware";
import { verifyPermission } from "../middlewares/verifyPermission.middleware";
import {
  createCourseController,
  deactivateUserCourseRegistrationController,
  enrollUserInACourseController,
  readAllCoursesController,
  readAllUserCoursesController,
} from "../controllers/courses.controller";
import { verifyIdCoursesUsers } from "../middlewares/verifyIdCoursesUsers.middlewares";

export const coursesRouter: Router = Router();
coursesRouter.post(
  "/",
  verifyToken,
  verifyPermission,
  validateBody(courseRequestSchema),
  createCourseController
);
coursesRouter.get("/", readAllCoursesController);
coursesRouter.post(
  "/:courseId/users/:userId",
  verifyIdCoursesUsers,
  verifyToken,
  verifyPermission,
  enrollUserInACourseController
);
coursesRouter.delete(
  "/:courseId/users/:userId",
  verifyIdCoursesUsers,
  verifyToken,
  verifyPermission,
  deactivateUserCourseRegistrationController
);
coursesRouter.get(
  "/:courseId/users",
  verifyToken,
  verifyPermission,
  readAllUserCoursesController
);
