import React from "react";
import { Divider, Drawer, IconButton, styled, Toolbar } from "@mui/material";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import { fontColor, mediaTabletAndMobile } from "../../../lib/style-variables";
import { SidebarItemList } from "./SidebarItemList";

export const DRAWER_WIDTH = 240;

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

type Props = { open: boolean; toggleDrawer: () => void };

export const Sidebar = ({ open, toggleDrawer }: Props) => {
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
      <SidebarItemList />
    </StyledDrawer>
  );
};
