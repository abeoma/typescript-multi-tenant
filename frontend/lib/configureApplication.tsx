import * as React from "react";
import * as ReactDOM from "react-dom";
import { createBrowserHistory } from "history";
import { ConnectedRouter } from "connected-react-router";
import { useEffect } from "react";
import { useLocation } from "react-router";
import { IsJsonString } from "./components/utils";
import { Provider } from "react-redux";
import createStore from "./createStore";
import { Saga } from "redux-saga";

const ScrollToTop: React.FC = () => {
  const { pathname, search } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname, search]);
  return null;
};

export default function configureApplication(saga: Saga) {
  const history = createBrowserHistory({
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
        if (history.location.key === nextLocation.key) {
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

  const store = createStore({ saga, history });

  return {
    render(Root: React.ComponentClass | React.FC, target: HTMLElement) {
      ReactDOM.render(
        <Provider store={store}>
          <ConnectedRouter history={history}>
            <ScrollToTop />
            <Root />
          </ConnectedRouter>
        </Provider>,
        target
      );
    },
  };
}
