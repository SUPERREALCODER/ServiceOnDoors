
import React from 'react';
import { ServiceCategory } from '../types';

interface ServicesProps {
  onSelectService: (category: ServiceCategory) => void;
}

const serviceItems = [
  { 
    id: ServiceCategory.RO, 
    title: 'Water Purifier', 
    desc: 'Repair, filter change, & AMC', 
    icon: '💧', 
    color: 'bg-blue-50 text-blue-600' 
  },
  { 
    id: ServiceCategory.AC, 
    title: 'Air Conditioner', 
    desc: 'Jet cleaning & gas charging', 
    icon: '❄️', 
    color: 'bg-teal-50 text-teal-600' 
  },
  { 
    id: ServiceCategory.GEYSER, 
    title: 'Geyser Service', 
    desc: 'Installation & coil repair', 
    icon: '♨️', 
    color: 'bg-orange-50 text-orange-600' 
  },
  { 
    id: ServiceCategory.REFRIGERATOR, 
    title: 'Refrigerator', 
    desc: 'Cooling issues & part replace', 
    icon: '🧊', 
    color: 'bg-indigo-50 text-indigo-600' 
  },
  { 
    id: ServiceCategory.WASHING_MACHINE, 
    title: 'Washing Machine', 
    desc: 'Drum repair & maintenance', 
    icon: '🧺', 
    color: 'bg-pink-50 text-pink-600' 
  }
];

const Services: React.FC<ServicesProps> = ({ onSelectService }) => {
  return (
    <section className="max-w-7xl mx-auto px-4 py-16">
      <div className="mb-10 text-center md:text-left">
        <h2 className="text-3xl font-bold mb-2">Our Expertise</h2>
        <p className="text-slate-500">Professional solutions for every household appliance</p>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {serviceItems.map((item) => (
          <div 
            key={item.id}
            onClick={() => onSelectService(item.id)}
            className="group cursor-pointer bg-white p-6 rounded-2xl border border-slate-100 hover:border-blue-400 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
          >
            <div className={`w-14 h-14 ${item.color} rounded-xl flex items-center justify-center text-3xl mb-4 group-hover:scale-110 transition-transform`}>
              {item.icon}
            </div>
            <h3 className="text-xl font-bold mb-2">{item.title}</h3>
            <p className="text-slate-500 text-sm mb-6">{item.desc}</p>
            <button className="text-blue-600 font-bold text-sm flex items-center gap-1">
              Book Now <span className="text-lg">→</span>
            </button>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Services;
