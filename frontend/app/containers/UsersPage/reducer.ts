import actionCreatorFactory from "typescript-fsa";
import { reducerWithInitialState } from "typescript-fsa-reducers";
import { initialListPageState } from "../../reducers/types";

const actionCreator = actionCreatorFactory("USERS_REDUCER");

export const usersReducerActionCreators = {
  onLoadUsers: actionCreator<{
    entries: string[];
    sum: number;
    offset: number;
  }>("ON_LOAD"),
};

const actions = usersReducerActionCreators; // alias

export interface UsersState {
  entries: string[];
  sum: number;
  offset: number;
  page: number;
}

const usersReducer = reducerWithInitialState<UsersState>({
  ...initialListPageState,
}).case(actions.onLoadUsers, (state, payload) => ({
  ...state,
  ...payload,
}));
export default usersReducer;
