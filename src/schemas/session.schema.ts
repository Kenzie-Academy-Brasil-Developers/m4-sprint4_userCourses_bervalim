import { userResponseSchema } from "./user.schema";

export const sessionRequestSchema = userResponseSchema.pick({
  email: true,
  password: true,
});
