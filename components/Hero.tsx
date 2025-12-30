
import React from 'react';
import { ServiceCategory } from '../types';

interface HeroProps {
  onBook: (category?: ServiceCategory) => void;
}

const Hero: React.FC<HeroProps> = ({ onBook }) => {
  return (
    <div className="relative bg-white pt-10 pb-16 overflow-hidden">
      <div className="absolute top-0 right-0 -mr-20 -mt-20 w-96 h-96 bg-indigo-100 rounded-full blur-3xl opacity-50"></div>
      <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-96 h-96 bg-emerald-100 rounded-full blur-3xl opacity-50"></div>
      
      <div className="max-w-7xl mx-auto px-4 relative z-10 text-center md:text-left">
        <div className="flex flex-col md:flex-row items-center gap-12">
          <div className="flex-1 space-y-6">
            <div className="inline-block px-3 py-1 bg-indigo-100 text-indigo-700 rounded-full text-xs font-bold uppercase tracking-wider">
               Automated Technician Dispatching
            </div>
            <h1 className="text-4xl md:text-6xl font-extrabold text-slate-900 leading-tight">
              One Tap to <br />
              <span className="text-indigo-600">Automate Repairs.</span>
            </h1>
            <p className="text-lg text-slate-600 max-w-lg">
              ServiceOnDoor connects you with verified pros using AI-powered dispatching. 
              Book in seconds, track in real-time, rate with ease.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <button 
                onClick={() => onBook(ServiceCategory.AC)}
                className="px-8 py-4 bg-indigo-600 text-white rounded-xl font-bold shadow-lg shadow-indigo-200 hover:bg-indigo-700 transition transform hover:-translate-y-1"
              >
                Fastest AC Repair
              </button>
              <button 
                onClick={() => onBook(ServiceCategory.RO)}
                className="px-8 py-4 bg-white border-2 border-slate-200 text-slate-700 rounded-xl font-bold hover:bg-slate-50 transition transform hover:-translate-y-1"
              >
                Water Purifier Service
              </button>
            </div>
          </div>
          
          <div className="flex-1 hidden lg:block">
            <div className="relative">
              <img 
                src="https://images.unsplash.com/photo-1581094794329-c8112a89af12?auto=format&fit=crop&q=80&w=800" 
                alt="App Interface" 
                className="rounded-3xl shadow-2xl border-8 border-white object-cover h-[450px]"
              />
              <div className="absolute -bottom-6 -right-6 bg-white p-6 rounded-2xl shadow-xl border border-slate-100 animate-slide-in">
                 <div className="flex items-center gap-4">
                   <div className="relative">
                      <div className="w-12 h-12 bg-indigo-600 rounded-full flex items-center justify-center text-white text-xl">📍</div>
                      <div className="absolute -top-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-white animate-pulse"></div>
                   </div>
                   <div>
                     <p className="text-xs text-slate-500 font-bold uppercase">Auto-Dispatch active</p>
                     <p className="text-sm font-black text-slate-800">Technician Assigned ⚡</p>
                   </div>
                 </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
