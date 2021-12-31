import React from 'react';
import './App.css';

import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";

import Home from "./static_page/home"
import About from "./static_page/about"


function App() {
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
