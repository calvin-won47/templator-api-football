
import React from 'react';

const logos = [
  "Microsoft", "Bet365", "Corriere dello Sport", "Fantacalcio", "Sofascore", "SofaScore"
];

const TrustedBy: React.FC = () => {
  return (
    <div className="bg-api-dark-secondary py-16 sm:py-20">
      <div className="container mx-auto px-4">
        <h2 className="text-center text-lg font-semibold text-gray-400">
          Trusted by the biggest companies
        </h2>
        <div className="mt-10 grid grid-cols-2 gap-8 md:grid-cols-3 lg:grid-cols-6">
          {logos.map((logo, index) => (
            <div key={index} className="col-span-1 flex justify-center">
              <p className="text-2xl font-bold text-gray-500">{logo}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TrustedBy;
  