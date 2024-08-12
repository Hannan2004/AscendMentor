import React, { useState } from 'react';

const LearningPlanForm = () => {
  const [skill, setSkill] = useState('');
  const [dailyHours, setDailyHours] = useState('');
  const [months, setMonths] = useState('');
  const [learningPlan, setLearningPlan] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false); // Add loading state
  const [successMessage, setSuccessMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccessMessage('');
    setLoading(true); // Set loading to true when the form is submitted

    try {
      const response = await fetch('http://localhost:3001/learning', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ skill, dailyHours, months }),
      });

      if (!response.ok) {
        const message = await response.json();
        throw new Error(message.error || 'Failed to generate learning plan');
      }

      const data = await response.json();
      setLearningPlan(data.plan);
      setSuccessMessage('Learning plan successfully generated!');
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false); // Set loading to false when the request is complete
    }
  };

  const handleDailyHoursChange = (e) => {
    const value = e.target.value;
    if (value >= 0 && value <= 24) {
      setDailyHours(value);
    }
  };

  const handleMonthsChange = (e) => {
    const value = e.target.value;
    if (value > 0) {
      setMonths(value);
    }
  };

  const renderLearningPlan = () => {
    if (!learningPlan) return null;

    if (typeof learningPlan === 'object' && !Array.isArray(learningPlan)) {
      return (
        <div className="mt-6">
          <h2 className="text-xl font-bold mb-2">Your Personalized Learning Plan</h2>
          <div className="bg-gray-100 p-4 rounded">
            <ol className="list-decimal pl-5">
              {Object.entries(learningPlan).map(([key, task]) => (
                <li key={key} className="mb-2">
                  {task}
                </li>
              ))}
            </ol>
          </div>
        </div>
      );
    }

    if (typeof learningPlan === 'string') {
      return (
        <div className="mt-6">
          <h2 className="text-xl font-bold mb-2">Your Personalized Learning Plan</h2>
          <div className="bg-gray-100 p-4 rounded">
            <ol className="list-decimal pl-5">
              {learningPlan.split('\n').filter(task => task.trim() !== '').map((task, index) => (
                <li key={index} className="mb-2">
                  {task.trim()}
                </li>
              ))}
            </ol>
          </div>
        </div>
      );
    }

    return <div>Unsupported format of learning plan data.</div>;
  };

  // Inline styles for the loading spinner
  const spinnerStyle = {
    border: '4px solid rgba(0, 0, 0, 0.1)',
    borderRadius: '50%',
    borderTop: '4px solid #e74c3c',
    width: '24px',
    height: '24px',
    animation: 'spin 1s linear infinite',
  };

  // Inline styles for the spinner container
  const spinnerContainerStyle = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: '10px',
  };

  return (
    <div className="bg-gradient-to-r from-blue-500 to-purple-600 min-h-screen flex flex-col justify-center items-center p-4">
      <div className="bg-white p-8 rounded-lg shadow-lg w-[60rem] border border-gray-300">
        <h1 className="text-2xl font-bold mb-4">Personalized Learning Plan Generator</h1>
        <form onSubmit={handleSubmit} className="relative">
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
              Daily Hours (0-24)
            </label>
            <input
              type="number"
              id="dailyHours"
              value={dailyHours}
              onChange={handleDailyHoursChange}
              className="w-full p-2 border border-gray-300 rounded"
              required
              min="0"
              max="24"
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
              onChange={handleMonthsChange}
              className="w-full p-2 border border-gray-300 rounded"
              required
              min="1"
            />
          </div>
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded flex items-center"
            style={{ position: 'relative' }}
          >
            Generate Learning Plan
            {loading && (
              <div style={spinnerContainerStyle}>
                <div style={spinnerStyle}></div>
              </div>
            )}
          </button>
        </form>

        {error && <div className="text-red-500 mt-4">{error}</div>}
        {successMessage && <div className="text-green-500 mt-4">{successMessage}</div>}

        {renderLearningPlan()}
      </div>
    </div>
  );
};

export default LearningPlanForm;
