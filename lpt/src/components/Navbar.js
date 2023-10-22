import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {

  return (
    <>
    <div className="navbar">
      <ul> 
        <span>LeetTrack</span><li><Link to="/">Sign Out</Link></li>
        <li><Link to="/settings">User Settings</Link></li>
        <li><Link to="/view">View</Link></li>
        <li><Link to="/solve">Solve</Link></li>
      </ul>
    </div>
    </>
  );
};

export default Navbar;
