import React, { Component, Props } from "react";

import {
  Typography,
  Paper,
  Container,
  Grid,
  MenuList,
  MenuItem
} from '@mui/material';

import ReactMarkdown from "react-markdown";
import remarkGfm from 'remark-gfm'

import { NavigationBar } from "../components/navigation";
import { Box } from "@mui/system";

class StudentBio extends Component<any, any> {
  constructor(props: any) {
    super(props);
    this.state = {
      content: ""
    }
  }

  componentDidMount() {
    fetch(process.env.PUBLIC_URL + "/about/bio_student.md")
      .then((r) => r.text())
      .then((text) => this.setState({ content: text }));

  }

  render() {
    return <>
      <ReactMarkdown children={this.state.content} remarkPlugins={[remarkGfm]} />
    </>
  }
}

function Resume() {
  return (
    <>
      <Typography
        variant="h4"
        noWrap
        component="div"
        sx={{ ml: 2, mr: 2 }}
      >Resume</Typography>
      <img src={process.env.PUBLIC_URL + '/about/Resume.jpg'} alt="My Resume" width="100%" />
    </>
  );
}

const tabs: { [key: string]: { name: string; component: any } } = {
  "resume": {
    name: "Resume",
    component: <Resume />
  },
  "studentLife": {
    name: "Student Life",
    component: <StudentBio />
  },
}

class About extends Component<{}, { activeItem: string }> {

  handleItemClick = (e: any, name: any) => this.setState({ activeItem: name });

  constructor(props: any) {
    super(props);
    this.state = { activeItem: "resume" };

    this.handleItemClick = this.handleItemClick.bind(this);
  }

  render() {
    return (
      <div
        className="background_image"
        style={{
          minHeight: "100vh",
          backgroundPosition: "50% 0%" /* Center the image */,
          backgroundImage: "url(/imgs/banner.jpg)",
          backgroundRepeat: "no-repeat",
          backgroundAttachment: "fixed",
          backgroundSize:
            "cover" /* Resize the background image to cover the entire container */,
        }}
      >
        <NavigationBar />
        <Container>
          <Grid container spacing={0}>
            <Grid item xs={10}>
              <Paper sx={{ margin: 2, backgroundColor: "rgba(170, 170, 170, 0.7)" }}>
                <Box sx={{ margin: 2 }}>
                  {tabs[this.state.activeItem].component}
                </Box>
              </Paper>
            </Grid>
            <Grid item xs={2}>
              <Paper sx={{ margin: 2, backgroundColor: "rgba(170, 170, 170, 0.7)" }}>
                <MenuList>
                  {Object.entries(tabs).map(([id, { name, component }]) =>
                    <MenuItem
                      onClick={(event) => this.handleItemClick(event, id)}
                    >
                      {name}
                    </MenuItem>
                  )}
                </MenuList>
              </Paper>
            </Grid>
          </Grid>
        </Container>
      </div>
    );
  }
}



export default About;