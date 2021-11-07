// import { call } from "@redux-saga/core/effects";
// import { fetch } from "cross-fetch";
// import { put } from "redux-saga/effects";
// import { GetArgs, RequestArgs } from "../../lib/redux/middlewares/request";
// import endpoint from "./endpoint";

// const options: RequestInit = {
//   mode: "cors",
//   credentials: "same-origin",
// };

// async function requestInternalRaw(args: RequestArgs) {
//   const res = await fetch(args.endpoint, { ...options });
//   return res.text();
// }

// function* requestGet(
//   endpoint: string,
//   { data }: Omit<GetArgs, "method" | "endpoint"> = {}
// ) {
//   return yield call(
//     requestInternalRaw,
//     function* () {
//       yield cancel();
//     },
//     {
//       method: "GET",
//       endpoint,
//       data,
//     }
//   );
// }

// type AcceptableSchema = Entity | Entity[] | { [k: string]: Entity | Entity[] };

// function* normalizeEntity(
//   payload: Record<string, unknown>,
//   schema: AcceptableSchema
// ) {
//   // apiから返された生データ(payload)を変換する処理
//   const { entities, result } = normalize(transformRecurrently(payload), schema);
//   yield put(onNormalized({ entities }));
//   return { entities, result };
// }

// export type ApiResult<Payload, Meta = Record<string, unknown>> = {
//   meta: Meta;
//   payload: Payload;
// };

// export type LoadEntityResult<Result = any, Meta = any> = {
//   entities: any;
//   result: Result;
//   meta: Meta;
// };

// export type LoadEntityListResult = LoadEntityResult<
//   string[],
//   { sum: number; offset: number }
// >;

// function* loadEntity(
//   endpoint: string,
//   schema: AcceptableSchema,
//   { data }: { data?: Record<string, unknown> } = {}
// ): Iterator<CallEffect, LoadEntityResult, any> {
//   const resJson = yield call(requestGet, endpoint, { data });
//   const { payload } = resJson;

//   const { entities, result } = yield call(normalizeEntity, payload, schema);
//   return { entities, result, meta: resJson.meta };
// }

export function* loadUserEntities(): Generator {
  yield console.log("hoo");
  // return yield call(requestInternalRaw, { endpoint: endpoint.users });
  // const { meta, result } = yield call(loadEntity, endpoint.users, [USER], {
  //   data: { page, role_id: roleId, user_id_prefix: userIdPrefix },
  // });
  // return { meta, result };
}
