import React from 'react';
import { motion } from 'framer-motion';

const HowItWorks = () => {
  const steps = [
    {
      title: "Skill Assessment",
      description: "Take our comprehensive skill gap analysis to identify areas for improvement.",
      icon: "📝"
    },
    {
      title: "Learning Plan",
      description: "Receive a personalized learning plan tailored to your goals.",
      icon: "📚"
    },
    {
      title: "Resume Review",
      description: "Get expert feedback on your resume to improve your job prospects.",
      icon: "📝"
    },
    {
      title: "Mock Interviews",
      description: "Practice with our AI-driven mock interviews and get feedback.",
      icon: "🤖"
    },
  ];

  return (
    <section className="py-12 bg-gray-100">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold mb-8 text-center">How It Works</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => (
            <motion.div
              key={index}
              className="text-center p-6 bg-white shadow-lg rounded-lg"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
            >
              <div className="text-4xl mb-4">{step.icon}</div>
              <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
              <p className="text-gray-600">{step.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
