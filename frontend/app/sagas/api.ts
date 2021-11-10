import { call } from "@redux-saga/core/effects";
import { fetch } from "cross-fetch";
import endpoint from "./endpoint";
import { User } from "../schema";
import { SagaIterator } from "@redux-saga/types";

type Method = "GET" | "POST" | "PUT" | "DELETE";
type RawResponse = Record<string, unknown>;

async function requestRaw(
  endpoint: string,
  method: Method
): Promise<RawResponse> {
  const res = await fetch(endpoint, { method });
  return res.json();
}

function* requestGet(endpoint: string): SagaIterator {
  const resJson: RawResponse = yield call(requestRaw, endpoint, "GET");
  return resJson;
}

export function* loadUserEntities(): SagaIterator<User[]> {
  return yield call(requestGet, endpoint.users);
}
