import * as React from "react";
import * as ReactDOM from "react-dom";
import { createBrowserHistory } from "history";
import {
  ConnectedRouter,
  connectRouter,
  RouterState,
} from "connected-react-router";
import { useEffect } from "react";
import { useLocation } from "react-router";
import { IsJsonString } from "./components/utils";
import {
  AnyAction,
  applyMiddleware,
  CombinedState,
  combineReducers,
  createStore,
  Reducer,
} from "redux";
import { Provider } from "react-redux";
import createSagaMiddleware from "redux-saga";
import rootSaga from "../app/sagas";

const CLEAR_ALL_STATE = Symbol("CLEAR_ALL_STATE");

export function clearAllState() {
  return { type: CLEAR_ALL_STATE };
}

const ScrollToTop: React.FC = () => {
  const { pathname, search } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname, search]);
  return null;
};

export default function configureApplication() {
  const browserHistory = createBrowserHistory({
    //https://reactrouter.com/web/api/BrowserRouter/getuserconfirmation-func
    getUserConfirmation: (
      payload: string,
      callback: (result: boolean) => void
    ) => {
      if (IsJsonString(payload)) {
        // https://github.com/ReactTraining/react-router/issues/5405#issuecomment-781642489
        const { action, message, nextLocation } = JSON.parse(payload);

        // Check if the current location and the next are equal. If so, ignore. This prevents some double
        // confirmation alerts.
        if (browserHistory.location.key === nextLocation.key) {
          return;
        }

        const allowTransition = window.confirm(message);

        if (action == "POP" && !allowTransition) {
          window.history.forward();
          return;
        }
        callback(allowTransition);
      } else {
        const allowTransition = window.confirm(payload);
        callback(allowTransition);
      }
    },
  });

  const sagaMiddleware = createSagaMiddleware();

  const appReducer = combineReducers({
    router: connectRouter(browserHistory),
  });
  const reducer: Reducer<CombinedState<{ router: RouterState }>, AnyAction> = (
    state,
    action
  ) => {
    if (action.type === CLEAR_ALL_STATE) {
      return appReducer(undefined, action);
    }
    return appReducer(state, action);
  };
  const store = createStore(reducer, applyMiddleware(sagaMiddleware));
  sagaMiddleware.run(rootSaga);

  return {
    render(Root: React.ComponentClass | React.FC, target: HTMLElement) {
      ReactDOM.render(
        <Provider store={store}>
          <ConnectedRouter history={browserHistory}>
            <ScrollToTop />
            <Root />
          </ConnectedRouter>
        </Provider>,
        target
      );
    },
  };
}
