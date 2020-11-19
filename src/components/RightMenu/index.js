import React from "react";
import "./RightMenu.css";
//import { Link } from "react-router-dom";
//import * as ROUTES from "../../constants/routes";

function RightMenu() {
  function handleClick(x) {
    console.log(x);
  }
  return (
    <div className="right-container">
      question type
      <div
        className="right-sort-container"
        onClick={() => {
          handleClick(1);
        }}
      >
        <span className="">
          <h2>multiple choice</h2>
        </span>
      </div>
      <div
        className="right-sort-container"
        onClick={() => {
          handleClick(2);
        }}
      >
        <span className="">
          <h2>multiple select</h2>
        </span>
      </div>
      <div
        className="right-sort-container"
        onClick={() => {
          handleClick(3);
        }}
      >
        <span className="">
          <h2>fill in the blank</h2>
        </span>
      </div>
      <div
        className="right-sort-container"
        onClick={() => {
          handleClick(4);
        }}
      >
        <span className="">
          <h2>long answer</h2>
        </span>
      </div>
      sort by tags
    </div>
  );
}

export default RightMenu;
