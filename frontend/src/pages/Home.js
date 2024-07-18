import React from 'react';
import { useNavigate } from 'react-router-dom';  // Import useNavigate for redirection
import HeroSection from '../components/HeroSection';
import HowItWorks from '../components/HowItWorks';
import KeyFeatures from '../components/KeyFeatures';
import Benefits from '../components/Benefits';

const HomePage = () => {
  const navigate = useNavigate();  // Initialize useNavigate for redirection

  const handleGetStartedClick = () => {
    navigate('/login');  // Navigate to Login page when "Get Started" button is clicked
  };

  return (
    <div>
      <HeroSection />
      <HowItWorks />
      <KeyFeatures />
      <Benefits />
      {/* Centered Get Started Button */}
      <div className="flex justify-center items-center mt-12 mb-12">
        <button
          onClick={handleGetStartedClick}
          className="px-6 py-3 bg-blue-500 text-white font-bold rounded-md shadow-md hover:bg-blue-600 transition-colors"
        >
          Get Started
        </button>
      </div>
    </div>
  );
};

export default HomePage;
