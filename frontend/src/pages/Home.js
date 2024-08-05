import React from 'react';
import { useNavigate } from 'react-router-dom';
import HeroSection from '../components/HeroSection';
import HowItWorks from '../components/HowItWorks';
import KeyFeatures from '../components/KeyFeatures';
import Benefits from '../components/Benefits';

const HomePage = () => {
  const navigate = useNavigate();

  const handleGetStartedClick = () => {
    navigate('/login');
  };

  return (
    <div className="bg-gray-50">
      <HeroSection />
      <HowItWorks />
      <KeyFeatures />
      <Benefits />
      <div className="flex justify-center items-center mt-12 mb-12">
        <button
          onClick={handleGetStartedClick}
          className="px-8 py-4 bg-gradient-to-r from-blue-500 to-indigo-500 text-white font-semibold rounded-lg shadow-lg hover:from-blue-600 hover:to-indigo-600 transition-all duration-300 ease-in-out transform hover:scale-105"
        >
          Get Started
        </button>
      </div>
    </div>
  );
};

export default HomePage;
