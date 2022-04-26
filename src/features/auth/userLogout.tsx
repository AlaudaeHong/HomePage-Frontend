import { useEffect } from "react";

import { logoutAuthUser, selectAuthStatus } from "./authSlice"
import { useAppDispatch, useAppSelector } from '../../store/hooks';

import { Avatar, Button, Card, CardContent, Checkbox, Container, FormControlLabel, Paper, TextField, Typography } from "@mui/material"
import { Navigate } from "react-router-dom";

// Page to sent DELETE and wait response
export const LogoutUserPage = () => {
  const dispatch = useAppDispatch();
  const authStatus = useAppSelector(selectAuthStatus);

  let content;

  useEffect(() => {
    dispatch(logoutAuthUser());
  }, [authStatus, dispatch]);

  // Once finished the logout
  if (authStatus === "idle") {
    content = <Navigate to="/" />;
  } else {
    content = <Typography>Logging out</Typography>;
  }

  return (
    <>
      <Card>
        <CardContent>
          {content}
        </CardContent>
      </Card>
    </>);
};