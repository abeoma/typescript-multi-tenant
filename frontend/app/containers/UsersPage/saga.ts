import { SagaIterator } from "redux-saga";
import { call, put } from "redux-saga/effects";
import { loadUserEntities } from "../../sagas/api";
import { usersReducerActions } from "./slice";

export default function* usersPageSage(): SagaIterator {
  const entities = yield call(loadUserEntities);
  yield put(usersReducerActions.load(entities));
}
