import React from "react";
import { Route, Switch } from "react-router";
import { Redirect } from "react-router-dom";
import AppLayout from "./AppLayout";
import urls from "../../urls";
import AssetsPage from "../AssetsPage";
import UsersPage from "../UsersPage";

const App = () => {
  return (
    <AppLayout>
      <Switch>
        <Route path={urls.users()} component={UsersPage} />
        <Route path={urls.assets()} component={AssetsPage} />
        <Redirect to={urls.users()} />
      </Switch>
    </AppLayout>
  );
};

export default App;
