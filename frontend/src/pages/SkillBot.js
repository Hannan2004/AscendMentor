import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { FaEllipsisV, FaTrashAlt, FaShareAlt, FaEdit } from 'react-icons/fa';

const SkillBot = () => {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState([]);
  const [chatHistory, setChatHistory] = useState([]);
  const [titles, setTitles] = useState([]);
  const [menuOpen, setMenuOpen] = useState(null);
  const [currentChatIndex, setCurrentChatIndex] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [editIndex, setEditIndex] = useState(null);
  const messagesEndRef = useRef(null);

  const keywordDictionary = [
    { keyword: 'MERN', display: 'MERN Stack' },
    { keyword: 'frontend', display: 'Frontend Development' },
    { keyword: 'backend', display: 'Backend Development' },
    { keyword: 'full stack', display: 'Full Stack Development' },
    { keyword: 'react', display: 'React' },
    { keyword: 'node', display: 'Node.js' },
    { keyword: 'express', display: 'Express' },
    { keyword: 'mongodb', display: 'MongoDB' },
    { keyword: 'python', display: 'Python' },
    { keyword: 'machine learning', display: 'Machine Learning' },
    { keyword: 'data science', display: 'Data Science' },
    { keyword: 'devops', display: 'DevOps' },
    { keyword: 'ai', display: 'AI' },
    { keyword: 'blockchain', display: 'Blockchain' },
  ];

  const extractTitle = (input) => {
    for (const { keyword, display } of keywordDictionary) {
      if (input.toLowerCase().includes(keyword.toLowerCase())) {
        return display;
      }
    }
    return input.split(' ').slice(0, 3).join(' ') + (input.split(' ').length > 3 ? '...' : '');
  };

  const sendMessage = async () => {
    if (!input.trim()) return;

    const newMessage = { user: input };
    const updatedMessages = [...messages];
    if (editMode && editIndex !== null) {
      updatedMessages[editIndex] = newMessage;
      setEditMode(false);
      setEditIndex(null);
    } else {
      updatedMessages.push(newMessage);
    }
    setMessages(updatedMessages);
    setInput('');

    if (messages.length === 0 || editMode) {
      const title = extractTitle(input);
      setTitles(prevTitles => {
        const updatedTitles = [...prevTitles];
        if (currentChatIndex !== null) {
          updatedTitles[currentChatIndex] = title;
        } else {
          updatedTitles.push(title);
        }
        return updatedTitles;
      });
    }

    try {
      const response = await axios.post('http://localhost:3001/skillbot', { input });
      const geminiMessage = { gemini: response.data.response };
      setMessages(prevMessages => [...prevMessages, geminiMessage]);
    } catch (error) {
      console.error('Error sending message:', error);
    }
  };

  const startNewChat = () => {
    if (currentChatIndex !== null) {
      setChatHistory(prevHistory => {
        const updatedHistory = [...prevHistory];
        updatedHistory[currentChatIndex] = { messages };
        return updatedHistory;
      });
    } else {
      setChatHistory(prevHistory => [...prevHistory, { messages }]);
    }
    setMessages([]);
    setTitles([]);
    setCurrentChatIndex(null);
    setEditMode(false);
    setEditIndex(null);
  };

  const loadChat = (index) => {
    const chat = chatHistory[index];
    if (chat) {
      setMessages(chat.messages);
      setCurrentChatIndex(index);
    }
  };

  const deleteChat = (index) => {
    setChatHistory(prev => prev.filter((_, i) => i !== index));
    setTitles(prev => prev.filter((_, i) => i !== index));
    setMessages([]);
    setCurrentChatIndex(null);
  };

  const shareChat = (index) => {
    const chatUrl = `${window.location.origin}/chat/${index}`;
    navigator.clipboard.writeText(chatUrl).then(() => {
      alert('Chat URL copied to clipboard');
    }, () => {
      alert('Failed to copy URL');
    });
  };

  const toggleMenu = (index) => {
    setMenuOpen(menuOpen === index ? null : index);
  };

  const handleEdit = (index) => {
    setEditMode(true);
    setEditIndex(index);
    setInput(messages[index].user);
  };

  const scrollToBottom = () => {
    messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <div className="w-1/4 bg-white shadow-lg p-4 rounded-r-lg flex-shrink-0 overflow-y-auto" style={{ height: '100vh' }}>
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">Chat History</h2>
        <div className="space-y-2 mb-4">
          {titles.map((title, index) => (
            <div key={index} className="flex justify-between items-center relative group">
              <button
                onClick={() => loadChat(index)}
                className="block w-full text-left p-3 rounded-lg hover:bg-gray-200 transition duration-300 ease-in-out"
              >
                {title}
              </button>
              <div className="relative">
                <button
                  onClick={() => toggleMenu(index)}
                  className="text-gray-500 hover:text-gray-700 transition duration-300 ease-in-out"
                >
                  <FaEllipsisV />
                </button>
                {menuOpen === index && (
                  <div className="absolute right-0 mt-2 w-40 bg-white shadow-lg rounded-md overflow-hidden z-10">
                    <button
                      onClick={() => handleEdit(index)}
                      className="flex items-center w-full p-2 hover:bg-yellow-100 text-yellow-700 transition duration-300 ease-in-out"
                    >
                      <FaEdit className="mr-2" /> Edit Prompt
                    </button>
                    <button
                      onClick={() => deleteChat(index)}
                      className="flex items-center w-full p-2 hover:bg-red-100 text-red-700 transition duration-300 ease-in-out"
                    >
                      <FaTrashAlt className="mr-2" /> Delete
                    </button>
                    <button
                      onClick={() => shareChat(index)}
                      className="flex items-center w-full p-2 hover:bg-blue-100 text-blue-700 transition duration-300 ease-in-out"
                    >
                      <FaShareAlt className="mr-2" /> Share
                    </button>
                  </div>
                )}
              </div>
            </div>
          ))}
          <button
            onClick={startNewChat}
            className="block w-full text-left p-3 bg-blue-500 text-white rounded-lg hover:bg-purple-600 transition duration-300 ease-in-out"
          >
            + New Chat
          </button>
        </div>
      </div>

      {/* Main Chat Area */}
      <div className="flex flex-col flex-grow bg-white shadow-lg rounded-l-lg">
        <div className="bg-blue-500 text-white p-5 rounded-t-lg">
          <h2 className="text-2xl font-bold">Skill Gap Analysis Chatbot</h2>
        </div>
        <div className="flex-grow overflow-y-auto p-6 bg-gray-50" style={{ maxHeight: 'calc(100vh - 112px)' }}>
          {messages.map((msg, index) => (
            <div key={index} className={`message mb-4 ${msg.user ? 'text-right' : 'text-left'}`}>
              {msg.user ? (
                <div className="inline-block bg-blue-100 text-blue-900 p-4 rounded-lg shadow-md">
                  <strong>You:</strong> {msg.user}
                </div>
              ) : (
                <div className="inline-block bg-green-100 text-green-900 p-4 rounded-lg shadow-md">
                  <strong>Gemini:</strong> {msg.gemini}
                </div>
              )}
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>
        <div className="flex p-5 bg-gray-200 rounded-b-lg">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
            className="border p-3 flex-grow rounded-l-lg focus:outline-none focus:border-blue-500 transition duration-300 ease-in-out"
            placeholder="Hint: Start by saying Hello!!!"
          />
          <button
            onClick={sendMessage}
            className="bg-blue-500 text-white p-3 rounded-r-lg hover:bg-blue-600 transition duration-300 ease-in-out focus:outline-none"
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
};

export default SkillBot;