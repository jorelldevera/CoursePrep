import React, { useState, useEffect } from "react";
import { AuthUserContext } from "../Session";
import * as ROUTES from "../../constants/routes";
import Button from "@material-ui/core/Button";
import "./topbar.css";
import LoginButton from "../LoginButton";
import SignUpButton from "../SignUpButton";
import SignOutButton from "../SignOut";
import firebase from "firebase";

const TopBar = () => (
  <div>
    <AuthUserContext.Consumer>
      {(authUser) => (authUser ? <TopBarAuth /> : <TopBarNonAuth />)}
    </AuthUserContext.Consumer>
  </div>
);

const TopBarAuth = () => {
  const [username, setUsername] = useState([]);
  const [userID, setUserID] = useState([]);
  useEffect(() => {
    setUserID(firebase.auth().W);
    firebase
      .database()
      .ref("user_test/" + userID)
      .once("value")
      .then(function (snapshot) {
        console.log(snapshot.val());
        setUsername(snapshot.val().username);
      });
  });

  return (
    <div className="top-bar-container">
      <div className="top-bar-left">
        <h1>CoursePrep</h1>
      </div>
      <div className="top-bar-center"></div>
      <div className="top-bar-right">
        {username}
        <SignOutButton />
      </div>
    </div>
  );
};

const TopBarNonAuth = () => {
  return (
    <div className="top-bar-container">
      <div className="top-bar-left">
        <h1>CoursePrep</h1>
      </div>
      <div className="top-bar-center"></div>
      <div className="top-bar-right">
        <LoginButton />
        <SignUpButton />
      </div>
    </div>
  );
};

export default TopBar;
