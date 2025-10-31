import React from "react";
import { Link } from "react-router";

const Navbar = () => {
  return (
    <nav className="flex justify-between items-center p-4 shadow-md">
      <div className="text-xl font-bold text-lime-500">Finance Tracker</div>
      <div className="flex gap-6 text-sm font-medium">
        <Link
          to="/login"
          className="bg-lime-500 text-gray px-4 py-1.5 rounded hover:bg-green-500 cursor-pointer"
        >
          Get Started
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
