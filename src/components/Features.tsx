
import React from 'react';
import { Zap, Calendar, BarChart2, Shield, Users, User, Activity, Repeat, UserCheck, ShieldAlert } from 'lucide-react';

const featuresData = [
  { icon: <Zap size={32} className="text-api-green" />, title: "Livescore", description: "Real-time scores & events" },
  { icon: <Calendar size={32} className="text-api-green" />, title: "Fixtures", description: "All matches with pre-match odds" },
  { icon: <BarChart2 size={32} className="text-api-green" />, title: "Standings", description: "Leagues & cups rankings" },
  { icon: <Shield size={32} className="text-api-green" />, title: "Events", description: "All match events with players" },
  { icon: <Users size={32} className="text-api-green" />, title: "Lineups", description: "Match lineups with formations" },
  { icon: <User size={32} className="text-api-green" />, title: "Players", description: "Players, seasons, statistics" },
  { icon: <Activity size={32} className="text-api-green" />, title: "Statistics", description: "Team & player statistics" },
  { icon: <BarChart2 size={32} className="text-api-green" />, title: "Predictions", description: "Based on a unique algorithm" },
  { icon: <Zap size={32} className="text-api-green" />, title: "Odds", description: "Pre-match & live odds" },
  { icon: <Repeat size={32} className="text-api-green" />, title: "Transfers", description: "Players transfers" },
  { icon: <UserCheck size={32} className="text-api-green" />, title: "Coachs", description: "Coachs with their careers" },
  { icon: <ShieldAlert size={32} className="text-api-green" />, title: "Injuries", description: "Players injuries" },
];

const FeatureCard = ({ icon, title, description }: { icon: React.ReactNode, title: string, description: string }) => (
  <div className="bg-api-dark-secondary p-6 rounded-lg text-center flex flex-col items-center">
    {icon}
    <h3 className="mt-4 text-xl font-bold text-white">{title}</h3>
    <p className="mt-2 text-gray-400">{description}</p>
  </div>
);

const Features: React.FC = () => {
  return (
    <section className="py-20 sm:py-28">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {featuresData.map((feature, index) => (
            <FeatureCard key={index} {...feature} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
  