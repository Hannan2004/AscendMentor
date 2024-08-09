import React, { useState } from 'react';
import { getAuth, sendPasswordResetEmail } from 'firebase/auth';
import { db } from '../firebase';
import { collection, addDoc, Timestamp } from 'firebase/firestore';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleResetPassword = async (e) => {
    e.preventDefault();

    if (!email) {
      setError('Please enter your email.');
      return;
    }

    const auth = getAuth();
    try {
      await sendPasswordResetEmail(auth, email);

      // Add request details to Firestore
      await addDoc(collection(db, 'passwordResetRequests'), {
        email,
        timestamp: Timestamp.fromDate(new Date())
      });

      setMessage('Password reset email sent. Check your Email!');
      setError('');
      setEmail('');

    } catch (err) {
      console.error('Error sending password reset email:', err);
      if (err.code === 'auth/invalid-email') {
        setError('Invalid email address.');
      } else if (err.code === 'auth/user-not-found') {
        setError('No user found with this email.');
      } else if (err.code === 'auth/missing-email') {
        setError('Please enter your email.');
      } else {
        setError('Password reset email sent. Check your Email!');
      }
      setMessage('');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-100 to-blue-300 flex items-center justify-center p-6">
      <motion.div
        className="bg-white shadow-lg rounded-lg overflow-hidden w-full max-w-md border border-gray-200"
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        <div className="relative w-full h-48 bg-gradient-to-r from-blue-500 to-blue-700">
          <div className="absolute inset-0 flex items-center justify-center">
            <h2 className="text-3xl font-bold text-white">Forgot Password</h2>
          </div>
        </div>
        <div className="p-6 space-y-6">
          <div className="text-center">
            <p className="text-lg text-indigo-600 mb-4">Enter your email to reset your password</p>
            {message && (
              <motion.div
                className="flex items-center justify-center space-x-2 p-4 bg-blue-100 text-blue-600 rounded-md border border-blue-300"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
              >
                <span className="text-2xl">🚀</span>
                <p>{message}</p>
              </motion.div>
            )}
            {error && <p className="text-red-600 text-center mt-4">{error}</p>}
          </div>
          <form onSubmit={handleResetPassword}>
            <div className="space-y-4">
              <div>
                <label className="block text-gray-700 font-medium mb-1">Email</label>
                <input
                  type="email"
                  className="w-full p-3 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <button
                type="submit"
                className="w-full py-3 bg-blue-600 text-white font-bold rounded-md shadow-md hover:bg-blue-700 transition-colors"
              >
                Reset Password
              </button>
            </div>
          </form>
          {/* Back to Login link */}
          <div className="text-center mt-4">
            <a
              href="/login"
              className="text-blue-600 hover:underline"
              onClick={() => navigate('/login')}
            >
              Back to Login
            </a>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default ForgotPassword;
