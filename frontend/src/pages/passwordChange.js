// src/pages/ChangePassword.js

import React, { useState } from 'react';
import { getAuth, confirmPasswordReset } from 'firebase/auth';
import { db } from '../firebase';
import { doc, updateDoc } from 'firebase/firestore';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

const ChangePassword = () => {
  const { oobCode } = useParams();  // Retrieve the reset code from the URL
  const navigate = useNavigate();
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');

  const handleChangePassword = async (e) => {
    e.preventDefault();  // Prevent default form submission behavior

    if (!newPassword || !confirmPassword) {
      setError('Please enter and confirm your new password.');
      return;
    }

    if (newPassword !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }

    const auth = getAuth();
    try {
      await confirmPasswordReset(auth, oobCode, newPassword);

      // Find the email associated with the password reset request and update Firestore
      const email = await auth.getSignInUserSession().then((user) => user.email);

      if (email) {
        const userDocRef = doc(db, 'passwordResetRequests', email);  // Assuming email is used as the document ID

        await updateDoc(userDocRef, {
          password: newPassword,  // Update the password field
          timestamp: new Date()  // Update the timestamp
        });

        setMessage('Your password has been changed successfully.');
        setError('');
        setNewPassword('');
        setConfirmPassword('');
        
        // Redirect to the home page or login page
        setTimeout(() => {
          navigate('/');
        }, 1000);
      } else {
        throw new Error('No email found for the current user session.');
      }
    } catch (err) {
      console.error('Error changing password:', err);
      if (err.code === 'auth/expired-action-code') {
        setError('The password reset link has expired.');
      } else {
        setError('Failed to change password. Please try again.');
      }
      setMessage('');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-50 to-blue-200 flex items-center justify-center p-6">
      <motion.div
        className="bg-white shadow-lg rounded-lg overflow-hidden w-full max-w-md border border-gray-300"
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        <div className="relative w-full h-48 bg-gradient-to-r from-blue-400 to-blue-600">
          <div className="absolute inset-0 flex items-center justify-center">
            <h2 className="text-3xl font-bold text-white">Change Password</h2>
          </div>
        </div>
        <div className="p-6 space-y-6">
          <div className="text-center">
            <p className="text-lg text-gray-600 mb-4">Enter your new password and confirm it</p>
            {message && (
              <motion.div
                className="flex items-center justify-center space-x-2 p-4 bg-green-100 text-green-600 rounded-md border border-green-300"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
              >
                <span className="text-2xl">✅</span>
                <p>{message}</p>
              </motion.div>
            )}
            {error && <p className="text-red-600 text-center mt-4">{error}</p>}
          </div>
          <form onSubmit={handleChangePassword}>
            <div className="space-y-4">
              <div>
                <label className="block text-gray-700 font-medium mb-1">New Password</label>
                <input
                  type="password"
                  className="w-full p-3 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter new password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                />
              </div>
              <div>
                <label className="block text-gray-700 font-medium mb-1">Confirm Password</label>
                <input
                  type="password"
                  className="w-full p-3 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500"
                  placeholder="Confirm new password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
              </div>
              <button
                type="submit"
                className="w-full py-3 bg-blue-500 text-white font-bold rounded-md shadow-md hover:bg-blue-600 transition-colors"
              >
                Change Password
              </button>
            </div>
          </form>
        </div>
      </motion.div>
    </div>
  );
};

export default ChangePassword;
