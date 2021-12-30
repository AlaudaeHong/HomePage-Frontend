import React, { Component } from "react";

import Container from '@mui/material/Container';

import { NavigationBar } from '../components/navigation'

class Home extends Component {
  render() {
    return (
      <div
        className="background_image"
        style={{
          height: "100vh",
          backgroundPosition: "50% 0%" /* Center the image */,
          backgroundImage: "url(/imgs/banner.jpg)",
          backgroundRepeat: "no-repeat",
          backgroundSize:
            "cover" /* Resize the background image to cover the entire container */,
        }}
      >
        <NavigationBar />
      </div >
    );
  }
}

export default Home;