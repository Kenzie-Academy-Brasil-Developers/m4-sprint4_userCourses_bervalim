import { Router } from "express";
import { userRouter } from "./user.routes";
import { coursesRouter } from "./courses.routes";

export const allRoutes: Router = Router();

allRoutes.use("/users", userRouter);
allRoutes.use("/courses", coursesRouter);
