import * as React from "react";
import { Route, Switch } from "react-router";
import { Redirect } from "react-router-dom";
import urls from "../../urls";
import AssetsPage from "../AssetsPage";
import UsersPage from "../UsersPage";

const App = () => {
  return (
    <Switch>
      <Route path={urls.users()} component={UsersPage} />
      <Route path={urls.assets()} component={AssetsPage} />
      <Redirect to={urls.users()} />
    </Switch>
  );
};

export default App;
