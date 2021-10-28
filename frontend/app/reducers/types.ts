import { RouterState } from "connected-react-router";

export interface Action<PAYLOAD extends Record<string, unknown>> {
  type: symbol;
  payload: PAYLOAD;
}

export type ListState<T> = {
  page: number;
  sum: number;
  offset: number;
  entries: T[];
};

export type ListPageState = ListState<string>;

export const initialListPageState: ListPageState = {
  page: 0,
  sum: 0,
  offset: 0,
  entries: [],
};

export interface AppState {
  router: RouterState;
}
