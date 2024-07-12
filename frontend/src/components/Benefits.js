import React from 'react';

const benefits = [
  "Achieve your career goals faster with personalized guidance.",
  "Boost your confidence with expert feedback and preparation.",
  "Stay ahead of the competition with up-to-date resources and tools.",
];

const Benefits = () => {
  return (
    <section className="py-12 bg-gray-100">
      <div className="container mx-auto px-6">
        <h2 className="text-3xl font-bold text-center mb-6">Benefits</h2>
        <div className="flex flex-wrap -mx-4">
          {benefits.map((benefit, index) => (
            <div key={index} className="w-full md:w-1/2 lg:w-1/3 px-4 mb-8">
              <div className="bg-white p-6 rounded-lg shadow-lg text-center">
                <p>{benefit}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Benefits;
