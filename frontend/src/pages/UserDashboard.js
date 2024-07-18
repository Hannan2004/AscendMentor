import React from 'react';
import './UserDashboard.css';  // Import the CSS file for the styles
import { motion } from 'framer-motion';

const UserDashboard = () => {
    return (
        <div className="dashboard-background min-h-screen flex flex-col items-center justify-center">
            <div className="overlay"></div>
            <div className="text-center mb-12">
                <motion.h1 
                    className="text-6xl header-text mb-4"
                    initial={{ opacity: 0, y: -50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                >
                    Welcome to Your Dashboard
                </motion.h1>
                <motion.p 
                    className="text-xl description-text"
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                >
                    Explore the features of our AI-powered career growth tools designed to help you succeed.
                </motion.p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 px-4">
                <motion.div 
                    className="feature-card"
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.4 }}
                >
                    <h2 className="text-2xl feature-title mb-4">Interview Preparation</h2>
                    <p className="feature-description mb-4">Prepare for your next job interview with personalized AI-driven mock interviews and feedback. Our smart system will help you enhance your answers and presentation skills.</p>
                    <button className="start-button">Start</button>
                </motion.div>
                <motion.div 
                    className="feature-card"
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.6 }}
                >
                    <h2 className="text-2xl feature-title mb-4">Smart AI Learning</h2>
                    <p className="feature-description mb-4">Enhance your skills with AI-curated learning resources and adaptive learning plans. Stay ahead in your field with tailored courses and materials designed just for you.</p>
                    <button className="start-button">Start</button>
                </motion.div>
                <motion.div 
                    className="feature-card"
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.8 }}
                >
                    <h2 className="text-2xl feature-title mb-4">Resume Analyzer</h2>
                    <p className="feature-description mb-4">Optimize your resume with AI-based analysis and suggestions to stand out to recruiters. Get actionable feedback and refine your resume to make a strong impression.</p>
                    <button className="start-button">Start</button>
                </motion.div>
            </div>
        </div>
    );
};

export default UserDashboard;
