import React, { useState } from 'react';
import { auth, googleProvider } from '../firebase';
import { signInWithEmailAndPassword, signInWithPopup } from 'firebase/auth';
import { motion } from 'framer-motion';
import { Slide } from 'react-awesome-reveal';
import { Link, useNavigate } from 'react-router-dom';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();  // Hook for navigation

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      // Sign in the user with email and password
      await signInWithEmailAndPassword(auth, email, password);
      setMessage('Login successful!');
      setError('');
      navigate('/dashboard');  // Navigate to the User Dashboard page
    } catch (error) {
      console.error('Error logging in:', error);
      setError('Invalid email or password.');
      setMessage('');
    }
  };

  const handleGoogleLogin = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
      setMessage('Logged in with Google!');
      setError('');
      navigate('/dashboard');  // Navigate to the User Dashboard page
    } catch (error) {
      console.error('Error logging in with Google:', error);
      setError('Failed to log in with Google.');
      setMessage('');
    }
  };

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-700 overflow-hidden">
      {/* Background Animation */}
      <div className="absolute inset-0 bg-no-repeat bg-cover" style={{ backgroundImage: 'url(https://www.transparenttextures.com/patterns/stardust.png)' }}></div>
      <div className="absolute inset-0 bg-[rgba(0,0,0,0.6)]"></div>
      <div className="relative flex items-center justify-center min-h-screen p-4">
        <motion.div
          className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md border border-gray-300 overflow-hidden z-10"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Slide direction="up" duration={500}>
            <h2 className="text-4xl font-bold mb-4 text-center text-gray-800">ASCEND MENTOR</h2>
            <p className="text-gray-600 mb-6 text-center text-lg">Welcome back! Please log in to continue.</p>
            <form onSubmit={handleLogin} className="space-y-5">
              <div>
                <label className="block text-gray-700 text-lg mb-2">Email</label>
                <motion.input
                  type="email"
                  className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300 ease-in-out"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  whileFocus={{ scale: 1.05 }}
                />
              </div>
              <div>
                <label className="block text-gray-700 text-lg mb-2">Password</label>
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
                className="w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white p-3 rounded-lg mb-4 hover:from-blue-600 hover:to-purple-700 focus:outline-none transition-all duration-300 ease-in-out"
                whileHover={{ scale: 1.05 }}
              >
                Log In
              </motion.button>
              <motion.button
                type="button"
                className="w-full bg-red-500 text-white p-3 rounded-lg mb-4 hover:bg-red-600 focus:outline-none transition-all duration-300 ease-in-out"
                onClick={handleGoogleLogin}
                whileHover={{ scale: 1.05 }}
              >
                Log In with Google
              </motion.button>
              <div className="flex flex-col gap-4">
                <Link to="/register">
                  <motion.div
                    className="bg-green-500 text-white p-3 rounded-lg text-center hover:bg-green-600 focus:outline-none transition-all duration-300 ease-in-out"
                    whileHover={{ scale: 1.05 }}
                  >
                    New Register
                  </motion.div>
                </Link>
                <Link to="/forgotpassword" className="text-indigo-600 text-center block">Forgot your password?</Link>
              </div>
              {message && (
                <motion.p
                  className="text-green-600 text-center mt-4"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  {message}
                </motion.p>
              )}
              {error && (
                <motion.p
                  className="text-red-600 text-center mt-4"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  {error}
                </motion.p>
              )}
            </form>
          </Slide>
        </motion.div>
      </div>
    </div>
  );
};

export default Login;
