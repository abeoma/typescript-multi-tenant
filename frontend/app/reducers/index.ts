import { combineReducers } from "redux";
import usersReducer from "../containers/UsersPage/reducer";
import { entities } from "./entities";

export const viewState = combineReducers({
  users: usersReducer,
});

export { entities };
