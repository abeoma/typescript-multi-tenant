import React, { MouseEvent, useState } from "react";
import {
  AppBar,
  AppBarProps,
  Badge,
  Box,
  Container,
  CssBaseline,
  IconButton,
  IconButtonProps,
  Menu,
  MenuItem,
  styled,
  Toolbar,
  Typography,
} from "@mui/material";
import NotificationsIcon from "@mui/icons-material/Notifications";
import MenuIcon from "@mui/icons-material/Menu";
import { DRAWER_WIDTH, Sidebar, SidebarItem } from "./Sidebar";
import { AccountCircle } from "@mui/icons-material";

const FlexBox = styled(Box)({
  display: "flex",
});

const Header = styled(AppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})<AppBarProps & { open?: boolean }>(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: DRAWER_WIDTH,
    width: `calc(100% - ${DRAWER_WIDTH}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const MenuButton = styled(IconButton)<IconButtonProps & { open?: boolean }>(
  ({ theme, open }) => ({
    marginRight: theme.spacing(1),
    display: "none",
    [theme.breakpoints.down("md")]: {
      display: open ? "none" : "block",
    },
  })
);

const MainBox = styled(Box)(({ theme }) => ({
  backgroundColor:
    theme.palette.mode === "light"
      ? theme.palette.grey[100]
      : theme.palette.grey[900],
  flexGrow: 1,
  height: "100vh",
  overflow: "auto",
}));

const MainContainer = styled(Container)(({ theme }) => ({
  marginTop: theme.spacing(4),
  marginBottom: theme.spacing(4),
}));

type Props = { children: React.ReactNode; sidebarItems: SidebarItem[] };

const AppLayout = ({ children, sidebarItems }: Props) => {
  const [open, setOpen] = useState(false);
  const toggleDrawer = () => {
    setOpen(!open);
  };

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const isMenuOpen = Boolean(anchorEl);

  const handleProfileMenuOpen = (event: MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const menuId = "account-menu";

  return (
    <FlexBox>
      <CssBaseline />
      <Header position="absolute" open={open}>
        <Toolbar>
          <MenuButton
            open={open}
            edge="start"
            color="inherit"
            aria-label="open drawer"
            onClick={toggleDrawer}
          >
            <MenuIcon />
          </MenuButton>
          <Typography
            component="h1"
            variant="h6"
            color="inherit"
            noWrap
            sx={{ flexGrow: 1 }}
          >
            Barasu
          </Typography>
          <FlexBox>
            <IconButton
              size="large"
              aria-label="show 17 new notifications"
              color="inherit"
            >
              <Badge badgeContent={0} color="error">
                <NotificationsIcon />
              </Badge>
            </IconButton>
            <IconButton
              size="large"
              edge="end"
              aria-label="account of current user"
              aria-controls={menuId}
              aria-haspopup="true"
              onClick={handleProfileMenuOpen}
              color="inherit"
            >
              <AccountCircle />
            </IconButton>
          </FlexBox>
        </Toolbar>
      </Header>
      <Menu
        anchorEl={anchorEl}
        anchorOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        id={menuId}
        keepMounted
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        open={isMenuOpen}
        onClose={handleMenuClose}
      >
        <MenuItem onClick={handleMenuClose}>Profile</MenuItem>
        <MenuItem onClick={handleMenuClose}>My account</MenuItem>
      </Menu>
      <Sidebar open={open} toggleDrawer={toggleDrawer} items={sidebarItems} />
      <MainBox component="main">
        <Toolbar />
        <MainContainer maxWidth="lg">{children}</MainContainer>
      </MainBox>
    </FlexBox>
  );
};

export default AppLayout;
