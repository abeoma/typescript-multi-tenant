import { call } from "@redux-saga/core/effects";
import { fetch } from "cross-fetch";

const ENDPOINT = {
  USERS: "/api/users",
};

async function requestInternalRaw(args: { endpoint: string }) {
  const res = await fetch(args.endpoint, { method: "GET" });
  return res.text();
}

export function* loadUsersEntities(): Generator {
  return yield call(requestInternalRaw, { endpoint: ENDPOINT.USERS });
}
