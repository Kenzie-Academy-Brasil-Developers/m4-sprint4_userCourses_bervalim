import { Router } from "express";
import { loginController } from "../controllers/session.controller";
import { validateBody } from "../middlewares/validateBody.middleware";
import { sessionRequestSchema } from "../schemas/session.schema";

export const sessionRouter: Router = Router();

sessionRouter.post("/", validateBody(sessionRequestSchema), loginController);
