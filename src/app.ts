import "express-async-errors";
import "dotenv/config";
import express, { Application } from "express";
import { handleErrors } from "./middlewares/handleErrors.middleware";
import { allRoutes } from "./routes";

const app: Application = express();

app.use(express.json());

app.use("/", allRoutes);

app.use(handleErrors);

export default app;
