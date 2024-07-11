import React, { useState } from 'react';
import axios from 'axios';

const SkillBot = () => {
    const [input, setInput] = useState('');
    const [context, setContext] = useState([]);
    const [messages, setMessages] = useState([]);
    
    const sendMessage = async () => {
      if (!input.trim()) return; 

      const newMessage = { user: input };
      setMessages([...messages, newMessage]);
      setInput('');

      try {
          const response = await axios.post('http://localhost:3001/skillbot', { input });
          const botMessage = { bot: response.data.response };
          setMessages([...messages, botMessage]);
      } catch (error) {
          console.error('Error sending message:', error);
      }
    };

    return (
      <div className="container mx-auto p-4">
          <div className="bg-white p-6 rounded-lg shadow-md">
              <h2 className="text-2xl font-bold mb-4">Skill Gap Analysis Chatbot</h2>
              <div className="messages mb-4">
                  {messages.map((msg, index) => (
                      <div key={index} className={`message ${msg.user ? 'user-message' : 'bot-message'}`}>
                          {msg.user && <div className="text-blue-500"><strong>You:</strong> {msg.user}</div>}
                          {msg.bot && <div className="text-green-500"><strong>Bot:</strong> {msg.bot}</div>}
                      </div>
                  ))}
              </div>
              <div className="flex">
                  <input
                      type="text"
                      value={input}
                      onChange={(e) => setInput(e.target.value)}
                      onKeyPress={(e) => e.key === 'Enter' && sendMessage()} // Allow Enter key to send message
                      className="border p-3 flex-grow mr-2 rounded-lg focus:outline-none focus:border-blue-500"
                      placeholder="Ask the chatbot..."
                  />
                  <button
                      onClick={sendMessage}
                      className="bg-blue-500 text-white p-3 rounded-lg hover:bg-blue-600 focus:outline-none"
                  >
                      Send
                  </button>
              </div>
          </div>
      </div>
  );  
};

export default SkillBot;