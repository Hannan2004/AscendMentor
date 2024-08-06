import React, { useState } from 'react';
import { auth, googleProvider, db } from '../firebase';
import { createUserWithEmailAndPassword, signInWithPopup } from 'firebase/auth';
import { collection, addDoc, Timestamp } from 'firebase/firestore';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

const Register = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [securityAnswer, setSecurityAnswer] = useState('');
  const [securityQuestion, setSecurityQuestion] = useState('What is your favourite sport?');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    try {
      // Create user with email and password
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // Add user details to Firestore
      await addDoc(collection(db, 'users'), {
        uid: user.uid,
        email,
        password,  // Store the password (consider security implications)
        firstName,
        lastName,
        securityQuestion,
        securityAnswer,
        timestamp: Timestamp.fromDate(new Date())
      });

      setMessage('User registered successfully!');
      setError('');
      setEmail('');
      setPassword('');
      setConfirmPassword('');
      setFirstName('');
      setLastName('');
      setSecurityAnswer('');
      setSecurityQuestion('What is your favourite sport?');

      // Redirect to the Login page after successful registration
      navigate('/login');
    } catch (error) {
      console.error('Error registering user:', error);
      if (error.code === 'auth/email-already-in-use') {
        setError('The email address is already in use. Please use a different email address.');
      } else {
        setError(error.message);
      }
      setMessage('');
    }
  };

  const handleGoogleSignup = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
      navigate('/profile'); // Redirect to the User Dashboard page after Google signup
    } catch (error) {
      console.error('Error signing up with Google:', error);
      alert(error.message);
    }
  };

  return (
    <div className="bg-gradient-to-r from-blue-500 to-purple-600 min-h-screen flex flex-col justify-center items-center">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md border border-gray-300 mb-12">
        <h2 className="text-4xl font-bold mb-4 text-center text-gray-800">ASCEND MENTOR</h2>
        <p className="text-gray-600 mb-6 text-center text-lg">Join us and start your journey towards success!</p>
        <form onSubmit={handleRegister} className="space-y-4">
          <div className="flex space-x-2 mb-4">
            <div className="flex-1">
              <label className="block text-gray-700 text-lg">First Name</label>
              <motion.input
                type="text"
                className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300 ease-in-out"
                placeholder="First Name"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                whileFocus={{ scale: 1.05 }}
              />
            </div>
            <div className="flex-1">
              <label className="block text-gray-700 text-lg">Last Name</label>
              <motion.input
                type="text"
                className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300 ease-in-out"
                placeholder="Last Name"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                whileFocus={{ scale: 1.05 }}
              />
            </div>
          </div>
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
          <div className="mb-4">
            <label className="block text-gray-700 text-lg">Confirm Password</label>
            <motion.input
              type="password"
              className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300 ease-in-out"
              placeholder="Confirm your password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              whileFocus={{ scale: 1.05 }}
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-lg">Security Question</label>
            <motion.select
              className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300 ease-in-out"
              value={securityQuestion}
              onChange={(e) => setSecurityQuestion(e.target.value)}
              whileFocus={{ scale: 1.05 }}
            >
              <option>What is your favourite sport?</option>
              <option>What is the name of your school?</option>
              <option>What is your favourite pet name?</option>
              <option>What is the name of the town where you were born?</option>
            </motion.select>
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-lg">Answer</label>
            <motion.input
              type="text"
              className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300 ease-in-out"
              placeholder="Enter your answer"
              value={securityAnswer}
              onChange={(e) => setSecurityAnswer(e.target.value)}
              whileFocus={{ scale: 1.05 }}
            />
          </div>
          <motion.button
            type="submit"
            className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white p-3 rounded-lg mb-4 hover:from-blue-700 hover:to-purple-700 focus:outline-none transition-all duration-300 ease-in-out"
            whileHover={{ scale: 1.05 }}
          >
            Register
          </motion.button>
          <motion.button
            type="button"
            className="w-full bg-red-500 text-white p-3 rounded-lg mb-4 hover:bg-red-600 focus:outline-none transition-all duration-300 ease-in-out"
            whileHover={{ scale: 1.05 }}
            onClick={handleGoogleSignup}
          >
            Sign Up with Google
          </motion.button>
          <div className="text-center">
            <p className="text-gray-600">Already have an account? <a href="/login" className="text-blue-500 hover:underline">Login</a></p>
          </div>
          {message && <p className="text-green-500 text-center">{message}</p>}
          {error && <p className="text-red-500 text-center">{error}</p>}
        </form>
      </div>
      {/* Add footer here */}
      <footer className="bg-gray-800 text-white py-4 w-full text-center">
        <p>&copy; 2024 ASCEND MENTOR. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default Register;
