import { hash } from "bcryptjs";
import {
  tUserCreateRequest,
  tUserResponse,
  tUserResult,
} from "../interfaces/user.interface";
import format from "pg-format";
import { client } from "../database";

export const createUserService = async (
  bodyRequest: tUserCreateRequest
): Promise<tUserResponse> => {
  bodyRequest.password = await hash(bodyRequest.password, 12);

  const query: string = format(
    'INSERT INTO "users" (%I) VALUES (%L) RETURNING *;',
    Object.keys(bodyRequest),
    Object.values(bodyRequest)
  );

  const data: tUserResult = await client.query(query);

  return data.rows[0];
};
