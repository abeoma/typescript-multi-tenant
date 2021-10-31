import { all, fork } from "redux-saga/effects";
import usersPageSage from "../containers/UsersPage/saga";

export default function* rootSaga() {
  yield all([fork(usersPageSage)]);
}
