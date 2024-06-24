import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import Footer from './components/Footer';
import Navbar from './components/Navbar';
import ForgotPassword from './pages/ForgotPassword';
import News from './pages/News';
import Community from './pages/Community';    
import Profile from './pages/Profile';
import HomePage from './pages/Home';

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
            <Route path="/forgot-password" element={<ForgotPassword/>} />
            <Route path="/news" element={<News />} />
            <Route path="/community" element={<Community />} />  
            <Route path="/profile" element={<Profile />} />      
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
