import {
  Divider,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Toolbar,
  styled,
} from "@mui/material";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import { NavLink } from "react-router-dom";
import React from "react";

export const DRAWER_WIDTH = 240;

export type SidebarItem = {
  to: string;
  title: string;
  icon: React.ReactNode;
};

const Item = ({ to, title, icon }: SidebarItem) => (
  <NavLink exact to={to}>
    <ListItem button>
      <ListItemIcon>{icon}</ListItemIcon>
      <ListItemText primary={title} />
    </ListItem>
  </NavLink>
);

const StyledDrawer = styled(Drawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  "& a": {
    textDecoration: "none",
    color: theme.palette.text.primary,
  },
  "& .MuiDrawer-paper": {
    position: "relative",
    whiteSpace: "nowrap",
    width: DRAWER_WIDTH,
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
    boxSizing: "border-box",
    ...(!open && {
      overflowX: "hidden",
      transition: theme.transitions.create("width", {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
      [theme.breakpoints.down("md")]: {
        width: 0,
      },
    }),
  },
}));

const StyledToolbar = styled(Toolbar)({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
});

type Props = {
  open: boolean;
  toggleDrawer: () => void;
  items: SidebarItem[];
};

export const Sidebar = ({ open, toggleDrawer, items }: Props) => {
  return (
    <StyledDrawer variant="permanent" open={open} sx={{}}>
      <StyledToolbar>
        <IconButton onClick={toggleDrawer}>
          <ChevronLeftIcon />
        </IconButton>
      </StyledToolbar>
      <Divider />
      <List>
        {items.map((v, i) => (
          <Item key={i} {...v} />
        ))}
      </List>
    </StyledDrawer>
  );
};
