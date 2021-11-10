import React from "react";
import ReactDOM from "react-dom";
import Root from "./containers/Root";
import { assertIsDefined } from "@barasu/common/asserts";
import { store, history } from "./store";
import { Provider } from "react-redux";
import { ConnectedRouter } from "connected-react-router";

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
