import { z } from "zod";
import { sessionRequestSchema } from "../schemas/session.schema";

export type tSessionRequestBody = z.infer<typeof sessionRequestSchema>;
export type tSessionResponse = { token: string };
