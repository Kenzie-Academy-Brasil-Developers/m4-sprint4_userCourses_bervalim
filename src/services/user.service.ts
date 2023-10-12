import { hash } from "bcryptjs";
import {
  tUserCreateRequest,
  tUserResponse,
  tUserResult,
  tUserReturnNoPassword,
} from "../interfaces/user.interface";
import format from "pg-format";
import { client } from "../database";
import { userReturnSchema } from "../schemas/user.schema";

export const createUserService = async (
  bodyRequest: tUserCreateRequest
): Promise<tUserReturnNoPassword> => {
  bodyRequest.password = await hash(bodyRequest.password, 12);

  const query: string = format(
    'INSERT INTO "users" (%I) VALUES (%L) RETURNING *;',
    Object.keys(bodyRequest),
    Object.values(bodyRequest)
  );

  const data: tUserResult = await client.query(query);

  return userReturnSchema.parse(data.rows[0]);
};
