import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import Footer from './components/Footer';
import Navbar from './components/Navbar';
import ForgotPassword from './pages/ForgotPassword';
import News from './pages/News';    
import Profile from './pages/Profile';
import HomePage from './pages/Home';
import SkillBot from './pages/SkillBot';
import Resume from './pages/Resume';
import InterviewForm from './pages/InterviewForm';
import ChatbotInterview from './pages/InterviewBot';
import UserDashboard from './pages/UserDashboard';
import LearningPlanForm from './pages/LearningPlanForm';

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
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/news" element={<News />} />
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
