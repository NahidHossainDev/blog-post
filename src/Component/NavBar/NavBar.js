import { AppBar, Avatar, IconButton } from '@material-ui/core';
import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import PersonIcon from "@material-ui/icons/Person";
import HomeIcon from "@material-ui/icons/Home";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import "./NavBar.css";
import { ContextElement } from '../../App';
import { useLocation } from "react-router-dom";

function HeaderView() {
 
}
const NavBar = () => {

  const location = useLocation();
  console.log(location.pathname);
  
  const [myUserId] = useContext(ContextElement);
  return (
    <nav>
      <Link to="/home">
        <li className={location.pathname === "/home" && "active"}>
          <HomeIcon /> Home
        </li>
      </Link>
      <Link to={`/profilePage/${myUserId}`}>
        <li
          className={
            location.pathname === `/profilePage/${myUserId}` && "active"
          }
        >
          <AccountCircleIcon /> My Profile
        </li>
      </Link>
      <Link to="/all-users">
        <li className={location.pathname === "/all-users" && "active"}>
          <PersonIcon /> All Users
        </li>
      </Link>
    </nav>
  );
};

export default NavBar;