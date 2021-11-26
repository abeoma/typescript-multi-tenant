import {
  EntityState,
  PayloadAction,
  createEntityAdapter,
  createSlice,
} from "@reduxjs/toolkit";
import { RootState } from "../../store";
import { User } from "../../schema";

interface UsersPageState extends EntityState<User> {
  page: number;
  sum: number;
  offset: number;
  openModal: boolean;
  selectedId?: string | null;
}

const usersAdapter = createEntityAdapter<User>();

const initialState: UsersPageState = usersAdapter.getInitialState({
  page: 1,
  sum: 0,
  offset: 0,
  openModal: false,
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
      state.selectedId = null;
    },
  },
});

export const usersReducerActions = slice.actions;
export const usersReducer = slice.reducer;

export const usersSelectors = usersAdapter.getSelectors<RootState>(
  (state) => state.users
);
