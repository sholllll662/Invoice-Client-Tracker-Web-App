import React from "react";

const SideBar = () => {
  return (
    <aside className="w-64 bg-gray-700 text-white p-6">
      <h2 className="text-2xl font-bold mb-8">FreelanceTrack</h2>
      <nav className="space-y-4">
        <button className="block w-full text-left">Dashboard</button>
        <button className="block w-full text-left">Clients</button>
        <button className="block w-full text-left">Invoice</button>
      </nav>
    </aside>
  );
};

export default SideBar;
