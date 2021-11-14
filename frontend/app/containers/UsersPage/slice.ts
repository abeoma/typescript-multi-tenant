import {
  createEntityAdapter,
  createSlice,
  PayloadAction,
} from "@reduxjs/toolkit";
import { User } from "../../schema";
import { RootState } from "../../store";

const usersAdapter = createEntityAdapter<User>();

const initialState = usersAdapter.getInitialState({ values: { users: [] } });

const slice = createSlice({
  name: "users",
  initialState,
  reducers: {
    load(state, action: PayloadAction<User[]>) {
      usersAdapter.setAll(state, action.payload);
    },
  },
});

export const usersReducerActions = slice.actions;
export const usersReducer = slice.reducer;

export const usersSelectors = usersAdapter.getSelectors<RootState>(
  (state) => state.users
);
