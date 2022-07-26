import React, { useEffect, useState } from "react";

import {
  Box,
  AppBar,
  Alert,
  Toolbar,
  Typography,
  Link,
  Menu,
  MenuItem,
  Button,
  Switch,
} from '@mui/material';

import { useAppSelector, useAppDispatch } from "../store/hooks"

import { selectAuthStatus, selectUser } from "../features/auth/authSlice"
import { selectUserIfOtaku, setOtakuTheme, unsetOtakuTheme } from "../features/user/userSlice";

const naviTags = {
  "Home": "",
  "About Me": "about",
  "Files": ""
}

export const NavigationBar = () => {
  const user = useAppSelector(selectUser);
  const authStatus = useAppSelector(selectAuthStatus);
  const userIfOtaku = useAppSelector(selectUserIfOtaku);

  const [authurl, setAuthurl] = useState("");
  const [username, setUsername] = useState("");
  const [authaction, setAuthAction] = useState("");
  const [rootPath, setRootPath] = useState("/");
  const [ifOtaku, setIfOtaku] = useState(true);
  const [header, setHeader] = useState("Welcome to Yun Hong's Space");

  const dispatch = useAppDispatch();

  useEffect(() => {
    if (authStatus === "loaded") {
      if (!user.userId || user.userId === "") {
        setUsername("Guest");
        setAuthurl("/login");
        setAuthAction("Log in");
      } else {
        setUsername(user.username);
        setAuthurl("/logout");
        setAuthAction("Log out");
      }
    }

    if (userIfOtaku === "true") {
      setRootPath("/");
      setHeader("Alaudae Hong!?");
      setIfOtaku(true);
    } else {
      setRootPath("/");
      setHeader("Welcome to Yun Hong's Space");
      setIfOtaku(false);
    }

  }, [authStatus, user, userIfOtaku]);

  const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);

  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleSwitchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (ifOtaku) {
      setIfOtaku(false);
      dispatch(unsetOtakuTheme());
    }
    else {
      setIfOtaku(true);
      dispatch(setOtakuTheme());
    }
  }

  return (
    <div>
      <AppBar position="fixed"
        color="primary"
        elevation={0}
        sx={{ borderBottom: (theme) => `1px solid ${theme.palette.divider}` }}
      >
        <Toolbar disableGutters>
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ ml: 2, mr: 2 }}
          >
            {header}
          </Typography>
          <Box sx={{ flexGrow: 1 }}>
            <nav>
              {Object.entries(naviTags).map(([tag, link]) =>
                <Link variant="button"
                  key={tag}
                  color="inherit"
                  underline='none'
                  href={rootPath + link}
                  sx={{ my: 1, mx: 1.5 }}
                >
                  {tag}
                </Link>
              )}
            </nav>
          </Box>
          <Box sx={{ flexGrow: 0, mr: 2 }}>
            <Switch
              name="otaku-switch"
              color="default"
              inputProps={{ 'aria-label': 'checkbox with default color' }}
              checked={ifOtaku}
              onChange={handleSwitchChange}
            />
            <Button variant="text"
              onClick={handleOpenUserMenu}
              color="inherit"
            >
              Hello {username}
            </Button>
            <Menu
              sx={{ mt: '45px' }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              <MenuItem>
                <Link variant="button"
                  color="text.primary"
                  href={authurl}
                  underline='none'
                  sx={{ my: 1, mx: 1.5 }}
                >
                  {authaction}
                </Link>
              </MenuItem>
            </Menu>
          </Box>
        </Toolbar>
      </AppBar>
      <Toolbar />
    </div>
  );
};