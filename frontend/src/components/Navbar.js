import React, { useState } from 'react';

const Navbar = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  return (
    <header className="w-full py-4 px-8 bg-gradient-to-r from-blue-500 to-purple-600 shadow-md flex justify-between items-center">
      <div className="flex items-center">
        <a href="http://localhost:3000/">
          <img src="/logo.png" alt="Logo" className="h-20 w-auto" />
        </a>
      </div>
      <nav className="flex space-x-6">
        <a href="http://localhost:3000/" className="text-white hover:text-gray-200">Home</a>
        <a href="http://localhost:3000/skillbot" className="text-white hover:text-gray-200">Chatbot</a>
        <a href="http://localhost:3000/resume" className="text-white hover:text-gray-200">Resume</a>
        <a href="http://localhost:3000/form" className="text-white hover:text-gray-200">Interview</a>
        <a href="http://localhost:3000/learning" className="text-white hover:text-gray-200">Learn</a>
      </nav>
      <div className="flex items-center relative">
        <div
          className="bg-white text-purple-600 w-10 h-10 flex items-center justify-center rounded-full cursor-pointer"
          onClick={toggleDropdown}
        >
          U
        </div>
        {dropdownOpen && (
          <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-md shadow-lg z-10">
            <a href="http://localhost:3000/profile" className="block px-4 py-2 text-black hover:bg-gray-100">My Profile</a>
            <a href="http://localhost:3000/" className="block px-4 py-2 text-black hover:bg-gray-100">Log Out</a>
          </div>
        )}
        <a href="/login">
          <button className="ml-4 bg-purple-700 text-white px-4 py-2 rounded hover:bg-purple-800 shadow-md">GET STARTED</button>
        </a>
      </div>
    </header>
  );
};

export default Navbar;