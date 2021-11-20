import { all, fork } from "redux-saga/effects";
import usersPageSaga from "../containers/UsersPage/saga";

export default function* rootSaga() {
  yield all([usersPageSaga].map(fork));
}
