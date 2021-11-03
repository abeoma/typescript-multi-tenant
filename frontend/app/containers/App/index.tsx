import React from "react";
import { Route, Switch } from "react-router";
import { Redirect } from "react-router-dom";
import AppContainer from "../../../lib/components/AppContainer";
import urls from "../../urls";
import AssetsPage from "../AssetsPage";
import UsersPage from "../UsersPage";
import { LeftNav } from "./LeftNav";

const App = () => {
  return (
    <AppContainer leftNav={<LeftNav />}>
      <Switch>
        <Route path={urls.users()} component={UsersPage} />
        <Route path={urls.assets()} component={AssetsPage} />
        <Redirect to={urls.users()} />
      </Switch>
    </AppContainer>
  );
};

export default App;
