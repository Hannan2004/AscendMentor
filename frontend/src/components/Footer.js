import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-400 py-8">
      <div className="container mx-auto px-4 flex flex-wrap justify-between items-start">
        {/* Subscription and Contact */}
        <div className="w-full md:w-1/4 mb-6 md:mb-0">
          <h5 className="text-lg font-bold text-white mb-2">Subscribe to our newsletter</h5>
          <p className="mb-4">Get the latest news, updates, and special offers delivered to your inbox.</p>
          <button className="bg-blue-600 hover:bg-blue-500 text-white font-bold py-2 px-4 rounded">
            Subscribe
          </button>
          <p className="mt-4">
            <a href="mailto:ascendmentor@gmail.com" className="text-gray-300 hover:text-white transition duration-300">
              ascendmentor@gmail.com
            </a>
          </p>
        </div>
        {/* About Section */}
        <div className="w-full md:w-1/4 mb-6 md:mb-0">
          <h5 className="text-lg font-bold text-white mb-2">About Us</h5>
          <ul className="list-none space-y-1">
            <li><Link to="/about" className="hover:text-white transition duration-300">Who We Are</Link></li>
            <li><Link to="/mission" className="hover:text-white transition duration-300">Our Mission</Link></li>
            <li><Link to="/team" className="hover:text-white transition duration-300">Meet the Team</Link></li>
            {/* Add more links as necessary */}
          </ul>
        </div>
        {/* Resources Section */}
        <div className="w-full md:w-1/4 mb-6 md:mb-0">
          <h5 className="text-lg font-bold text-white mb-2">Resources</h5>
          <ul className="list-none space-y-1">
            <li><Link to="/blog" className="hover:text-white transition duration-300">Blog</Link></li>
            <li><Link to="/faqs" className="hover:text-white transition duration-300">FAQs</Link></li>
            <li><Link to="/support" className="hover:text-white transition duration-300">Support</Link></li>
            {/* Add more links as necessary */}
          </ul>
        </div>
        {/* Social Media Links */}
        <div className="w-full md:w-1/4 mb-6 md:mb-0">
          <h5 className="text-lg font-bold text-white mb-2">Follow Us</h5>
          <div className="flex space-x-4">
            <a href="https://www.linkedin.com" target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-white transition duration-300">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.761 0 5-2.239 5-5v-14c0-2.761-2.239-5-5-5zm-11 20h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.791-1.75-1.732 0-.941.784-1.732 1.75-1.732s1.75.791 1.75 1.732c0 .941-.784 1.732-1.75 1.732zm13.5 12.268h-3v-5.604c0-1.337-.025-3.059-1.862-3.059-1.862 0-2.147 1.454-2.147 2.959v5.704h-3v-11h2.881v1.505h.042c.401-.76 1.378-1.56 2.837-1.56 3.034 0 3.595 2.003 3.595 4.605v6.45z"/>
              </svg>
            </a>
            <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-white transition duration-300">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M22.675 0h-21.35c-.732 0-1.325.593-1.325 1.325v21.351c0 .731.593 1.324 1.325 1.324h11.495v-9.294h-3.123v-3.622h3.123v-2.671c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.463.099 2.795.142v3.24l-1.918.001c-1.504 0-1.795.715-1.795 1.762v2.314h3.587l-.467 3.622h-3.12v9.294h6.116c.73 0 1.323-.593 1.323-1.324v-21.35c0-.732-.593-1.325-1.324-1.325z"/>
              </svg>
            </a>
            {/* Add more social media icons as needed */}
          </div>
        </div>
      </div>
      <div className="border-t border-gray-700 mt-8 pt-4 text-center text-gray-500 text-sm">
        &copy; {new Date().getFullYear()} Ascend Mentor. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;