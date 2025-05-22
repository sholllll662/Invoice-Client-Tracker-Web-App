import React from "react";
import { Link } from "react-router";

const Navbar = () => {
  return (
    <nav className="flex justify-between items-center p-4 shadow-md bg-white">
      <div className="text-xl font-bold text-blue-600">Invoice Tracker</div>
      <div className="flex gap-6 text-sm font-medium">
        <a
          href="#home"
          className="hover:text-blue-600 cursor-pointer content-center"
        >
          Home
        </a>
        <a
          href="#features"
          className="hover:text-blue-600 cursor-pointer content-center"
        >
          Features
        </a>
        <a
          href="#about"
          className="hover:text-blue-600 cursor-pointer content-center"
        >
          About
        </a>
        <Link
          to="/login"
          className="bg-blue-600 text-white px-4 py-1.5 rounded hover:bg-blue-700 cursor-pointer"
        >
          Get Started
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
