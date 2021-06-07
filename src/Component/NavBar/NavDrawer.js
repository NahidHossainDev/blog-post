import React from "react";
import Drawer from "@material-ui/core/Drawer";
import Button from "@material-ui/core/Button";
import MenuIcon from "@material-ui/icons/Menu";
import { useState } from "react";
import NavBar from "./NavBar";

export default function TemporaryDrawer() {
  const [showDrawer, setShowDrawer] = useState(false);
  const toggleDrawer = (open) => (event) => {
    setShowDrawer({ left: open });
    };
    
  return (
    <div className="mobile-menu">
      <Button onClick={toggleDrawer(true)} className="mobile-menu-btn">
        <MenuIcon style={{color:'white'}} />
      </Button>
      <Drawer
        className="drawer"
        anchor={"left"}
        open={showDrawer["left"]}
        onClose={toggleDrawer(false)}
      >
        <div onClick={toggleDrawer(false)}>
          <NavBar/>
        </div>
      </Drawer>
    </div>
  );
}
