import { call } from "@redux-saga/core/effects";
import { fetch } from "cross-fetch";
import endpoint from "./endpoint";

async function requestInternalRaw(args: { endpoint: string }) {
  const res = await fetch(args.endpoint, { method: "GET" });
  return res.text();
}

export function* loadUserEntities(): Generator {
  return yield call(requestInternalRaw, { endpoint: endpoint.users });
}
