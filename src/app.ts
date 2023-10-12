import "express-async-errors";
import "dotenv/config";
import express, { Application, json } from "express";

const app: Application = express();

app.use(express.json());

export default app;
