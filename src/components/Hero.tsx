
import React from 'react';

const Hero: React.FC = () => {
  return (
    <section className="relative bg-cover bg-center bg-no-repeat py-32 md:py-48" style={{ backgroundImage: "url('https://picsum.photos/seed/stadium/1600/900')" }}>
      <div className="absolute inset-0 bg-api-dark opacity-80"></div>
      <div className="relative container mx-auto px-4 text-center">
        <h1 className="text-4xl md:text-6xl font-black text-white leading-tight">
          The most popular <span className="text-api-green">Football API</span>
        </h1>
        <p className="mt-6 text-lg md:text-xl text-gray-300 max-w-3xl mx-auto">
          The largest Football API covering 1000+ leagues & cups. Livescore, pre-match odds, events, line-ups, players, statistics, transfers, predictions and more...
        </p>
        <div className="mt-10">
          <a href="#" className="bg-api-green text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-green-500 transition-all duration-300 transform hover:scale-105">
            Get Started
          </a>
          <p className="mt-4 text-sm text-gray-400">Free for personal use & test</p>
        </div>
      </div>
    </section>
  );
};

export default Hero;
  