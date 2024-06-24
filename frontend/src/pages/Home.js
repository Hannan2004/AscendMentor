import React from 'react';

const HomePage = () => {
  return (
    <div className="flex flex-col items-center min-h-screen bg-white">
      <header className="w-full py-4 px-8 bg-white shadow-md flex justify-between items-center">
        <div className="flex items-center">
          <div className="bg-black w-12 h-12"></div>
          <div className="ml-4 text-xl font-bold">EduPath</div>
          <div className="ml-2 text-sm">Slogan</div>
        </div>
        <nav className="flex space-x-6">
          <a href="#home" className="text-black">Home</a>
          <a href="#roadmap" className="text-black">Roadmap</a>
          <a href="#contact" className="text-black">Contact</a>
        </nav>
        <div className="flex items-center">
          <div className="bg-black text-white w-10 h-10 flex items-center justify-center rounded-full">R</div>
          <button className="ml-4 bg-black text-white px-4 py-2 rounded">GET STARTED</button>
        </div>
      </header>

      <main className="flex flex-col items-center mt-20">
        <h1 className="text-4xl font-bold mb-4">Empower Your Local Business</h1>
        <p className="text-center text-lg mb-8">
          My Site offers effective and powerful solutions to enhance your local business operations and growth.
        </p>
        <button className="bg-black text-white px-6 py-3 rounded">GET STARTED</button>
        <div className="mt-16 w-full max-w-2xl bg-gray-900 text-white p-8 rounded-lg">
          <input
            type="text"
            placeholder="Create a flow"
            className="w-full p-3 text-black rounded"
          />
        </div>
      </main>
    </div>
  );
};

export default HomePage;
