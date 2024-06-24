import React from 'react';

const Login = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded shadow-md w-96">
        <h2 className="text-3xl font-bold mb-2 text-center">ASCEND MENTOR</h2>
        <p className="text-gray-600 mb-6 text-center">Knowledge is power</p>
        <form>
          <div className="mb-4">
            <label className="block text-gray-700">Email</label>
            <input
              type="email"
              className="w-full p-2 border rounded"
              placeholder="Enter your email"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Password</label>
            <input
              type="password"
              className="w-full p-2 border rounded"
              placeholder="Enter your password"
            />
          </div>
          <div className="mb-4 text-right">
            <a href="#" className="text-blue-500 hover:underline">Forgot Password?</a>
          </div>
          <button
            type="button"
            className="w-full bg-blue-500 text-white p-2 rounded mb-4"
          >
            Login
          </button>
          <button
            type="button"
            className="w-full bg-gray-200 text-gray-700 p-2 rounded mb-4"
          >
            Signup as New User
          </button>
          <button
            type="button"
            className="w-full bg-red-500 text-white p-2 rounded"
          >
            Login with Google
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
