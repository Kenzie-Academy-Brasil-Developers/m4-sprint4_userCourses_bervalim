import { Router } from "express";
import {
  createUserController,
  readAllUserController,
} from "../controllers/user.controller";
import { validateBody } from "../middlewares/validateBody.middleware";
import { userCreateRequestSchema } from "../schemas/user.schema";
import { verifyEmailExists } from "../middlewares/verifyEmailExists.middleware";
import { verifyToken } from "../middlewares/verifyToken.middleware";

export const userRouter: Router = Router();

userRouter.post(
  "/",
  validateBody(userCreateRequestSchema),
  verifyEmailExists,
  createUserController
);
userRouter.get("/", verifyToken, readAllUserController);
