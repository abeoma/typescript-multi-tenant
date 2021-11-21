import { call } from "@redux-saga/core/effects";
import endpoint from "./endpoint";
import { User } from "../schema";
import { SagaIterator } from "@redux-saga/types";
import {
  executeRequest,
  GetArgs,
  PostArgs,
  RequestArgs,
} from "../../lib/redux/middlewares/request";

async function requestInternal(args: RequestArgs) {
  return await executeRequest(args, {
    mode: "cors",
    credentials: "same-origin",
  });
}

async function requestGet(
  endpoint: string,
  { data }: Omit<GetArgs, "method" | "endpoint"> = {}
) {
  return await requestInternal({ method: "GET", endpoint, data });
}

async function requestPost(
  endpoint: string,
  props: Omit<PostArgs, "method" | "endpoint"> = {}
) {
  return await requestInternal({ method: "POST", endpoint, ...props });
}

type ApiResult<Payload, Meta = Record<string, unknown>> = {
  meta: Meta;
  payload: Payload;
};

export function* loadUserEntities(): SagaIterator<User[]> {
  const res: ApiResult<User[]> = yield call(requestGet, endpoint.users);
  return res.payload;
}

export function* createNewUser({
  id,
  firstName,
  lastName,
  email,
}: Pick<User, "firstName" | "lastName" | "email"> & { id?: string }) {
  yield call(requestPost, endpoint.users, {
    data: {
      id: id || undefined,
      firstName,
      lastName,
      email,
    },
  });
}
