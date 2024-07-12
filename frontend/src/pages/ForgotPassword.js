import React, { useState } from 'react';
import { getAuth, sendPasswordResetEmail } from 'firebase/auth';
import { db } from '../firebase';
import { collection, addDoc, Timestamp } from 'firebase/firestore';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const handleResetPassword = async () => {
    const auth = getAuth();
    try {
      await sendPasswordResetEmail(auth, email);

      // Add request details to Firestore
      await addDoc(collection(db, 'passwordResetRequests'), {
        email,
        timestamp: Timestamp.fromDate(new Date())
      });

      setMessage('Password reset email sent. Check your inbox!');
      setError('');
    } catch (err) {
      console.error('Error sending password reset email:', err);
      setError('Failed to send password reset email. Please try again.');
      setMessage('');
    }
  };

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
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <button
            type="button"
            onClick={handleResetPassword}
            className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600 focus:outline-none"
          >
            Reset Password
          </button>
          {message && <p className="text-green-600 text-center mt-4">{message}</p>}
          {error && <p className="text-red-600 text-center mt-4">{error}</p>}
        </form>
      </div>
    </div>
  );
};

export default ForgotPassword;
