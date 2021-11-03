import React from "react";
import { NavLink } from "react-router-dom";
import {
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  styled,
  Tooltip,
} from "@mui/material";
import AppsIcon from "@mui/icons-material/Apps";
import PeopleIcon from "@mui/icons-material/People";
import urls from "../../urls";

const StyledLink = styled(NavLink)``;

const Item = ({
  to,
  title,
  icon,
}: {
  to: string;
  title: string;
  icon?: React.ReactNode;
}) => (
  <StyledLink exact to={to}>
    <Tooltip title={title} placement={"right"}>
      <ListItem button>
        {icon ? <ListItemIcon>{icon}</ListItemIcon> : null}
        <ListItemText primary={title} />
      </ListItem>
    </Tooltip>
  </StyledLink>
);

export const LeftNav = () => {
  return (
    <List>
      <Item to={urls.assets()} icon={<AppsIcon />} title={"Assets"} />
      <Item to={urls.users()} icon={<PeopleIcon />} title={"Users"} />
    </List>
  );
};
