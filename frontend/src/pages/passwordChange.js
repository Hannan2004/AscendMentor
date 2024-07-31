import React, { useState, useEffect } from 'react';
import { db } from '../firebase';
import { doc, updateDoc } from 'firebase/firestore';
import { useNavigate, useLocation } from 'react-router-dom'; // Import useNavigate and useLocation

const ChangePassword = () => {
  const [email, setEmail] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate(); // Hook for navigation
  const location = useLocation(); // Hook for accessing URL parameters

  useEffect(() => {
    // Retrieve the email from the location state or URL (assuming email is passed via state)
    if (location.state && location.state.email) {
      setEmail(location.state.email);
    } else {
      setError('No email found for password reset.');
    }
  }, [location]);

  const handleChangePassword = async (e) => {
    e.preventDefault();

    if (newPassword !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }

    if (!email) {
      setError('No email found.');
      return;
    }

    try {
      // Update user's password in Firestore
      const userRef = doc(db, 'users', email);
      await updateDoc(userRef, {
        password: newPassword // Update the password field
      });

      setMessage('Password updated successfully!');
      setError('');
      setNewPassword('');
      setConfirmPassword('');

      // Redirect to Login page or any other page
      navigate('/login');
    } catch (err) {
      console.error('Error updating password:', err);
      setError('Failed to update password. Please try again.');
      setMessage('');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-green-100 to-green-300 flex items-center justify-center p-6">
      <div className="bg-white shadow-lg rounded-lg overflow-hidden w-full max-w-md border border-gray-200">
        <div className="relative w-full h-48 bg-gradient-to-r from-green-500 to-green-700">
          <div className="absolute inset-0 flex items-center justify-center">
            <h2 className="text-3xl font-bold text-white">Change Password</h2>
          </div>
        </div>
        <div className="p-6 space-y-6">
          <div className="text-center">
            <p className="text-lg text-gray-600 mb-4">Enter your new password</p>
            {message && (
              <div className="flex items-center justify-center space-x-2 p-4 bg-green-100 text-green-600 rounded-md border border-green-300">
                <span className="text-2xl">✅</span>
                <p>{message}</p>
              </div>
            )}
            {error && <p className="text-red-600 text-center mt-4">{error}</p>}
          </div>
          <form onSubmit={handleChangePassword}>
            <div className="space-y-4">
              <div>
                <label className="block text-gray-700 font-medium mb-1">New Password</label>
                <input
                  type="password"
                  className="w-full p-3 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-green-500"
                  placeholder="Enter your new password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                />
              </div>
              <div>
                <label className="block text-gray-700 font-medium mb-1">Confirm Password</label>
                <input
                  type="password"
                  className="w-full p-3 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-green-500"
                  placeholder="Confirm your new password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
              </div>
              <button
                type="submit"
                className="w-full py-3 bg-green-600 text-white font-bold rounded-md shadow-md hover:bg-green-700 transition-colors"
              >
                Change Password
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ChangePassword;
