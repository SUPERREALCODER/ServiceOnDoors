
import React, { useState } from 'react';
import { User, BookingStatus, Feedback } from '../types';

interface DashboardProps {
  user: User;
  onComplete: (id: string) => void;
  onFeedback: (id: string, feedback: Feedback) => void;
}

const Dashboard: React.FC<DashboardProps> = ({ user, onComplete, onFeedback }) => {
  const [ratingInput, setRatingInput] = useState<Record<string, { rating: number, comment: string }>>({});

  const handleRatingChange = (id: string, val: number) => {
    setRatingInput(prev => ({ ...prev, [id]: { ...prev[id], rating: val } }));
  };

  const handleCommentChange = (id: string, val: string) => {
    setRatingInput(prev => ({ ...prev, [id]: { ...prev[id], comment: val } }));
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <div className="flex items-center justify-between mb-10">
        <div>
          <h1 className="text-4xl font-black text-slate-900">Bookings</h1>
          <p className="text-slate-500 font-medium">Monitoring your home services</p>
        </div>
        <div className="hidden sm:flex items-center gap-2 bg-emerald-50 text-emerald-700 px-4 py-2 rounded-full border border-emerald-100 font-bold text-xs uppercase tracking-widest">
           <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></span>
           Active Monitoring
        </div>
      </div>

      <div className="space-y-8">
        {user.bookings.length === 0 ? (
          <div className="bg-white p-16 text-center rounded-[2.5rem] border-2 border-dashed border-slate-200">
             <div className="text-6xl mb-6">🛸</div>
             <h3 className="text-2xl font-black text-slate-900">Ready to automate?</h3>
             <p className="text-slate-500 mt-2">Your booking history is empty. Start a service request on the home page.</p>
          </div>
        ) : (
          user.bookings.map(booking => {
            const isCompleted = booking.status === BookingStatus.COMPLETED;
            const isDispatching = booking.status === BookingStatus.DISPATCHING;
            const currentFeedback = ratingInput[booking.id] || { rating: 0, comment: '' };

            return (
              <div key={booking.id} className={`group relative bg-white rounded-[2rem] shadow-sm hover:shadow-xl transition-all duration-300 border border-slate-100 overflow-hidden ${isDispatching ? 'animate-pulse-slow' : ''}`}>
                 
                 {isDispatching && (
                   <div className="absolute top-0 left-0 w-full h-1 bg-indigo-100 overflow-hidden">
                     <div className="h-full bg-indigo-600 w-1/3 animate-[slide_2s_infinite]"></div>
                     <style>{`@keyframes slide { from { transform: translateX(-100%); } to { transform: translateX(300%); } }`}</style>
                   </div>
                 )}

                 <div className="p-8">
                    <div className="flex flex-col lg:flex-row gap-8">
                       <div className="flex-1">
                          <div className="flex items-center gap-3 mb-6">
                             <span className="bg-slate-100 text-slate-600 px-3 py-1 rounded-lg text-[10px] font-black tracking-widest uppercase">{booking.id}</span>
                             <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase ${
                               isCompleted ? 'bg-emerald-100 text-emerald-700' : 
                               isDispatching ? 'bg-amber-100 text-amber-700' : 'bg-indigo-100 text-indigo-700'
                             }`}>
                               {booking.status}
                             </span>
                          </div>

                          <h3 className="text-3xl font-black text-slate-900 mb-2">{booking.service}</h3>
                          <p className="text-slate-500 font-medium mb-8">{booking.subService} • Requested on {booking.date}</p>

                          {booking.technician ? (
                            <div className="flex items-center gap-5 p-5 bg-slate-50 rounded-2xl border border-slate-100">
                               <img className="w-14 h-14 rounded-2xl shadow-sm grayscale-0 group-hover:grayscale-0 transition-all" src={`https://i.pravatar.cc/150?u=${booking.technician.id}`} alt="Tech" />
                               <div>
                                 <p className="text-[10px] text-slate-400 font-black uppercase tracking-widest mb-1">Assigned Technician</p>
                                 <p className="font-black text-slate-900 text-lg">{booking.technician.name}</p>
                                 <div className="flex items-center gap-1.5 text-xs text-amber-500 font-bold">
                                   ★ {booking.technician.rating} <span className="text-slate-400 font-medium">| ID: {booking.technician.id}</span>
                                 </div>
                               </div>
                               <button className="ml-auto w-10 h-10 bg-indigo-100 text-indigo-600 rounded-xl flex items-center justify-center hover:bg-indigo-600 hover:text-white transition">
                                 📞
                               </button>
                            </div>
                          ) : isDispatching ? (
                            <div className="p-6 bg-amber-50 rounded-2xl border border-amber-100 flex flex-col items-center text-center">
                               <div className="w-8 h-8 border-4 border-amber-200 border-t-amber-600 rounded-full animate-spin mb-3"></div>
                               <p className="text-sm font-bold text-amber-800 uppercase tracking-tight">AI Dispatcher Searching...</p>
                               <p className="text-xs text-amber-600 mt-1">Locating the closest technician near {booking.address}</p>
                            </div>
                          ) : null}
                       </div>

                       <div className="lg:w-72 flex flex-col gap-4">
                          {isCompleted ? (
                            <div className="space-y-4">
                              {booking.feedback ? (
                                <div className="p-6 bg-emerald-50 rounded-2xl border border-emerald-100">
                                   <p className="text-[10px] text-emerald-600 font-black uppercase tracking-widest mb-3">Your Feedback Submitted</p>
                                   <div className="flex text-amber-500 text-xl mb-2">
                                     {'★'.repeat(booking.feedback.rating)}{'☆'.repeat(5 - booking.feedback.rating)}
                                   </div>
                                   <p className="text-sm italic text-emerald-800">"{booking.feedback.comment}"</p>
                                </div>
                              ) : (
                                <div className="bg-indigo-50 p-6 rounded-2xl border border-indigo-100">
                                   <p className="text-xs font-black text-indigo-700 uppercase mb-4 tracking-widest">Rate the service</p>
                                   <div className="flex justify-between mb-4">
                                     {[1, 2, 3, 4, 5].map(star => (
                                       <button 
                                         key={star} 
                                         onClick={() => handleRatingChange(booking.id, star)}
                                         className={`text-2xl transition-transform hover:scale-125 ${currentFeedback.rating >= star ? 'text-amber-500' : 'text-slate-300'}`}
                                       >
                                         ★
                                       </button>
                                     ))}
                                   </div>
                                   <textarea 
                                     placeholder="Optional comment..."
                                     className="w-full p-3 text-xs bg-white border border-indigo-100 rounded-lg outline-none focus:ring-1 focus:ring-indigo-400 mb-4"
                                     value={currentFeedback.comment}
                                     onChange={(e) => handleCommentChange(booking.id, e.target.value)}
                                   />
                                   <button 
                                     onClick={() => onFeedback(booking.id, { rating: currentFeedback.rating, comment: currentFeedback.comment })}
                                     disabled={currentFeedback.rating === 0}
                                     className="w-full py-3 bg-indigo-600 text-white rounded-xl text-xs font-black uppercase tracking-widest disabled:opacity-50"
                                   >
                                     Submit Feedback
                                   </button>
                                </div>
                              )}
                            </div>
                          ) : (
                            <div className="space-y-3">
                               <p className="text-[10px] text-slate-400 font-black uppercase mb-2 tracking-widest">Live Controls</p>
                               {!isDispatching && (
                                 <button 
                                   onClick={() => onComplete(booking.id)}
                                   className="w-full py-4 bg-emerald-600 text-white rounded-2xl text-xs font-black uppercase tracking-widest hover:bg-emerald-700 transition shadow-lg shadow-emerald-100"
                                 >
                                   Mark Completed
                                 </button>
                               )}
                               <button className="w-full py-4 bg-white border-2 border-slate-100 text-slate-700 rounded-2xl text-xs font-black uppercase tracking-widest hover:bg-slate-50 transition">
                                 Track Location
                               </button>
                               <button className="w-full py-4 bg-white border-2 border-slate-100 text-rose-500 rounded-2xl text-xs font-black uppercase tracking-widest hover:bg-rose-50 transition">
                                 Cancel Job
                               </button>
                            </div>
                          )}
                       </div>
                    </div>
                 </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};

export default Dashboard;
