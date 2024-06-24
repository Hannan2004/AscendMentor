import React from 'react';

const ForgotPassword = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded shadow-md w-96">
        <h2 className="text-3xl font-bold mb-2 text-center">Forgot Password</h2>
        <p className="text-gray-600 mb-6 text-center">Don't worry, we've got you covered!</p>
        <form>
          <div className="mb-4">
            <label className="block text-gray-700">Email</label>
            <input
              type="email"
              className="w-full p-2 border rounded"
              placeholder="Enter your email"
            />
          </div>
          <button
            type="button"
            className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600 focus:outline-none"
          >
            Reset Password
          </button>
        </form>
      </div>
    </div>
  );
};

export default ForgotPassword;
