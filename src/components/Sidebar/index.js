import React from "react";
import "./Sidebar.css";
import { Link } from "react-router-dom";
import * as ROUTES from "../../constants/routes";
function Sidebar() {
  function handleClick() {}
  return (
    <div className="sidebar-container">
      this is the left menu
      <Link to={ROUTES.DASH}>
        <div
          className="dash-card-container"
          onClick={() => {
            handleClick();
          }}
        >
          <span className="">
            <h2>dash board</h2>
          </span>
        </div>
      </Link>
      <div className="my-quizzes"></div>
      <div className="course-quizzes"></div>
    </div>
  );
}

export default Sidebar;
