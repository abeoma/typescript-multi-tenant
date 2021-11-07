import { SagaIterator } from "redux-saga";
import { call } from "redux-saga/effects";
import { loadUserEntities } from "../../sagas/api";

export default function* usersPageSage(): SagaIterator {
  const res = yield call(loadUserEntities);
  console.log("SAGA:", res);
  // usersReducerActionCreators.onLoadUsers({ entries: res });
}
