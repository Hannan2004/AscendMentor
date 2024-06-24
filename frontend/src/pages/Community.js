import React, { useState, useEffect } from 'react';

const Community = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [newCommunity, setNewCommunity] = useState('');
  const [communities, setCommunities] = useState([]);

  // Load communities from localStorage when the component mounts
  useEffect(() => {
    const storedCommunities = JSON.parse(localStorage.getItem('communities'));
    if (storedCommunities) {
      setCommunities(storedCommunities);
    }
  }, []);

  // Save communities to localStorage whenever the communities state changes
  useEffect(() => {
    localStorage.setItem('communities', JSON.stringify(communities));
  }, [communities]);

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleNewCommunityChange = (e) => {
    setNewCommunity(e.target.value);
  };

  const handleAddCommunity = () => {
    if (newCommunity && !communities.includes(newCommunity)) {
      setCommunities([...communities, newCommunity]);
      setNewCommunity('');
    }
  };

  const filteredCommunities = communities.filter((community) =>
    community.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 flex flex-col items-center p-4">
      <h1 className="text-4xl font-bold text-white mb-8">Community Hub</h1>

      <div className="w-full max-w-md mb-6">
        <input
          type="text"
          placeholder="Search communities..."
          className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-600 mb-4"
          value={searchQuery}
          onChange={handleSearchChange}
        />
      </div>

      <div className="w-full max-w-md mb-6">
        <input
          type="text"
          placeholder="Create a new community..."
          className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-600 mb-2"
          value={newCommunity}
          onChange={handleNewCommunityChange}
        />
        <button
          className="w-full bg-purple-600 text-white p-3 rounded-lg shadow-lg hover:bg-purple-700 transition duration-200"
          onClick={handleAddCommunity}
        >
          Create Community
        </button>
      </div>

      <div className="w-full max-w-md">
        <h2 className="text-2xl font-semibold text-white mb-4">Join a Community</h2>
        <ul className="bg-white rounded-lg shadow-lg p-4">
          {filteredCommunities.map((community, index) => (
            <li
              key={index}
              className="border-b border-gray-200 p-3 last:border-none hover:bg-gray-100 transition duration-200"
            >
              {community}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Community;
