import React from "react";
import { Link } from "react-router-dom";
import "../styles/home-style.css";

export default function Home() {
  return (
    <div>
      <p id="head" className="header">
        Welcome to Weather Digit
      </p>
      <Link to="search">
        <button className="continue">Continue</button>
      </Link>

      <div className="light x1"></div>
      <div className="light x2"></div>
      <div className="light x3"></div>
      <div className="light x4"></div>
      <div className="light x5"></div>
      <div className="light x6"></div>
      <div className="light x7"></div>
      <div className="light x8"></div>
      <div className="light x9"></div>
    </div>
  );
}
