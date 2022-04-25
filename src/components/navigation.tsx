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
  Button
} from '@mui/material';

const naviTags = {
  "Home": "/",
  "About Me": "/about",
  "Files": "/"
}

export const NavigationBar = () => {
  // const user = useSelector((state) => state.auth.user);
  // const authStatus = useSelector((state) => state.auth.status);

  // const [authurl, setAuthurl] = useState("");
  // const [username, setUsername] = useState("");
  // const [authaction, setAuthAction] = useState("");

  var moreOptions = <></>;

  // useEffect(() => {
  //     if (authStatus === "loaded") {
  //         if (user.userId === null) {
  //             setUsername("Guest");
  //             setAuthurl("/login");
  //             setAuthAction("Log in");
  //         } else {
  //             setUsername(user.username);
  //             setAuthurl("/logout");
  //             setAuthAction("Log out");
  //         }
  //     }
  // }, [authStatus, user]);

  // if (username !== "Guest") {
  //     moreOptions = <Dropdown.Item href="/setting">Setting</Dropdown.Item>;
  // }

  const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);

  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  return (
    <div style={{ marginBottom: "15px" }}>
      <div>
        <Alert severity="info">
          A React.JS & Express.JS Project By Yun Hong. This website
          self-maintained
        </Alert>
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
              Welcome to Yun Hong's Space
            </Typography>
            <Box sx={{ flexGrow: 1 }}>
              <nav>
                {Object.entries(naviTags).map(([tag, link]) =>
                  <Link variant="button"
                    key={tag}
                    color="inherit"
                    underline='none'
                    href={link}
                    sx={{ my: 1, mx: 1.5 }}
                  >
                    {tag}
                  </Link>
                )}
              </nav>
            </Box>
            <Box sx={{ flexGrow: 0, mr: 2 }}>
              <Button variant="text"
                onClick={handleOpenUserMenu}
                color="inherit"
              >
                Hello Guest
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
                    href="/"
                    underline='none'
                    sx={{ my: 1, mx: 1.5 }}
                  >
                    Login
                  </Link>
                </MenuItem>
              </Menu>
            </Box>
          </Toolbar>

        </AppBar>
      </div>
    </div >
  );
};