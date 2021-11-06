import { combineReducers } from "redux";
import usersReducer from "../containers/UsersPage/reducer";

export const viewState = combineReducers({
  users: usersReducer,
});
