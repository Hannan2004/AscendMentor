import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

function ChatbotInterview() {
  const [chatHistory, setChatHistory] = useState([]);
  const [userInput, setUserInput] = useState('');
  const [loading, setLoading] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const initialResponse = location.state?.initialResponse || "Welcome to the mock interview chat. I am JobGemini. Let's get started with the interview. Can you tell me a little about yourself and your career goals?";
    setChatHistory([{ role: 'model', text: initialResponse }]);
  }, [location.state]);

  const handleSubmit = async () => {
    if (!userInput.trim()) return; // Prevent sending empty messages
    setLoading(true);
    try {
      const res = await fetch('http://localhost:3001/interview', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ userInput }),
      });

      if (!res.ok) {
        throw new Error('Unexpected error');
      }

      const data = await res.json();

      // Update chat history with user input and chatbot response
      setChatHistory([...chatHistory, { role: 'user', text: userInput }, { role: 'model', text: data.response }]);
      setUserInput('');
    } catch (error) {
      console.error('Error during chat:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto p-4 flex flex-col h-screen bg-gray-100">
      <div className="flex-grow overflow-y-auto mb-4 p-4 bg-white rounded shadow">
        <div className="chat-history space-y-4">
          {chatHistory.map((message, index) => (
            <div
              key={index}
              className={`message ${message.role === 'user' ? 'text-right' : 'text-left'} p-2 rounded-md ${
                message.role === 'user' ? 'bg-blue-100' : 'bg-gray-200'
              }`}
            >
              {message.text}
            </div>
          ))}
        </div>
      </div>
      <div className="input-area flex items-center space-x-2">
        <input
          type="text"
          value={userInput}
          onChange={(e) => setUserInput(e.target.value)}
          disabled={loading}
          placeholder="Type your response..."
          className="flex-grow p-2 border border-gray-300 rounded-md"
        />
        <button
          onClick={handleSubmit}
          disabled={loading}
          className={`px-4 py-2 rounded-md text-white ${loading ? 'bg-gray-400' : 'bg-blue-500 hover:bg-blue-600'}`}
        >
          {loading ? 'Sending...' : 'Send'}
        </button>
      </div>
    </div>
  );
}

export default ChatbotInterview;
