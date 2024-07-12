import React from 'react';
import { motion } from 'framer-motion';
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';

const HeroSection = () => {
    return (
      <div className="relative h-screen bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center text-white">
        <div className="absolute inset-0 overflow-hidden">
          <Canvas>
            <ambientLight intensity={0.5} />
            <pointLight position={[10, 10, 10]} />
            <OrbitControls enableZoom={false} />
          </Canvas>
        </div>
        <div className="relative z-10 text-center">
          <motion.h1
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            className="text-5xl font-bold mb-4"
          >
            Welcome to Our Platform
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            className="text-lg mb-8"
          >
            Empowering Your Career with AI-Powered Insights using Gemini
          </motion.p>
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="bg-blue-700 hover:bg-blue-800 text-white font-bold py-2 px-4 rounded"
            href="http://localhost:3000/login"
          >
            Get Started
          </motion.button>
        </div>
      </div>
    );
};

export default HeroSection;