import { Router } from "express";
import {
  createUserController,
  readAllUserController,
  readAllUserCoursesController,
} from "../controllers/user.controller";
import { validateBody } from "../middlewares/validateBody.middleware";
import { userCreateRequestSchema } from "../schemas/user.schema";
import { verifyEmailExists } from "../middlewares/verifyEmailExists.middleware";
import { verifyToken } from "../middlewares/verifyToken.middleware";
import { verifyPermission } from "../middlewares/verifyPermission.middleware";

export const userRouter: Router = Router();

userRouter.post(
  "/",
  validateBody(userCreateRequestSchema),
  verifyEmailExists,
  createUserController
);
userRouter.get("/", verifyToken, verifyPermission, readAllUserController);
userRouter.get(
  "/:userId/courses",
  verifyToken,
  verifyPermission,
  readAllUserCoursesController
);
