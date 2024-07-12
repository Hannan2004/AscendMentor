import React from 'react';

const UserDashboard = () => {
  // Example static data
  const activities = [
    { description: 'Completed Skill Gap Analysis.' },
    { description: 'Generated Learning Plan for next month.' },
    { description: 'Attended a mock interview session.' },
  ];

  const notifications = [
    { message: 'Your skill gap analysis is ready.' },
    { message: 'New learning resources are available.' },
    { message: 'Your recent mock interview feedback is available.' },
  ];

  const skillGapAnalysis = {
    results: 'You have gaps in advanced machine learning and data encryption. Suggested resources are provided.',
  };

  const learningPlan = {
    plan: [
      'Complete the Machine Learning Specialization on Coursera.',
      'Read "Introduction to Modern Cryptography" book.',
      'Join a local AI meetup group.',
    ],
  };

  const interviewFeedback = [
    { feedback: 'Good job on explaining your projects, but try to be more concise in your answers.' },
    { feedback: 'Your problem-solving skills are strong, but work on time management during interviews.' },
  ];

  return (
    <div className="flex flex-col items-center min-h-screen bg-gray-100 p-6">
      <div className="bg-white p-8 rounded shadow-md w-full max-w-4xl">
        <h2 className="text-3xl font-bold mb-4 text-center">User Dashboard</h2>
        
        {/* Overview Section */}
        <div className="bg-gray-50 p-6 rounded shadow-sm mb-6">
          <h3 className="text-2xl font-semibold mb-4">Overview</h3>
          
          <div className="mb-6">
            <h4 className="text-xl font-semibold mb-2">User Activities</h4>
            {activities.length > 0 ? (
              <ul className="list-disc pl-5">
                {activities.map((activity, index) => (
                  <li key={index} className="text-gray-700 mb-2">{activity.description}</li>
                ))}
              </ul>
            ) : (
              <p>No activities available.</p>
            )}
          </div>
          
          <div>
            <h4 className="text-xl font-semibold mb-2">Notifications</h4>
            {notifications.length > 0 ? (
              <ul className="list-disc pl-5">
                {notifications.map((notification, index) => (
                  <li key={index} className="text-gray-700 mb-2">{notification.message}</li>
                ))}
              </ul>
            ) : (
              <p>No notifications available.</p>
            )}
          </div>
        </div>
        
        {/* Skill Gap Analysis Section */}
        <div className="bg-white p-6 rounded shadow-md mb-6">
          <h3 className="text-2xl font-semibold mb-4">Skill Gap Analysis</h3>
          <p>{skillGapAnalysis.results}</p>
        </div>
        
        {/* Learning Plan Section */}
        <div className="bg-white p-6 rounded shadow-md mb-6">
          <h3 className="text-2xl font-semibold mb-4">Learning Plan</h3>
          {learningPlan.plan.length > 0 ? (
            <ul className="list-disc pl-5">
              {learningPlan.plan.map((item, index) => (
                <li key={index} className="text-gray-700 mb-2">{item}</li>
              ))}
            </ul>
          ) : (
            <p>No learning plan available.</p>
          )}
        </div>
        
        {/* Interview Feedback Section */}
        <div className="bg-white p-6 rounded shadow-md">
          <h3 className="text-2xl font-semibold mb-4">Interview Feedback</h3>
          {interviewFeedback.length > 0 ? (
            <ul className="list-disc pl-5">
              {interviewFeedback.map((feedback, index) => (
                <li key={index} className="text-gray-700 mb-2">{feedback.feedback}</li>
              ))}
            </ul>
          ) : (
            <p>No interview feedback available.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default UserDashboard;
