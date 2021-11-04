import React from "react";
import {
  Divider,
  Drawer,
  IconButton,
  styled,
  Toolbar,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Tooltip,
} from "@mui/material";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import { fontColor, mediaTabletAndMobile } from "../../../lib/style-variables";
import { NavLink } from "react-router-dom";
import { baseFontSize } from "../../../lib/style-variables";

export const DRAWER_WIDTH = 240;

export type SidebarItem = {
  to: string;
  title: string;
  icon: React.ReactNode;
};

const StyledLink = styled(NavLink)``;

const Item = ({ to, title, icon }: SidebarItem) => (
  <StyledLink exact to={to}>
    <Tooltip
      title={<div style={{ fontSize: baseFontSize }}>{title}</div>}
      placement={"right"}
      arrow={true}
    >
      <ListItem button>
        <ListItemIcon>{icon}</ListItemIcon>
        <ListItemText primary={title} />
      </ListItem>
    </Tooltip>
  </StyledLink>
);

const StyledDrawer = styled(Drawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
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
      width: theme.spacing(7),
      [mediaTabletAndMobile]: {
        width: 0,
      },
    }),
  },
}));

type Props = {
  open: boolean;
  toggleDrawer: () => void;
  items: SidebarItem[];
};

export const Sidebar = ({ open, toggleDrawer, items }: Props) => {
  return (
    <StyledDrawer
      variant="permanent"
      open={open}
      sx={{
        ["& a"]: {
          textDecoration: "none",
          color: fontColor,
        },
      }}
    >
      <Toolbar
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "flex-end",
          px: [1],
        }}
      >
        <IconButton onClick={toggleDrawer}>
          <ChevronLeftIcon />
        </IconButton>
      </Toolbar>
      <Divider />
      <List>
        {items.map((v, i) => (
          <Item key={i} {...v} />
        ))}
      </List>
    </StyledDrawer>
  );
};
