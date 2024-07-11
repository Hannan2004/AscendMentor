import React, { useState } from 'react';
import axios from 'axios';

const LearningPlan = () => {
  const [input, setInput] = useState('');
  const [plan, setPlan] = useState('');
  const [loading, setLoading] = useState(false);

  const handleInputChange = (e) => {
    setInput(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!input) return;

    setLoading(true);
    try {
      const response = await axios.post('http://localhost:3001/learning', { input });
      setPlan(response.data.plan);
    } catch (error) {
      console.error('Error generating learning plan:', error);
    }
    setLoading(false);
  };

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h1 className="text-3xl font-bold mb-6 text-center">Dynamic Learning Plan</h1>
      <form onSubmit={handleSubmit} className="mb-6">
        <div className="mb-4">
          <label
            htmlFor="input"
            className="block text-sm font-medium text-gray-700"
          >
            Enter your career goals or skill gaps
          </label>
          <textarea
            id="input"
            value={input}
            onChange={handleInputChange}
            rows="4"
            className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 mt-1 p-2"
            placeholder="I am a third-year student looking to explore a career in machine learning"
          />
        </div>
        <button
          type="submit"
          className="w-full px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          {loading ? 'Generating...' : 'Submit'}
        </button>
      </form>
      {plan && (
        <div className="mt-6 p-4 bg-gray-100 rounded-lg shadow">
          <h2 className="text-2xl font-bold mb-4">Learning Plan</h2>
          <p className="text-gray-700 whitespace-pre-wrap">{plan}</p>
        </div>
      )}
    </div>
  );
};

export default LearningPlan;
