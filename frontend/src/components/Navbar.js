import React from 'react';


const Navbar = () => {
  return (
    <header className="w-full py-4 px-8 bg-white shadow-md flex justify-between items-center">
      <div className="flex items-center">
      <div>
      <img src="/logo.png" alt="Logo" className="h-20 w-37" />
      </div>
      </div>
      <nav className="flex space-x-6">
        <a href="http://localhost:3000/" className="text-black">Home</a>
        <a href="http://localhost:3000/skillbot" className="text-black">Chatbot</a>
        <a href="http://localhost:3000/resume" className="text-black">Resume</a>
        <a href="http://localhost:3000/form" className="text-black">Interview</a>
        <a href="http://localhost:3000/learning" className="text-black">Learn</a>
      </nav>
      <div className="flex items-center">
        <div className="bg-black text-white w-10 h-10 flex items-center justify-center rounded-full">R</div>
        <a href="/login">
            <button className="ml-4 bg-black text-white px-4 py-2 rounded">GET STARTED</button>
        </a>
      </div>
    </header>
  );
};

export default Navbar;