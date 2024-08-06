import React, { useState } from 'react';
import { auth, googleProvider } from '../firebase';
import { signInWithEmailAndPassword, signInWithPopup } from 'firebase/auth';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate('/profile'); // Redirect to the User Dashboard page after successful login
    } catch (error) {
      console.error('Error logging in:', error);
      setError('Failed to log in.');
      setMessage('');
    }
  };

  const handleGoogleLogin = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
      navigate('/profile'); // Redirect to the User Dashboard page after Google login
    } catch (error) {
      console.error('Error logging in with Google:', error);
      setError('Failed to log in with Google.');
      setMessage('');
    }
  };

  return (
    <div className="bg-gradient-to-r from-blue-500 to-purple-600 min-h-screen flex flex-col justify-center items-center">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md border border-gray-300">
        <h2 className="text-4xl font-bold mb-4 text-center text-gray-800">Login</h2>
        <p className="text-gray-600 mb-6 text-center text-lg">Welcome back! Please login to your account.</p>
        <form onSubmit={handleLogin} className="space-y-4">
          <div className="mb-4">
            <label className="block text-gray-700 text-lg">Email</label>
            <motion.input
              type="email"
              className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300 ease-in-out"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              whileFocus={{ scale: 1.05 }}
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-lg">Password</label>
            <motion.input
              type="password"
              className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300 ease-in-out"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              whileFocus={{ scale: 1.05 }}
            />
          </div>
          <motion.button
            type="submit"
            className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white p-3 rounded-lg mb-4 hover:from-blue-700 hover:to-purple-700 focus:outline-none transition-all duration-300 ease-in-out"
            whileHover={{ scale: 1.05 }}
          >
            Login
          </motion.button>
          <motion.button
            type="button"
            className="w-full bg-red-500 text-white p-3 rounded-lg mb-4 hover:bg-red-600 focus:outline-none transition-all duration-300 ease-in-out"
            whileHover={{ scale: 1.05 }}
            onClick={handleGoogleLogin}
          >
            Login with Google
          </motion.button>
          <motion.button
            type="button"
            className="w-full bg-green-500 text-white p-3 rounded-lg mb-4 hover:bg-green-600 focus:outline-none transition-all duration-300 ease-in-out"
            whileHover={{ scale: 1.05 }}
            onClick={() => navigate('/register')}
          >
            Register
          </motion.button>
          <div className="text-center">
            <p className="text-gray-600">
              <a href="#" className="text-blue-500 hover:underline" onClick={() => navigate('/changepassword')}>Forgot Password?</a>
            </p>
          </div>
          {message && <p className="text-green-500 text-center">{message}</p>}
          {error && <p className="text-red-500 text-center">{error}</p>}
        </form>
      </div>
    </div>
  );
};

export default Login;