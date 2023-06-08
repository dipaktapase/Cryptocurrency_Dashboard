import React from "react";
import logo from "../assets/logo.png"

const Navbar = () => {
  return (
    <div className="pl-12 md:pl-20 m-0 py-2 border shadow-lg">
      <img src={logo} alt="logo" height="20%" className="h-8" />
    </div>
  );
};

export default Navbar;
