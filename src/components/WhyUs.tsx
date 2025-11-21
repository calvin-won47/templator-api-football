
import React from 'react';
import { Rocket, Globe, Code, LifeBuoy } from 'lucide-react';

const whyUsData = [
  {
    icon: <Rocket className="text-api-green" size={32} />,
    title: "Fastest API",
    description: "Our API is hosted on a scalable cloud infrastructure that provides a 99.99% uptime and a very low latency."
  },
  {
    icon: <Globe className="text-api-green" size={32} />,
    title: "Largest Coverage",
    description: "We cover more than 1000 football competitions. We are constantly adding new leagues and cups."
  },
  {
    icon: <Code className="text-api-green" size={32} />,
    title: "Easy integration",
    description: "Our documentation is clear and simple. We provide code examples in many languages to help you get started."
  },
  {
    icon: <LifeBuoy className="text-api-green" size={32} />,
    title: "Best support",
    description: "Our support team is available to help you with any questions you may have. We are here to help you succeed."
  }
];

const WhyUs: React.FC = () => {
  return (
    <section className="bg-api-dark-secondary py-20 sm:py-28">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto">
          <h2 className="text-4xl font-bold text-white">Why us?</h2>
          <p className="mt-4 text-lg text-gray-400">The best API to develop your application</p>
        </div>
        <div className="mt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {whyUsData.map((item, index) => (
            <div key={index} className="text-center">
              <div className="flex justify-center items-center mb-4">
                {item.icon}
              </div>
              <h3 className="text-xl font-semibold text-white">{item.title}</h3>
              <p className="mt-2 text-gray-400">{item.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyUs;
  