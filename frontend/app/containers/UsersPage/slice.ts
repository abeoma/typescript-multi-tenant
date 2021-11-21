import {
  createEntityAdapter,
  createSlice,
  EntityState,
  PayloadAction,
} from "@reduxjs/toolkit";
import { User } from "../../schema";
import { RootState } from "../../store";

interface UsersPageState extends EntityState<User> {
  page: number;
  sum: number;
  offset: number;
  openUserModal: boolean;
}

const usersAdapter = createEntityAdapter<User>();

const initialState: UsersPageState = usersAdapter.getInitialState({
  page: 1,
  sum: 0,
  offset: 0,
  openUserModal: false,
});

const slice = createSlice({
  name: "users",
  initialState,
  reducers: {
    load(state, action: PayloadAction<{ users: User[] }>) {
      usersAdapter.setAll(state, action.payload.users);
    },
    openUserModal(state) {
      state.openUserModal = true;
    },
    closeUserModal(state) {
      state.openUserModal = false;
    },
  },
});

export const usersReducerActions = slice.actions;
export const usersReducer = slice.reducer;

export const usersSelectors = usersAdapter.getSelectors<RootState>(
  (state) => state.users
);
