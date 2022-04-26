import React, { Component, Props } from "react";

import { NavigationBar } from "../components/navigation";
import { LoginUserPage } from "../features/auth/userLogin";

class Login extends Component<any, any> {
  render(): React.ReactNode {
    return <>
      <NavigationBar />
      <LoginUserPage />
    </>
  }
}

export default Login;