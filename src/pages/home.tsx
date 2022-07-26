import React, { Component } from "react";

import Container from '@mui/material/Container';

import { NavigationBar } from '../components/navigation'
import { Outlet } from "react-router-dom";

class Home extends Component {

  componentDidMount(): void {
  }

  render() {
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
        <NavigationBar />
        <Outlet />
      </div >
    );
  }
}

export default Home;