import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function InterviewForm() {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    skills: '',
    experience: '',
    projects: '',
    jobPosition: ''
  });
  // const [response, setResponse] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleNext = () => {
    setStep(step + 1);
  };

  const handlePrev = () => {
    setStep(step - 1);
  }; 

  const handleSubmit = async (e) => {
    e.preventDefault();
    //setResponse('');
    setError('');
    setLoading(true);
    try {
      const res = await fetch('http://localhost:3001/interview', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ userInput: JSON.stringify(formData) }),
      });
  
      if (!res.ok) {
        const errorDetails = await res.json();
        throw new Error(errorDetails.details || 'Unexpected error');
      }
  
      const data = await res.json();
      // setResponse(data.response);
      navigate('/interview', { state: { initialResponse: data.response } });
    } catch (error) {
      console.error('Error during mock interview:', error);
      setError('An error occurred: ' + error.message);
    } finally {
      setLoading(false);
    }
  };
  

  return (
    <div className="bg-gradient-to-r from-blue-500 to-purple-600 min-h-screen flex flex-col justify-center items-center p-4">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md border border-gray-300 mb-8">
        <h1 className="text-2xl font-bold mb-4 text-gray-800">Mock Interview Form</h1>
        <form onSubmit={handleSubmit}>
          {step === 1 && (
            <div className="mb-4">
              <label htmlFor="name" className="block text-lg font-medium mb-2 text-gray-800">Name:</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded"
                required
              />
              <label htmlFor="email" className="block text-lg font-medium mb-2 text-gray-800">Email:</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded"
                required
              />
              <label htmlFor="phone" className="block text-lg font-medium mb-2 text-gray-800">Phone:</label>
              <input
                type="tel"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded"
                required
              />
              <button type="button" onClick={handleNext} className="mt-4 px-4 py-2 bg-white text-blue-700 rounded">Next</button>
            </div>
          )}

          {step === 2 && (
            <div className="mb-4">
              <label htmlFor="skills" className="block text-lg font-medium mb-2 text-gray-800">Skills:</label>
              <textarea
                id="skills"
                name="skills"
                rows="4"
                value={formData.skills}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded"
                placeholder="e.g. JavaScript, React, Node.js"
                required
              />
              <label htmlFor="experience" className="block text-lg font-medium mb-2 text-gray-800">Experience:</label>
              <textarea
                id="experience"
                name="experience"
                rows="4"
                value={formData.experience}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded"
                placeholder="e.g. Frontend Developer at Tech Solutions Inc. for 2 years"
                required
              />
              <div className="flex justify-between mt-4">
                <button type="button" onClick={handlePrev} className="px-4 py-2 bg-gray-300 text-black rounded">Previous</button>
                <button type="button" onClick={handleNext} className="px-4 py-2 bg-blue-500 text-white rounded">Next</button>
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="mb-4">
              <label htmlFor="projects" className="block text-lg font-medium mb-2 text-gray-800">Projects:</label>
              <textarea
                id="projects"
                name="projects"
                rows="4"
                value={formData.projects}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded"
                placeholder="e.g. E-commerce Website: Developed a full-stack e-commerce website..."
                required
              />
              <label htmlFor="jobPosition" className="block text-lg font-medium mb-2 text-gray-800">Job Position:</label>
              <input
                type="text"
                id="jobPosition"
                name="jobPosition"
                value={formData.jobPosition}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded"
                placeholder="e.g. Full Stack Developer"
                required
              />
              <div className="flex justify-between mt-4">
                <button type="button" onClick={handlePrev} className="px-4 py-2 bg-gray-300 text-black rounded">Previous</button>
                <button type="submit" className="px-4 py-2 bg-green-500 text-white rounded">
                  {loading ? 'Submitting...' : 'Submit'}
                </button>
              </div>
            </div>
          )}
        </form>
        {error && (
          <div className="text-red-500 mt-4">{error}</div>
        )}
      </div>
    </div>
  );
}

export default InterviewForm;