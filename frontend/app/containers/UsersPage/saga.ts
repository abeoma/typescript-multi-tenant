import { SagaIterator } from "redux-saga";
import { call } from "redux-saga/effects";
import { loadUsersEntities } from "../../sagas/api";

export default function* usersPageSage(): SagaIterator {
  const res = yield call(loadUsersEntities);
  console.log("SAGA:", res);
}
