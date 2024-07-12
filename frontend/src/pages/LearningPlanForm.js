import React, { useState } from 'react';

const LearningPlanForm = () => {
  const [skill, setSkill] = useState('');
  const [dailyHours, setDailyHours] = useState('');
  const [months, setMonths] = useState('');
  const [learningPlan, setLearningPlan] = useState(null);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    try {
      const response = await fetch('http://localhost:3001/test', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ skill, dailyHours, months }),
      });

      if(!response.ok) {
        const message = await response.json();
        throw new Error(message.error || 'Failed to generate learning plan');
      }

      const data = await response.json();
      setLearningPlan(data);
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Personalized Learning Plan Generator</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-sm font-medium mb-2" htmlFor="skill">
            Skill
          </label>
          <input
            type="text"
            id="skill"
            value={skill}
            onChange={(e) => setSkill(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium mb-2" htmlFor="dailyHours">
            Daily Hours
          </label>
          <input
            type="number"
            id="dailyHours"
            value={dailyHours}
            onChange={(e) => setDailyHours(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium mb-2" htmlFor="months">
            Months
          </label>
          <input
            type="number"
            id="months"
            value={months}
            onChange={(e) => setMonths(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded"
            required
          />
        </div>
        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
          Generate Learning Plan
        </button>
      </form>

      {error && <div className="text-red-500 mt-4">{error}</div>}

      {learningPlan && (
        <div className="mt-6">
          <h2 className="text-xl font-bold mb-2">Your Personalized Learning Plan</h2>
          <p className="bg-gray-100 p-4 rounded">{JSON.stringify(learningPlan, null, 2)}</p>
        </div>
      )}
    </div>
  );
};

export default LearningPlanForm;
