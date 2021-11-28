import { call, put, takeLatest } from "redux-saga/effects";
import { callSafe, takeLeadingSafe } from "../../sagas/utils";
import { createNewUser, loadUserEntities, updateUser } from "../../sagas/api";
import { SagaIterator } from "redux-saga";
import { User } from "../../schema";
import actionCreatorFactory from "typescript-fsa";
import { usersReducerActions } from "./slice";

const actionCreator = actionCreatorFactory("CUSTOMERS_ADMIN_SAGA");

export const usersSagaActionCreator = {
  onSaveNew: actionCreator<Omit<User, "id" | "isActive"> & { id?: string }>(
    "ON_SAVE_NEW"
  ),
  onSaveEdit: actionCreator<Omit<User, "id" | "isActive">>("ON_SAVE_EDIT"),
  onOpenNewModal: actionCreator("ON_OPEN_NEW_MODAL"),
  onOpenEditModal: actionCreator<{ userId: string }>("ON_OPEN_EDIT_MODAL"),
  onCloseUserModal: actionCreator("ON_CLOSE_USER_MODAL"),
};

const actions = usersSagaActionCreator;

const load = function* (): SagaIterator {
  const users: User[] = yield callSafe(loadUserEntities);
  yield put(usersReducerActions.load({ users }));
};

export default function* usersPageSaga(): SagaIterator {
  yield call(load);

  yield takeLatest(actions.onOpenNewModal, function* openNewModal() {
    yield put(usersReducerActions.openModal({}));
    yield takeLeadingSafe(actions.onSaveNew, function* saveNew({ payload }) {
      yield call(createNewUser, payload);
      yield call(load);
      yield put(usersReducerActions.closeModal());
    });
  });

  yield takeLatest(
    actions.onOpenEditModal,
    function* openEditModal({ payload }) {
      const { userId } = payload;
      yield put(usersReducerActions.openModal({ userId }));
      yield takeLeadingSafe(
        actions.onSaveEdit,
        function* saveEdit({ payload: payload2 }) {
          yield call(updateUser, { id: userId, ...payload2 });
          yield call(load);
          yield put(usersReducerActions.closeModal());
        }
      );
    }
  );
}
