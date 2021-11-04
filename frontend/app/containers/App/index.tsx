import React from "react";
import { Route, Switch } from "react-router";
import { Redirect } from "react-router-dom";
import AppLayout from "./AppLayout";
import urls from "../../urls";
import AssetsPage from "../AssetsPage";
import UsersPage from "../UsersPage";
import AppsIcon from "@mui/icons-material/Apps";
import PeopleIcon from "@mui/icons-material/People";
import { SidebarItem } from "./Sidebar";

const sidebarItems: SidebarItem[] = [
  { title: "Assets", to: urls.assets(), icon: <AppsIcon /> },
  {
    title: "Users",
    to: urls.users(),
    icon: <PeopleIcon />,
  },
];

const App = () => {
  return (
    <AppLayout sidebarItems={sidebarItems}>
      <Switch>
        <Route path={urls.users()} component={UsersPage} />
        <Route path={urls.assets()} component={AssetsPage} />
        <Redirect to={urls.users()} />
      </Switch>
    </AppLayout>
  );
};

export default App;
