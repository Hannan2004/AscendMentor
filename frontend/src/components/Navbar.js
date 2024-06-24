import React from 'react';

const Navbar = () => {
  return (
    <nav className="bg-transparent shadow-lg">
      <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">
        <div className="relative flex items-center justify-between h-16">
          <div className="absolute inset-y-0 left-0 flex items-center">
            <img
              className="block h-8 w-auto"
              src="https://tailwindui.com/img/logos/workflow-mark-indigo-500.svg"
              alt="Workflow"
            />
          </div>
          <div className="flex-1 flex items-center justify-end sm:items-stretch sm:justify-end">
            <div className="hidden sm:block sm:ml-6">
              <div className="flex space-x-4">
                <a
                  href="#"
                  className="text-black hover:bg-gray-800 hover:bg-opacity-50 hover:backdrop-blur px-3 py-2 rounded-md text-sm font-medium"
                >
                  Home
                </a>
                <a
                  href="#"
                  className="text-black hover:bg-gray-800 hover:bg-opacity-50 hover:backdrop-blur px-3 py-2 rounded-md text-sm font-medium"
                >
                  Courses
                </a>
                <a
                  href="#"
                  className="text-black hover:bg-gray-800 hover:bg-opacity-50 hover:backdrop-blur px-3 py-2 rounded-md text-sm font-medium"
                >
                  Road Map
                </a>
                <a
                  href="#"
                  className="text-black hover:bg-gray-800 hover:bg-opacity-50 hover:backdrop-blur px-3 py-2 rounded-md text-sm font-medium"
                >
                  My Profile
                </a>
              </div>
            </div>
          </div>
          <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
            <button
              type="button"
              className="text-black hover:bg-gray-800 hover:bg-opacity-50 hover:backdrop-blur px-3 py-2 rounded-md text-sm font-medium"
            >
              Log In
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

