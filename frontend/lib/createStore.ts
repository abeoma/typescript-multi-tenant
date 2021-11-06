import { connectRouter, RouterState } from "connected-react-router";
import createSagaMiddleware, { Saga } from "redux-saga";
import {
  AnyAction,
  applyMiddleware,
  CombinedState,
  combineReducers,
  createStore,
  Reducer,
  ReducersMapObject,
} from "redux";
import { History } from "history";

const CLEAR_ALL_STATE = Symbol("CLEAR_ALL_STATE");

export function clearAllState() {
  return { type: CLEAR_ALL_STATE };
}

type Props = {
  reducers: ReducersMapObject;
  saga: Saga;
  history: History;
};

export default ({ reducers, saga, history }: Props) => {
  const reducer = combineReducers({
    router: connectRouter(history),
    ...reducers,
  });
  const resettableReducer: Reducer<
    CombinedState<{ router: RouterState }>,
    AnyAction
  > = (state, action) =>
    reducer(action.type !== CLEAR_ALL_STATE ? state : undefined, action);

  const sagaMiddleware = createSagaMiddleware();
  const store = createStore(resettableReducer, applyMiddleware(sagaMiddleware));
  sagaMiddleware.run(saga);
  return store;
};
