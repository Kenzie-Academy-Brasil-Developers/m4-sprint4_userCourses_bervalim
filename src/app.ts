import "express-async-errors";
import "dotenv/config";
import express, { Application, json } from "express";
import { handleErrors } from "./middlewares/handleErrors.middleware";

const app: Application = express();

app.use(express.json());

app.use(handleErrors);

export default app;
