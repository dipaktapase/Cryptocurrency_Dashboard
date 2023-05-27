import React from "react";
import logo from "../assets/logo.png"

const Navbar = () => {
  return (
    <div className="ml-20 m-4 p-4">
      <img src={logo} alt="logo" height="20%" className="h-8" />
    </div>
  );
};

export default Navbar;
