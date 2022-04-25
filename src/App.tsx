import React, { useEffect } from 'react';
import './App.css';

import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";

import Home from "./staticPages/home"
import About from "./staticPages/about"
import { useAppDispatch, useAppSelector } from './store/hooks';
import { fetchAuthUser, resetCheckByTime, selectAuthStatus, selectUser } from './features/auth/authSlice';

function App() {

  const dispatch = useAppDispatch();
  const user = useAppSelector(selectUser);
  const authStatus = useAppSelector(selectAuthStatus);

  let loggedIn = false;

  if (user && user.userId !== "") {
    loggedIn = true;
  }

  useEffect(() => {
    if (authStatus === "idle") dispatch(fetchAuthUser());
  }, [authStatus, dispatch]);

  if (authStatus === "loaded") {
    if (user.userId !== null) {
      loggedIn = true;
    }

    dispatch(resetCheckByTime());
  }

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
