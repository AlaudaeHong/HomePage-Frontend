import React, { useState } from "react";

import { loginAuthUser } from "./authSlice"
import { useAppDispatch } from '../../store/hooks';

import { Avatar, Button, Container, TextField, Typography } from "@mui/material"
import { Box } from "@mui/system";
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';

export const LoginUserPage = () => {
  /* Local stored state */
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  /* Globally stored state */
  const dispatch = useAppDispatch();

  /*
      Update field input change
      https://stackoverflow.com/questions/42081549/typescript-react-event-types
   */
  const onUsernameChanged = (e: React.ChangeEvent<HTMLInputElement>) => setUsername(e.target.value);
  const onPasswordChanged = (e: React.ChangeEvent<HTMLInputElement>) => setPassword(e.target.value);

  const onLoginClicked = async () => {
    try {
      console.log({ userId: "", username: username, password: password })
      await dispatch(loginAuthUser({ userId: "", username: username, password: password }));
    } catch (err) {
      console.error("Failed to login: ", err);
    }
  };

  console.log({username, password});

  return (
    /*
    Borrowed from 
    https://github.com/Semantic-Org/Semantic-UI-React/blob/master/docs/src/layouts/LoginLayout.js
    */
    <div>
      <Container>
        <Box sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}>
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <Box component="form"  noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="username"
              label="User Name"
              name="username"
              autoComplete="username"
              autoFocus
              onChange={onUsernameChanged}
              value={username}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              onChange={onPasswordChanged}
              value={password}
            />
            <Button
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              onClick={onLoginClicked}
            >
              Sign In
            </Button>
          </Box>
        </Box>
      </Container>
    </div>
  );
};