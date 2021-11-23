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
  openModal: boolean;
  selectedId?: string;
}

const usersAdapter = createEntityAdapter<User>();

const initialState: UsersPageState = usersAdapter.getInitialState({
  page: 1,
  sum: 0,
  offset: 0,
  openModal: false,
  selectedId: undefined,
});

const slice = createSlice({
  name: "users",
  initialState,
  reducers: {
    load(state, action: PayloadAction<{ users: User[] }>) {
      usersAdapter.setAll(state, action.payload.users);
    },
    openModal(state, action: PayloadAction<{ userId?: string }>) {
      state.openModal = true;
      state.selectedId = action.payload.userId;
    },
    closeModal(state) {
      state.openModal = false;
      state.selectedId = undefined;
    },
  },
});

export const usersReducerActions = slice.actions;
export const usersReducer = slice.reducer;

export const usersSelectors = usersAdapter.getSelectors<RootState>(
  (state) => state.users
);
