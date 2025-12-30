
import React, { useState } from 'react';
import { ServiceCategory, Booking } from '../types';

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialService: ServiceCategory | null;
  onSubmit: (booking: Partial<Booking>) => void;
}

const BookingModal: React.FC<BookingModalProps> = ({ isOpen, onClose, initialService, onSubmit }) => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    service: initialService || ServiceCategory.RO,
    subService: '',
    customerName: '',
    phone: '',
    address: ''
  });

  if (!isOpen) return null;

  const handleNext = () => setStep(prev => prev + 1);
  const handleBack = () => setStep(prev => prev - 1);

  const subServices: Record<ServiceCategory, string[]> = {
    [ServiceCategory.RO]: ['Filter Replacement', 'Full Installation', 'Leakage Repair', 'Annual Maintenance'],
    [ServiceCategory.AC]: ['Jet Service (Deep Clean)', 'Gas Refill', 'Power Issue', 'Uninstallation'],
    [ServiceCategory.GEYSER]: ['Coil Replacement', 'Heating Issue', 'New Installation'],
    [ServiceCategory.REFRIGERATOR]: ['No Cooling', 'Gas Charging', 'Noise Issue'],
    [ServiceCategory.WASHING_MACHINE]: ['Spin Cycle Fault', 'Water Leakage', 'PCB Maintenance']
  };

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 sm:p-6">
      <div className="absolute inset-0 bg-slate-900/40 backdrop-blur-md" onClick={onClose}></div>
      
      <div className="relative bg-white w-full max-w-xl rounded-[2.5rem] shadow-[0_32px_64px_-12px_rgba(0,0,0,0.3)] overflow-hidden animate-slide-in">
        <div className="p-8 border-b border-slate-100 flex items-center justify-between bg-indigo-50/30">
          <div>
            <h2 className="text-2xl font-black text-slate-900 leading-none">Smart Booking</h2>
            <p className="text-[10px] text-slate-400 font-black uppercase tracking-widest mt-2">Section {step} of 3</p>
          </div>
          <button onClick={onClose} className="w-10 h-10 bg-white border border-slate-100 rounded-2xl flex items-center justify-center hover:bg-rose-50 hover:text-rose-500 transition shadow-sm">✕</button>
        </div>

        <div className="p-8">
          {step === 1 && (
            <div className="space-y-6">
              <div>
                <label className="block text-xs font-black text-slate-400 uppercase tracking-widest mb-3">Appliance Category</label>
                <div className="grid grid-cols-1 gap-3">
                  <select 
                    value={formData.service}
                    onChange={(e) => setFormData({...formData, service: e.target.value as ServiceCategory})}
                    className="w-full p-4 bg-slate-50 border-2 border-slate-100 rounded-2xl focus:border-indigo-500 outline-none text-slate-900 font-bold appearance-none cursor-pointer"
                  >
                    {Object.values(ServiceCategory).map(v => <option key={v} value={v}>{v}</option>)}
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-black text-slate-400 uppercase tracking-widest mb-3">Select Trouble</label>
                <div className="grid grid-cols-2 gap-3">
                  {subServices[formData.service].map(sub => (
                    <button
                      key={sub}
                      onClick={() => setFormData({...formData, subService: sub})}
                      className={`p-4 rounded-2xl text-xs font-bold border-2 transition-all duration-300 text-left relative overflow-hidden ${
                        formData.subService === sub 
                          ? 'border-indigo-600 bg-indigo-50 text-indigo-700' 
                          : 'border-slate-100 hover:border-slate-300 text-slate-600'
                      }`}
                    >
                      {sub}
                      {formData.subService === sub && <span className="absolute top-2 right-2 text-indigo-600">✓</span>}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-6">
              <div>
                <label className="block text-xs font-black text-slate-400 uppercase tracking-widest mb-2">Customer Profile</label>
                <input 
                  type="text"
                  placeholder="Full Name"
                  className="w-full p-4 bg-slate-50 border-2 border-slate-100 rounded-2xl focus:border-indigo-500 outline-none text-slate-900 font-bold"
                  value={formData.customerName}
                  onChange={(e) => setFormData({...formData, customerName: e.target.value})}
                />
              </div>
              <div>
                <label className="block text-xs font-black text-slate-400 uppercase tracking-widest mb-2">Mobile Number</label>
                <input 
                  type="tel"
                  placeholder="+91 XXXXX XXXXX"
                  className="w-full p-4 bg-slate-50 border-2 border-slate-100 rounded-2xl focus:border-indigo-500 outline-none text-slate-900 font-bold"
                  value={formData.phone}
                  onChange={(e) => setFormData({...formData, phone: e.target.value})}
                />
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="space-y-6">
               <div>
                  <label className="block text-xs font-black text-slate-400 uppercase tracking-widest mb-2">Detailed Address</label>
                  <textarea 
                    rows={4}
                    placeholder="E.g. Flat 402, Building 7, Service Colony, Mumbai..."
                    className="w-full p-4 bg-slate-50 border-2 border-slate-100 rounded-2xl focus:border-indigo-500 outline-none text-slate-900 font-bold"
                    value={formData.address}
                    onChange={(e) => setFormData({...formData, address: e.target.value})}
                  />
               </div>
              <div className="p-6 bg-emerald-50 border-2 border-emerald-100 rounded-3xl flex items-center justify-between">
                 <div>
                    <p className="text-[10px] text-emerald-700 font-black uppercase mb-1 tracking-widest">Fixed Booking Fee</p>
                    <p className="text-3xl font-black text-emerald-800 leading-none">₹399.00</p>
                 </div>
                 <div className="text-right">
                    <span className="text-[10px] bg-emerald-200 text-emerald-800 px-2 py-1 rounded-full font-black uppercase">Verified Techs</span>
                 </div>
              </div>
            </div>
          )}
        </div>

        <div className="p-8 border-t border-slate-50 bg-slate-50/50 flex gap-4">
          {step > 1 && (
            <button 
              onClick={handleBack}
              className="px-6 py-5 border-2 border-slate-200 rounded-2xl font-black text-slate-400 hover:bg-white hover:text-slate-600 transition uppercase tracking-widest text-xs"
            >
              Back
            </button>
          )}
          <button 
            onClick={step === 3 ? () => onSubmit(formData) : handleNext}
            disabled={step === 1 && !formData.subService}
            className={`flex-1 py-5 rounded-2xl font-black text-white transition-all shadow-xl uppercase tracking-widest text-xs ${
              (step === 1 && !formData.subService) ? 'bg-slate-300' : 'bg-indigo-600 hover:bg-indigo-700 shadow-indigo-100'
            }`}
          >
            {step === 3 ? 'Trigger Dispatch' : 'Continue'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default BookingModal;
