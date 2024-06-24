import React, { useState } from 'react';
import { db } from '../firebase'; // Adjust the path according to your file structure
import { collection, addDoc } from 'firebase/firestore';
import { FaCamera } from 'react-icons/fa'; // Importing a camera icon

const ProfilePage = () => {
  const [profileImage, setProfileImage] = useState('');
  const [name, setName] = useState('John Doe');
  const [country, setCountry] = useState('');
  const [email, setEmail] = useState('');
  const [education, setEducation] = useState('');
  const [socialLinks, setSocialLinks] = useState({
    github: '',
    linkedin: '',
    twitter: '',
    facebook: ''
  });
  const [isEditing, setIsEditing] = useState(false); // State to manage edit mode

  const handleImageChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setProfileImage(URL.createObjectURL(e.target.files[0]));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await addDoc(collection(db, 'profiles'), {
        name,
        country,
        email,
        education,
        socialLinks,
        profileImage
      });
      alert('Profile updated!');
    } catch (error) {
      console.error('Error adding document: ', error);
      alert('Error updating profile!');
    }
  };

  const handleSocialLinkChange = (e) => {
    const { name, value } = e.target;
    setSocialLinks({ ...socialLinks, [name]: value });
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-6">
      <form onSubmit={handleSubmit} className="bg-white shadow-lg rounded-lg flex overflow-hidden w-full max-w-6xl">
        {/* Left Side */}
        <div className="w-1/3 bg-blue-500 p-6 flex flex-col items-center relative">
          <div className="relative">
            <img
              className="h-32 w-32 rounded-full border-4 border-white mb-4 object-cover"
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
              className="absolute bottom-0 right-0 bg-white p-1 rounded-full cursor-pointer"
              onClick={() => document.querySelector('input[type="file"]').click()}
            >
              <FaCamera className="text-blue-500" />
            </div>
          </div>
          <h2 className="text-2xl font-bold text-white">{name}</h2>
          <p className="text-sm text-white">Web Developer</p>
          <p className="mt-4 text-white text-center">
            Passionate web developer with experience in creating dynamic and responsive websites using modern web technologies.
          </p>
          <div className="mt-6 w-full">
            <h3 className="text-lg font-bold text-white mb-4">Social Media</h3>
            <div className="space-y-4">
              <a href="#" className="block text-white hover:text-gray-200">
                Resume
              </a>
              <a href="#" className="block text-white hover:text-gray-200">
                LinkedIn
              </a>
              <a href="#" className="block text-white hover:text-gray-200">
                X (Twitter)
              </a>
              <a href="#" className="block text-white hover:text-gray-200">
                GitHub
              </a>
              <a href="#" className="block text-white hover:text-gray-200">
                Meta (Facebook)
              </a>
            </div>
          </div>
        </div>
        {/* Right Side */}
        <div className="w-2/3 p-6">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-lg font-bold text-gray-900">Profile Information</h3>
            <button
              type="button"
              className="text-blue-500 hover:text-blue-700"
              onClick={() => setIsEditing(!isEditing)}
            >
              {isEditing ? 'Cancel' : 'Edit'}
            </button>
          </div>
          <div className="space-y-4">
            <div>
              <label className="block text-gray-700">Name</label>
              <input
                type="text"
                className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                placeholder="John Doe"
                value={name}
                onChange={(e) => setName(e.target.value)}
                disabled={!isEditing}
              />
            </div>
            <div>
              <label className="block text-gray-700">Country</label>
              <input
                type="text"
                className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                placeholder="Country"
                value={country}
                onChange={(e) => setCountry(e.target.value)}
                disabled={!isEditing}
              />
            </div>
            <div>
              <label className="block text-gray-700">Email ID</label>
              <input
                type="email"
                className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                placeholder="johndoe@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={!isEditing}
              />
            </div>
            <div>
              <label className="block text-gray-700">Education</label>
              <input
                type="text"
                className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                placeholder="Education"
                value={education}
                onChange={(e) => setEducation(e.target.value)}
                disabled={!isEditing}
              />
            </div>
            <div>
              <label className="block text-gray-700">Social Links</label>
              <div className="space-y-2">
                <input
                  type="text"
                  className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                  placeholder="GitHub Profile"
                  name="github"
                  value={socialLinks.github}
                  onChange={handleSocialLinkChange}
                  disabled={!isEditing}
                />
                <input
                  type="text"
                  className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                  placeholder="LinkedIn Profile"
                  name="linkedin"
                  value={socialLinks.linkedin}
                  onChange={handleSocialLinkChange}
                  disabled={!isEditing}
                />
                <input
                  type="text"
                  className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                  placeholder="Twitter Profile"
                  name="twitter"
                  value={socialLinks.twitter}
                  onChange={handleSocialLinkChange}
                  disabled={!isEditing}
                />
                <input
                  type="text"
                  className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                  placeholder="Facebook Profile"
                  name="facebook"
                  value={socialLinks.facebook}
                  onChange={handleSocialLinkChange}
                  disabled={!isEditing}
                />
              </div>
            </div>
          </div>
          <div className="mt-6">
            <button
              type="submit"
              className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-700"
              disabled={!isEditing}
            >
              Submit
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default ProfilePage;
