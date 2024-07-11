import React from 'react';

const HomePage = () => {
  return (
    <div className="flex flex-col items-center min-h-screen bg-white">
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
