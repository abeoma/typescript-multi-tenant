import { SagaIterator } from "redux-saga";
import { call, put, takeLatest, takeLeading } from "redux-saga/effects";
import actionCreatorFactory from "typescript-fsa";
import { createNewUser, loadUserEntities } from "../../sagas/api";
import { callSafe } from "../../sagas/utils";
import { User } from "../../schema";
import { usersReducerActions } from "./slice";

const actionCreator = actionCreatorFactory("CUSTOMERS_ADMIN_SAGA");

export const usersSagaActionCreator = {
  onClickSubmit: actionCreator<Omit<User, "id" | "isActive"> & { id?: string }>(
    "ON_CLICK_SUBMIT"
  ),
  onOpenUserModal: actionCreator("ON_OPEN_USER_MODAL"),
  onCloseUserModal: actionCreator("ON_CLOSE_USER_MODAL"),
};

const actions = usersSagaActionCreator;

function* load(): SagaIterator {
  const users: User[] = yield callSafe(loadUserEntities);
  yield put(usersReducerActions.load({ users }));
}

export default function* usersPageSaga(): SagaIterator {
  yield call(load);

  yield takeLatest(actions.onOpenUserModal, function* () {
    yield put(usersReducerActions.openUserModal());
    yield takeLeading(actions.onClickSubmit, function* ({ payload }) {
      yield callSafe(createNewUser, payload);
      yield call(load);
      yield put(usersReducerActions.closeUserModal());
    });
  });
}
