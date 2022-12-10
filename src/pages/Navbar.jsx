import React from "react";

const Navbar = () => {
  return (
    <div
      className="flex
     bg-blue-400 p-6 mb-5 justify-between "
    >
      <input className="p-1 rounded-lg" placeholder="Search..." />

      <div className="p-1">
        <a href="/#" className="p-1 ml-20 mr-2 bg-white rounded-md">
          Chat
        </a>
        <a href="/#" className="p-1  bg-white rounded-md">
          Bantuan
        </a>
      </div>
    </div>
  );
};

export default Navbar;
