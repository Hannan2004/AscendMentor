import React from 'react';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import ForgotPassword from './pages/ForgotPassword';
import HomePage from './pages/Home';
import ChatbotInterview from './pages/InterviewBot';
import InterviewForm from './pages/InterviewForm';
import LearningPlanForm from './pages/LearningPlanForm';
import Login from './pages/Login';
import Profile from './pages/Profile';
import Register from './pages/Register';
import Resume from './pages/Resume';
import SkillBot from './pages/SkillBot';

import Footer from './components/Footer'; // Import Footer component
import Navbar from './components/Navbar'; // Import Navbar component

function App() {
  return (
    <Router>
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/forgotpassword" element={<ForgotPassword />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/skillbot" element={<SkillBot />} />
            <Route path="/resume" element={<Resume />} />
            <Route path="/form" element={<InterviewForm />} />
            <Route path="/interview" element={<ChatbotInterview />} />
            <Route path="/learning" element={<LearningPlanForm />} />
      
        
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
