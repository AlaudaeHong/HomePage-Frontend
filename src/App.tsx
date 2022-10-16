import React, { useEffect } from 'react';
import './App.css';

import {
  BrowserRouter,
  Routes,
  Route,
  Navigate
} from "react-router-dom";

import Home from "./pages/home"
import About from "./pages/about"
import { useAppDispatch, useAppSelector } from './store/hooks';
import { fetchAuthUser, resetCheckByTime, selectAuthStatus, selectUser } from './features/auth/authSlice';
import Login from './pages/login';
import Logout from './pages/logout';
import HomeOtaku from './pages/home-otaku';
import { fetchUserSetting, selectUserIfOtaku } from './features/user/userSlice';
import { FileListPage } from './features/file/fileListPage';

function App() {

  const dispatch = useAppDispatch();
  const user = useAppSelector(selectUser);
  const authStatus = useAppSelector(selectAuthStatus);
  const userIfOtaku = useAppSelector(selectUserIfOtaku);

  let loggedIn = false;

  if (user && user.userId !== "" && user.userId !== null) {
    loggedIn = true;
  }

  useEffect(() => {
    if (authStatus === "idle") dispatch(fetchAuthUser());
    dispatch(fetchUserSetting());
  }, [authStatus, dispatch]);

  if (authStatus === "loaded") {
    if (user.userId !== null && user.userId !== "") {
      loggedIn = true;
    }

    dispatch(resetCheckByTime());
  }

  console.log(loggedIn);
  console.log(user);

  return (

    <BrowserRouter>
      <Routes>
        <Route path="/" element={userIfOtaku === "false" ? <Home /> : <HomeOtaku />}>
          <Route path="about" element={<About />} />
          <Route path="login" element={loggedIn ? <Navigate to="/" /> : <Login />} />
          <Route path='logout' element={<Logout />} />
          <Route path="file" element={<FileListPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
