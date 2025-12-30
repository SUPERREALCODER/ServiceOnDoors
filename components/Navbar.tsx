
import React from 'react';

interface NavbarProps {
  setView: (view: 'home' | 'dashboard') => void;
  currentView: string;
}

const Navbar: React.FC<NavbarProps> = ({ setView, currentView }) => {
  return (
    <nav className="sticky top-0 z-50 glass border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
        <div 
          className="flex items-center gap-2 cursor-pointer"
          onClick={() => setView('home')}
        >
          <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center">
             <span className="text-white font-black">S</span>
          </div>
          <span className="text-xl font-bold tracking-tight text-indigo-600">ServiceOnDoor</span>
        </div>

        <div className="hidden md:flex items-center gap-8 text-sm font-medium">
          <button onClick={() => setView('home')} className={currentView === 'home' ? 'text-indigo-600' : 'hover:text-indigo-600 transition'}>Home</button>
          <button className="hover:text-indigo-600 transition">All Services</button>
          <button className="hover:text-indigo-600 transition">How it Works</button>
        </div>

        <div className="flex items-center gap-3">
          <button 
            onClick={() => setView('dashboard')}
            className={`px-4 py-2 rounded-lg text-sm font-semibold transition ${
              currentView === 'dashboard' ? 'bg-indigo-600 text-white' : 'border border-slate-300 hover:bg-slate-50'
            }`}
          >
            My Bookings
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
