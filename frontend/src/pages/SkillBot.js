import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';

const SkillBot = () => {
    const [input, setInput] = useState('');
    const [messages, setMessages] = useState([]);
    const messagesEndRef = useRef(null);

    const sendMessage = async () => {
        if (!input.trim()) return;

        const newMessage = { user: input };
        const updatedMessages = [...messages, newMessage];
        setMessages(updatedMessages);
        setInput('');

        try {
            const response = await axios.post('http://localhost:3001/skillbot', { input });
            const geminiMessage = { gemini: response.data.response };
            setMessages([...updatedMessages, geminiMessage]);
        } catch (error) {
            console.error('Error sending message:', error);
        }
    };

    const scrollToBottom = () => {
        messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
            <div className="bg-white rounded-lg shadow-md w-full max-w-2xl">
                <div className="bg-blue-500 text-white p-4 rounded-t-lg">
                    <h2 className="text-2xl font-bold">Skill Gap Analysis Chatbot</h2>
                </div>
                <div className="messages h-96 overflow-y-auto p-4 bg-white">
                    {messages.map((msg, index) => (
                        <div key={index} className={`message ${msg.user ? 'user-message' : 'gemini-message'} mb-2`}>
                            {msg.user ? (
                                <div className="text-blue-500 text-right">
                                    <strong>You:</strong> {msg.user}
                                </div>
                            ) : (
                                <div className="text-green-500 text-left">
                                    <strong>Gemini:</strong> {msg.gemini}
                                </div>
                            )}
                        </div>
                    ))}
                    <div ref={messagesEndRef} />
                </div>
                <div className="flex p-4 bg-gray-200 rounded-b-lg">
                    <input
                        type="text"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
                        className="border p-3 flex-grow rounded-l-lg focus:outline-none focus:border-blue-500"
                        placeholder="Hint: Start by saying Hello!!!"
                    />
                    <button
                        onClick={sendMessage}
                        className="bg-blue-500 text-white p-3 rounded-r-lg hover:bg-blue-600 focus:outline-none"
                    >
                        Send
                    </button>
                </div>
            </div>
        </div>
    );
};

export default SkillBot;
