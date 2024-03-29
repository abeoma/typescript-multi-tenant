import { History, createBrowserHistory } from "history";
import { connectRouter, routerMiddleware } from "connected-react-router";
import { configureStore } from "@reduxjs/toolkit";
import createSagaMiddleware from "redux-saga";
import rootSaga from "./sagas";
import { usersReducer } from "./containers/UsersPage/slice";
const sagaMiddleware = createSagaMiddleware();

export const history: History = createBrowserHistory();
const router = connectRouter(history);

export const store = configureStore({
  reducer: { router, users: usersReducer },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(sagaMiddleware, routerMiddleware(history)),
});

export type RootState = ReturnType<typeof store.getState>;

sagaMiddleware.run(rootSaga);
