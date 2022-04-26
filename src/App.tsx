import React, { useEffect } from 'react';
import './App.css';

import {
  BrowserRouter,
  Routes,
  Route,
  Navigate
} from "react-router-dom";

import Home from "./staticPages/home"
import About from "./staticPages/about"
import { useAppDispatch, useAppSelector } from './store/hooks';
import { fetchAuthUser, resetCheckByTime, selectAuthStatus, selectUser } from './features/auth/authSlice';
import Login from './staticPages/login';

function App() {

  const dispatch = useAppDispatch();
  const user = useAppSelector(selectUser);
  const authStatus = useAppSelector(selectAuthStatus);

  let loggedIn = false;

  if (user && user.userId !== "" && user.userId !== null) {
    loggedIn = true;
  }

  useEffect(() => {
    if (authStatus === "idle") dispatch(fetchAuthUser());
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
    <div className="App" style={{
      minHeight: "100vh",
      backgroundPosition: "50% 0%" /* Center the image */,
      backgroundImage: "url(/imgs/banner.jpg)",
      backgroundRepeat: "no-repeat",
      backgroundAttachment: "fixed",
      backgroundSize:
        "cover" /* Resize the background image to cover the entire container */,
    }}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/login" element={loggedIn ? <Navigate to="/" /> : <Login />} />
          {/* <Route path="/login" element={<Login />} /> */}
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
