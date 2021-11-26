import {
  GetArgs,
  PostArgs,
  PutArgs,
  RequestArgs,
  executeRequest,
} from "../../lib/redux/middlewares/request";
import { SagaIterator } from "@redux-saga/types";
import { User } from "../schema";
import { apiEndopint } from "./endpoint";
import { call } from "@redux-saga/core/effects";

const requestInternal = (args: RequestArgs) => {
  return executeRequest(args, {
    mode: "cors",
    credentials: "same-origin",
  });
};

const requestGet = (
  endpoint: string,
  { data }: Omit<GetArgs, "method" | "endpoint"> = {}
) => {
  return requestInternal({ method: "GET", endpoint, data });
};

const requestPost = (
  endpoint: string,
  props: Omit<PostArgs, "method" | "endpoint"> = {}
) => {
  return requestInternal({ method: "POST", endpoint, ...props });
};

const requestPut = (
  endpoint: string,
  props: Omit<PutArgs, "method" | "endpoint"> = {}
) => {
  return requestInternal({ method: "PUT", endpoint, ...props });
};

type ApiResult<Payload, Meta = Record<string, unknown>> = {
  meta: Meta;
  payload: Payload;
};

export const loadUserEntities = function* (): SagaIterator<User[]> {
  const res: ApiResult<User[]> = yield call(requestGet, apiEndopint.users);
  return res.payload;
};

export const createNewUser = function* ({
  id,
  firstName,
  lastName,
  email,
}: Pick<User, "firstName" | "lastName" | "email"> & { id?: string }) {
  yield call(requestPost, apiEndopint.users, {
    data: {
      id,
      firstName,
      lastName,
      email,
    },
  });
};

export const updateUser = function* ({
  id,
  email,
  firstName,
  lastName,
}: Omit<User, "isActive">) {
  yield call(requestPut, apiEndopint.userDetail(id), {
    data: {
      email,
      firstName,
      lastName,
    },
  });
};
