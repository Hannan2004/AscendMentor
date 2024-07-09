import React, { useState } from 'react';
import axios from 'axios';

const ChatBot = () => {
    const [input, setInput] = useState('');
    const [context, setContext] = useState([]);
    const [messages, setMessages] = useState([]);
    
    const sendMessage = async () => {
        const newMessage = { user: input};
        setMessages([...messages, newMessage]);

        try {
            const response = await axios.post('http://localhost:3001/skillbot', { input, context });
            const botMessage = { bot: response.data.response };
            setMessages([...messages, newMessage, botMessage]);
            setContext(response.data.context);
            setInput('');
        } catch (error) {
            console.error('Error sending message:', error);
        }
    };

    return (
        <div className="container mx-auto p-4">
          <div className="bg-white p-4 rounded shadow-md">
            <h2 className="text-2xl font-bold mb-4">Skill Gap Analysis Chatbot</h2>
            <div className="messages mb-4">
              {messages.map((msg, index) => (
                <div key={index} className="my-2">
                  {msg.user && <div className="text-blue-500"><strong>User:</strong> {msg.user}</div>}
                  {msg.bot && <div className="text-green-500"><strong>Bot:</strong> {msg.bot}</div>}
                </div>
              ))}
            </div>
            <div className="flex">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                className="border p-2 flex-grow mr-2"
                placeholder="Ask the chatbot..."
              />
              <button onClick={sendMessage} className="bg-blue-500 text-white p-2 rounded">Send</button>
            </div>
          </div>
        </div>
      );       
};

export default ChatBot;