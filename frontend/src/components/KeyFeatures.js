import React from 'react';

const features = [
  {
    title: "Skill Gap Analysis",
    description: "Identify your skill gaps and get targeted recommendations.",
    icon: "🔍",
  },
  {
    title: "Personalized Learning Plans",
    description: "Receive customized learning plans based on your goals.",
    icon: "📈",
  },
  {
    title: "AI Resume Review",
    description: "Get feedback on your resume to improve your job prospects.",
    icon: "📝",
  },
  {
    title: "Mock Interviews",
    description: "Practice and prepare for interviews with our AI-driven mock interviews.",
    icon: "🎤",
  },
];

const KeyFeatures = () => {
  return (
    <section className="py-12 bg-white bg-gradient-to-r from-blue-500 to-purple-600">
      <div className="container mx-auto px-6">
        <h2 className="text-3xl font-bold text-center mb-6 text-white">Key Features</h2>
        <div className="flex flex-wrap -mx-4">
          {features.map((feature, index) => (
            <div key={index} className="w-full md:w-1/2 lg:w-1/4 px-4 mb-8">
              <div className="bg-gray-100 p-6 rounded-lg shadow-lg text-center">
                <div className="text-4xl mb-4">{feature.icon}</div>
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p>{feature.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default KeyFeatures;
