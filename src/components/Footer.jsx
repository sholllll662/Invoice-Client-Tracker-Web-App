import React from "react";

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-gray-300 py-8 px-6">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
        <div className="text-lg font-bold text-white">Invoice Tracker</div>

        <p className="text-xs text-gray-400">
          © {new Date().getFullYear()} Invoice Tracker. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
