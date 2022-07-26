import React, { Component, Props } from "react";

import { NavigationBar } from "../components/navigation";
import { LogoutUserPage } from "../features/auth/userLogout";

class Logout extends Component<any, any> {
  render(): React.ReactNode {
    return <>
      <LogoutUserPage />
    </>
  }
}

export default Logout;