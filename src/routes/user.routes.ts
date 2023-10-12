import { Router } from "express";
import { createUserController } from "../controllers/user.controller";
import { validateBody } from "../middlewares/validateBody.middleware";
import { userCreateRequestSchema } from "../schemas/user.schema";

export const userRouter: Router = Router();

userRouter.post(
  "/",
  validateBody(userCreateRequestSchema),
  createUserController
);
