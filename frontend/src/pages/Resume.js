import React, { useState } from 'react';
import axios from 'axios';

const ResumeReview = () => {
  const [file, setFile] = useState(null);
  const [review, setReview] = useState('');
  const [loading, setLoading] = useState(false);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file) return;

    const formData = new FormData();
    formData.append('resume', file);

    setLoading(true);
    try {
      const response = await axios.post('http://localhost:3001/review-resume', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      setReview(response.data.review);
    } catch (error) {
      console.error('Error reviewing resume:', error);
    }
    setLoading(false);
  };

  const formatReview = (text) => {
    return text
      .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>') // Bold
      .replace(/\*(.*?)\*/g, '<em>$1</em>') // Italics
      .replace(/\n/g, '<br/>') // Line breaks
      .replace(/(?:<br\/>)*\* (.*?)(?=<br\/>)/g, '<li>$1</li>') // Unordered list items
      .replace(/(?:<br\/>)*(<li>.*<\/li>)(?!<li>)/g, '<ul>$1</ul>') // Wrap list items with <ul>
      .replace(/<\/ul><ul>/g, ''); // Remove unnecessary nested <ul> elements
  };

  return (
    <div className="bg-gradient-to-r from-blue-500 to-purple-600 min-h-screen flex items-start justify-center p-6">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-3xl mt-16">
        <h1 className="text-3xl font-bold mb-6 text-center text-gray-800">Resume Review</h1>
        <form onSubmit={handleSubmit} className="mb-6">
          <div className="mb-4">
            <label
              htmlFor="resume"
              className="block text-sm font-medium text-gray-700"
            >
              Upload your resume
            </label>
            <input
              type="file"
              id="resume"
              onChange={handleFileChange}
              className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 focus:outline-none mt-1"
            />
          </div>
          {file && (
            <div className="mb-4">
              <p className="text-gray-700 text-sm mb-2">Selected file:</p>
              <div className="flex items-center space-x-4">
                <img
                  src={URL.createObjectURL(file)}
                  alt="Uploaded Resume"
                  className="w-32 h-32 object-cover rounded-lg border border-gray-300"
                />
                <span className="text-gray-900 text-sm">
                  {file.name}
                </span>
              </div>
            </div>
          )}
          <button
            type="submit"
            className="w-full px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            disabled={loading}
          >
            {loading ? 'Reviewing...' : 'Submit'}
          </button>
        </form>
        {review && (
          <div
            className="mt-6 p-4 bg-white rounded-lg shadow-md transition-opacity duration-500 ease-in-out"
            style={{ opacity: review ? 1 : 0 }}
          >
            <h2 className="text-2xl font-bold mb-4 text-center">Review Feedback</h2>
            <div
              className="text-gray-700"
              dangerouslySetInnerHTML={{ __html: formatReview(review) }}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default ResumeReview;