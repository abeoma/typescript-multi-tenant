import { history, store } from "./store";
import { ConnectedRouter } from "connected-react-router";
import { Provider } from "react-redux";

import React from "react";
import ReactDOM from "react-dom";
import Root from "./containers/Root";
import { assertIsDefined } from "@barasu/common/asserts";

const target = document.getElementById("index");
assertIsDefined(target);

ReactDOM.render(
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <Root />
    </ConnectedRouter>
  </Provider>,
  target
);
