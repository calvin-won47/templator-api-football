
import React from 'react';

const steps = [
  { number: 1, title: "Create an account", description: "It's free and takes less than a minute." },
  { number: 2, title: "Get your API key", description: "Your API key is available on your dashboard." },
  { number: 3, title: "Start to build", description: "Integrate the API into your application." },
];

const GetStarted: React.FC = () => {
  return (
    <section className="py-20 sm:py-28">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-4xl font-bold text-white">Get started in minutes</h2>
        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-12 max-w-5xl mx-auto">
          {steps.map((step) => (
            <div key={step.number} className="relative">
              <div className="flex flex-col items-center">
                <div className="flex items-center justify-center w-16 h-16 bg-api-dark-secondary rounded-full border-2 border-api-green text-api-green text-2xl font-bold">
                  {step.number}
                </div>
                <h3 className="mt-6 text-xl font-semibold text-white">{step.title}</h3>
                <p className="mt-2 text-gray-400">{step.description}</p>
              </div>
              {step.number < 3 && (
                <div className="hidden md:block absolute top-8 left-1/2 w-full">
                  <svg className="text-gray-700" width="100%" height="2">
                    <line x1="50%" y1="1" x2="150%" y2="1" stroke="currentColor" strokeWidth="2" strokeDasharray="6, 6" />
                  </svg>
                </div>
              )}
            </div>
          ))}
        </div>
        <div className="mt-16">
          <a href="#" className="bg-api-green text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-green-500 transition-all duration-300 transform hover:scale-105">
            Get Started
          </a>
        </div>
      </div>
    </section>
  );
};

export default GetStarted;
  