import { Router } from "express";
import { userRouter } from "./user.routes";

export const allRoutes: Router = Router();

allRoutes.use("/users", userRouter);
