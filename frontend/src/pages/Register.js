import React, { useState } from 'react';
import { auth, googleProvider} from '../firebase';
import { createUserWithEmailAndPassword, signInWithPopup } from 'firebase/auth';

const Register = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [securityAnswer, setSecurityAnswer] = useState('');

  const handleRegister = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      alert('Passwords do not match');
      return;
    }

    try {
      await createUserWithEmailAndPassword(auth, email, password);
      alert("User registered Successfully");
    } catch (error) {
      console.error('Error registering user:', error);
      alert(error.message);
    }
  };

  const handleGoogleSignup = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
      alert("Signed up with Google");
    } catch (error) {
      console.error("Error signing up with Google:", error);
      alert(error.message);
    }
  };  

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded shadow-md w-96">
        <h2 className="text-3xl font-bold mb-2 text-center">ASCEND MENTOR</h2>
        <p className="text-gray-600 mb-6 text-center">Knowledge is power</p>
        <form onSubmit={handleRegister}>
          <div className="mb-4 flex space-x-2">
            <div className="flex-1">
              <label className="block text-gray-700">First Name</label>
              <input
                type="text"
                className="w-full p-2 border rounded"
                placeholder="First Name"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
              />
            </div>
            <div className="flex-1">
              <label className="block text-gray-700">Last Name</label>
              <input
                type="text"
                className="w-full p-2 border rounded"
                placeholder="Last Name"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
              />
            </div>
          </div>
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
          <div className="mb-4">
            <label className="block text-gray-700">Password</label>
            <input
              type="password"
              className="w-full p-2 border rounded"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Confirm Password</label>
            <input
              type="password"
              className="w-full p-2 border rounded"
              placeholder="Confirm your password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Security Question</label>
            <select className="w-full p-2 border rounded">
              <option>What is your favourite sport?</option>
              <option>What is the name of your school?</option>
              <option>What is your favourite pet name?</option>
              <option>What is the name of the town where you were born?</option>
            </select>
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Answer</label>
            <input
              type="text"
              className="w-full p-2 border rounded"
              placeholder="Enter your answer"
              value={securityAnswer}
              onChange={(e) => setSecurityAnswer(e.target.value)}
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white p-2 rounded mb-4"
          >
            Register
          </button>
          <button
            type="button"
            className="w-full bg-red-500 text-white p-2 rounded mb-4"
            onClick={handleGoogleSignup}
          >
            Signup with Google
          </button>
        </form>
      </div>
    </div>    
  )
};

export default Register;