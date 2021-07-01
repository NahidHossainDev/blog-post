import React from 'react';
import { AppBar, Avatar } from "@material-ui/core";
import NavDrawer from "./NavBar/NavDrawer"
const AppHeader = () => {
  return (
    <AppBar>
      <div className="container-xl">
        <div className="d-flex justify-content-between py-2">
          <NavDrawer id="mobile-menu-icon" />
          <h5>Blog Post App</h5>
          <Avatar className="avatar">B</Avatar>
        </div>
      </div>
    </AppBar>
  );
};

export default AppHeader;