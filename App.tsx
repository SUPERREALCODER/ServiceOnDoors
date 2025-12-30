
import React, { useState } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Services from './components/Services';
import BookingModal from './components/BookingModal';
import Dashboard from './components/Dashboard';
import AIChatAssistant from './components/AIChatAssistant';
import { Booking, BookingStatus, ServiceCategory, User, Feedback } from './types';

const App: React.FC = () => {
  const [view, setView] = useState<'home' | 'dashboard'>('home');
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);
  const [selectedService, setSelectedService] = useState<ServiceCategory | null>(null);
  const [user, setUser] = useState<User>({
    name: "Customer",
    phone: "",
    bookings: []
  });

  const handleBooking = async (newBooking: Partial<Booking>) => {
    // 1. Create Initial "Dispatching" Booking
    const bookingId = `SOD-${Math.floor(Math.random() * 90000) + 10000}`;
    const initialBooking: Booking = {
      id: bookingId,
      service: newBooking.service || ServiceCategory.RO,
      subService: newBooking.subService || 'General Checkup',
      customerName: newBooking.customerName || user.name,
      phone: newBooking.phone || 'N/A',
      address: newBooking.address || 'Location Shared via App',
      date: new Date().toLocaleString(),
      status: BookingStatus.DISPATCHING,
    };

    setUser(prev => ({
      ...prev,
      bookings: [initialBooking, ...prev.bookings]
    }));
    
    setIsBookingModalOpen(false);
    setView('dashboard');

    // 2. Simulate Automated Dispatch (3 seconds later)
    setTimeout(() => {
      setUser(prev => {
        const updatedBookings = prev.bookings.map(b => {
          if (b.id === bookingId) {
            return {
              ...b,
              status: BookingStatus.ASSIGNED,
              technician: {
                id: "TECH-99",
                name: "Amit Kumar",
                phone: "+91 98XXX XXX01",
                rating: 4.9
              }
            };
          }
          return b;
        });
        return { ...prev, bookings: updatedBookings };
      });
    }, 3000);
  };

  const handleCompleteService = (bookingId: string) => {
    setUser(prev => ({
      ...prev,
      bookings: prev.bookings.map(b => 
        b.id === bookingId ? { ...b, status: BookingStatus.COMPLETED } : b
      )
    }));
  };

  const handleFeedback = (bookingId: string, feedback: Feedback) => {
    setUser(prev => ({
      ...prev,
      bookings: prev.bookings.map(b => 
        b.id === bookingId ? { ...b, feedback } : b
      )
    }));
  };

  const openBooking = (category?: ServiceCategory) => {
    setSelectedService(category || null);
    setIsBookingModalOpen(true);
  };

  return (
    <div className="min-h-screen relative overflow-x-hidden bg-slate-50">
      <Navbar setView={setView} currentView={view} />
      
      <main className="pb-20">
        {view === 'home' ? (
          <>
            <Hero onBook={openBooking} />
            <Services onSelectService={openBooking} />
            <section className="max-w-7xl mx-auto px-4 py-16">
               <div className="bg-indigo-600 rounded-[2.5rem] p-8 md:p-16 flex flex-col md:flex-row items-center justify-between shadow-2xl gap-8 relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -mr-32 -mt-32 blur-3xl"></div>
                  <div className="text-white max-w-xl relative z-10">
                    <h2 className="text-4xl font-black mb-6 leading-tight tracking-tight">Ready for a smarter home service?</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                       <div className="bg-white/10 p-4 rounded-2xl backdrop-blur-sm">
                          <p className="text-xs font-bold uppercase opacity-60 mb-1">Average Dispatch</p>
                          <p className="text-xl font-bold">140 Seconds</p>
                       </div>
                       <div className="bg-white/10 p-4 rounded-2xl backdrop-blur-sm">
                          <p className="text-xs font-bold uppercase opacity-60 mb-1">Customer Rating</p>
                          <p className="text-xl font-bold">4.8 / 5.0 ★</p>
                       </div>
                    </div>
                  </div>
                  <button 
                    onClick={() => openBooking()}
                    className="relative z-10 bg-white text-indigo-600 px-10 py-5 rounded-2xl font-black text-lg hover:scale-105 transition shadow-2xl"
                  >
                    Auto-Book Now
                  </button>
               </div>
            </section>
          </>
        ) : (
          <Dashboard 
            user={user} 
            onComplete={handleCompleteService}
            onFeedback={handleFeedback}
          />
        )}
      </main>

      {isBookingModalOpen && (
        <BookingModal 
          isOpen={isBookingModalOpen} 
          onClose={() => setIsBookingModalOpen(false)} 
          initialService={selectedService}
          onSubmit={handleBooking}
        />
      )}

      <AIChatAssistant />
      
      <footer className="bg-slate-900 text-slate-400 py-16 px-4">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-12">
          <div>
            <p className="text-white font-black text-2xl mb-4">ServiceOnDoor</p>
            <p className="text-sm leading-relaxed">The automation-first home service platform. Using technology to make home maintenance effortless.</p>
          </div>
          <div className="space-y-2 text-sm">
            <p className="text-white font-bold mb-2">Platform</p>
            <p>Technician App</p>
            <p>Customer Dashboard</p>
            <p>API Documentation</p>
          </div>
          <div className="space-y-2 text-sm">
            <p className="text-white font-bold mb-2">Company</p>
            <p>About Us</p>
            <p>Careers</p>
            <p>Terms of Service</p>
          </div>
        </div>
        <div className="max-w-7xl mx-auto pt-12 mt-12 border-t border-slate-800 text-center text-xs">
          © 2024 ServiceOnDoor Inc. All rights reserved.
        </div>
      </footer>
    </div>
  );
};

export default App;
