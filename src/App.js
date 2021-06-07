import React, { createContext, useState } from "react";
import "./App.css";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import HomePage from "./Component/Pages/Home/Home";
import NavBar from "./Component/NavBar/NavBar"
import AppHeader from "./Component/AppHeader";
import PostDetail from "./Component/Pages/PostDetail/PostDetail";
import ProfilePage from "./Component/Pages/ProfilePage/ProfilePage";
import UserDetail from "./Component/Pages/UserDetail/UserDetail";

export const ContextElement = createContext();

function App() {
  const myUserId = "2";

  return (
    <ContextElement.Provider value={[myUserId]}>
      <Router>
        <AppHeader />
        <div className="container mt-5 d-flex">
          <div className="col-md-3">
            <NavBar />
          </div>
          <div className="col-md-9">
            <Switch>
              <Route path="/home">
                <HomePage />
              </Route>
              <Route path="/all-users">
                <UserDetail />
              </Route>
              <Route path="/postDetail/:id">
                <PostDetail />
              </Route>
              <Route path="/profilePage/:id">
                <ProfilePage />
              </Route>
              <Route exact path="/">
                <HomePage />
              </Route>
            </Switch>
          </div>
        </div>
      </Router>
    </ContextElement.Provider>
  );
}

export default App;
