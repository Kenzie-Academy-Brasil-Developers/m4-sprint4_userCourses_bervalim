import { Router } from "express";
import { userRouter } from "./user.routes";
import { coursesRouter } from "./courses.routes";
import { sessionRouter } from "./session.routes";

export const allRoutes: Router = Router();

allRoutes.use("/users", userRouter);
allRoutes.use("/login", sessionRouter);
allRoutes.use("/courses", coursesRouter);
