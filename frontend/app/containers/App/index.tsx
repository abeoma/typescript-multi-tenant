import { Route, Switch } from "react-router";
import AppLayout from "./AppLayout";
import AppsIcon from "@mui/icons-material/Apps";
import AssetsPage from "../AssetsPage";
import PeopleIcon from "@mui/icons-material/People";
import React from "react";
import { Redirect } from "react-router-dom";
import { SidebarItem } from "./Sidebar";
import UsersPage from "../UsersPage";
import urls from "../../urls";

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
