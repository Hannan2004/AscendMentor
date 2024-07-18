import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { db } from '../firebase';
import { collection, addDoc, Timestamp } from 'firebase/firestore';
import { FaCamera } from 'react-icons/fa';
import { MdArrowDropDown } from 'react-icons/md';
import { motion } from 'framer-motion';
import { Slide } from 'react-awesome-reveal';
import { BiRocket } from 'react-icons/bi';

const educationOptions = [
  'High School',
  'Associate Degree',
  'Bachelor’s Degree',
  'Master’s Degree',
  'Doctorate'
];

const countries = [
  'United States', 'Canada', 'United Kingdom', 'Australia', 'Germany', 'France', 'Spain', 'Italy', 'Netherlands', 'Brazil',
  'India', 'China', 'Japan', 'South Korea', 'Mexico', 'Russia', 'South Africa', 'Nigeria', 'Argentina', 'Chile', 'Colombia',
  'Turkey', 'Saudi Arabia', 'United Arab Emirates', 'Singapore', 'Malaysia', 'Thailand', 'Philippines', 'Vietnam', 'New Zealand',
  'Norway', 'Sweden', 'Denmark', 'Finland', 'Iceland', 'Poland', 'Greece', 'Portugal', 'Ireland', 'Belgium'
].sort();

const ProfilePage = () => {
  const [profileImage, setProfileImage] = useState('');
  const [name, setName] = useState('');
  const [country, setCountry] = useState('');
  const [email, setEmail] = useState('');
  const [education, setEducation] = useState('');
  const [socialLinks, setSocialLinks] = useState({
    github: '',
    linkedin: '',
    twitter: '',
    facebook: ''
  });
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isEducationDropdownOpen, setIsEducationDropdownOpen] = useState(false);
  const [filteredCountries, setFilteredCountries] = useState(countries);
  const [filteredEducationOptions, setFilteredEducationOptions] = useState(educationOptions);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const navigate = useNavigate();  // Initialize useNavigate for redirection

  const handleImageChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setProfileImage(URL.createObjectURL(e.target.files[0]));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name || !country || !email || !education) {
      setError('Please fill in all the required fields.');
      return;
    }

    try {
      await addDoc(collection(db, 'profiles'), {
        name,
        country,
        email,
        education,
        socialLinks,
        profileImage,
        timestamp: Timestamp.fromDate(new Date())  // Add timestamp of the request
      });

      setMessage('Profile created successfully!');
      setError('');
      setName('');
      setCountry('');
      setEmail('');
      setEducation('');
      setSocialLinks({
        github: '',
        linkedin: '',
        twitter: '',
        facebook: ''
      });
      setProfileImage('');

      // Redirect to User Dashboard page upon success
      navigate('/user-dashboard');

      // Display the success message with a rocket icon
      setTimeout(() => {
        alert('🚀 Profile created successfully!');
      }, 100);

    } catch (error) {
      console.error('Error creating profile: ', error);
      setError('Failed to create profile. Please try again.');
      setMessage('');
    }
  };

  const handleCountryClick = (selectedCountry) => {
    setCountry(selectedCountry);
    setIsDropdownOpen(false);
  };

  const handleCountryInputChange = (e) => {
    const query = e.target.value.toLowerCase();
    setCountry(query);
    setFilteredCountries(countries.filter(c => c.toLowerCase().includes(query)));
  };

  const handleEducationClick = (selectedEducation) => {
    setEducation(selectedEducation);
    setIsEducationDropdownOpen(false);
  };

  const handleEducationInputChange = (e) => {
    const query = e.target.value.toLowerCase();
    setEducation(query);
    setFilteredEducationOptions(educationOptions.filter(e => e.toLowerCase().includes(query)));
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-50 to-blue-200 flex items-center justify-center p-6">
      <motion.div
        className="bg-white shadow-lg rounded-lg overflow-hidden w-full max-w-3xl border border-gray-300"
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        <div className="relative w-full h-48 bg-gradient-to-r from-blue-400 to-blue-600">
          <div className="absolute inset-0 flex items-center justify-center">
            <motion.div
              className="h-36 w-36 rounded-full border-4 border-white bg-gray-200 flex items-center justify-center relative"
              whileHover={{ scale: 1.1, rotate: [0, 5, -5, 0] }}
              transition={{ duration: 0.3 }}
            >
              <img
                className="h-36 w-36 rounded-full object-cover"
                src={profileImage || 'https://via.placeholder.com/150'}
                alt="Profile"
              />
              <input
                type="file"
                accept="image/*"
                className="absolute top-0 left-0 w-full h-full opacity-0 cursor-pointer"
                onChange={handleImageChange}
              />
              <div
                className="absolute bottom-0 right-0 bg-blue-500 p-2 rounded-full shadow-md cursor-pointer hover:bg-blue-600 transform hover:scale-110 transition-transform"
                onClick={() => document.querySelector('input[type="file"]').click()}
              >
                <FaCamera className="text-white text-xl" />
              </div>
            </motion.div>
          </div>
        </div>
        <div className="p-6 space-y-6">
          <Slide direction="up" duration={500}>
            <div className="text-center">
              <h2 className="text-3xl font-bold text-gray-800 mb-2">{name || 'Your Name'}</h2>
              <p className="text-lg text-gray-600 mb-4">Fill in your details to create your profile</p>
              {message && (
                <motion.div
                  className="flex items-center justify-center space-x-2 p-4 bg-green-100 text-green-600 rounded-md border border-green-300"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <BiRocket className="text-2xl" />
                  <p>{message}</p>
                </motion.div>
              )}
              {error && <p className="text-red-600 text-center mt-4">{error}</p>}
            </div>
          </Slide>
          <form onSubmit={handleSubmit}>
            <div className="space-y-4">
              <div>
                <label className="block text-gray-700 font-medium mb-1">Name</label>
                <input
                  type="text"
                  className="w-full p-3 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500"
                  placeholder="John Doe"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <div className="relative">
                <label className="block text-gray-700 font-medium mb-1">Country</label>
                <input
                  type="text"
                  className="w-full p-3 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500"
                  placeholder="Select your country"
                  value={country}
                  onChange={handleCountryInputChange}
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                />
                <MdArrowDropDown
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 cursor-pointer"
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                />
                {isDropdownOpen && (
                  <motion.ul
                    className="absolute mt-1 w-full bg-white border border-gray-300 rounded-md shadow-lg max-h-60 overflow-y-auto z-10"
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    transition={{ duration: 0.3 }}
                  >
                    {filteredCountries.map((c, index) => (
                      <li
                        key={index}
                        className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                        onClick={() => handleCountryClick(c)}
                      >
                        {c}
                      </li>
                    ))}
                  </motion.ul>
                )}
              </div>
              <div className="relative">
                <label className="block text-gray-700 font-medium mb-1">Education</label>
                <input
                  type="text"
                  className="w-full p-3 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500"
                  placeholder="Select your education level"
                  value={education}
                  onChange={handleEducationInputChange}
                  onClick={() => setIsEducationDropdownOpen(!isEducationDropdownOpen)}
                />
                <MdArrowDropDown
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 cursor-pointer"
                  onClick={() => setIsEducationDropdownOpen(!isEducationDropdownOpen)}
                />
                {isEducationDropdownOpen && (
                  <motion.ul
                    className="absolute mt-1 w-full bg-white border border-gray-300 rounded-md shadow-lg max-h-60 overflow-y-auto z-10"
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    transition={{ duration: 0.3 }}
                  >
                    {filteredEducationOptions.map((e, index) => (
                      <li
                        key={index}
                        className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                        onClick={() => handleEducationClick(e)}
                      >
                        {e}
                      </li>
                    ))}
                  </motion.ul>
                )}
              </div>
              <div>
                <label className="block text-gray-700 font-medium mb-1">Email</label>
                <input
                  type="email"
                  className="w-full p-3 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500"
                  placeholder="example@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="space-y-4">
                <label className="block text-gray-700 font-medium mb-1">Social Links (Optional)</label>
                <div className="flex flex-col space-y-2">
                  <input
                    type="text"
                    className="w-full p-3 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500"
                    placeholder="GitHub URL"
                    value={socialLinks.github}
                    onChange={(e) => setSocialLinks({ ...socialLinks, github: e.target.value })}
                  />
                  <input
                    type="text"
                    className="w-full p-3 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500"
                    placeholder="LinkedIn URL"
                    value={socialLinks.linkedin}
                    onChange={(e) => setSocialLinks({ ...socialLinks, linkedin: e.target.value })}
                  />
                  <input
                    type="text"
                    className="w-full p-3 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500"
                    placeholder="Twitter URL"
                    value={socialLinks.twitter}
                    onChange={(e) => setSocialLinks({ ...socialLinks, twitter: e.target.value })}
                  />
                  <input
                    type="text"
                    className="w-full p-3 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500"
                    placeholder="Facebook URL"
                    value={socialLinks.facebook}
                    onChange={(e) => setSocialLinks({ ...socialLinks, facebook: e.target.value })}
                  />
                </div>
              </div>
              <button
                type="submit"
                className="w-full py-3 bg-blue-500 text-white font-bold rounded-md shadow-md hover:bg-blue-600 transition-colors"
              >
                Create Profile
              </button>
            </div>
          </form>
        </div>
      </motion.div>
    </div>
  );
};

export default ProfilePage;
