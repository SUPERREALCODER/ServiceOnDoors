
import React, { useState, useRef, useEffect } from 'react';
import { aiService } from '../services/gemini';

const AIChatAssistant: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<{role: 'ai' | 'user', text: string}[]>([
    {role: 'ai', text: 'Welcome to ServiceOnDoor! I am your AI Dispatcher. Need to book a repair or track a technician?'}
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isTyping]);

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMsg = input;
    setInput('');
    setMessages(prev => [...prev, {role: 'user', text: userMsg}]);
    setIsTyping(true);

    const response = await aiService.getChatResponse(userMsg);
    
    setIsTyping(false);
    setMessages(prev => [...prev, {role: 'ai', text: response || 'I missed that. Could you say it differently?'}]);
  };

  return (
    <div className="fixed bottom-6 right-6 z-[100] flex flex-col items-end">
      {isOpen && (
        <div className="w-[350px] sm:w-[400px] h-[500px] bg-white rounded-[2.5rem] shadow-2xl border border-slate-100 flex flex-col overflow-hidden animate-slide-in mb-6">
           <div className="p-6 bg-indigo-600 text-white flex items-center justify-between">
             <div className="flex items-center gap-3">
               <div className="w-10 h-10 bg-white/20 rounded-2xl flex items-center justify-center backdrop-blur-md">
                 <span className="text-xl">🤖</span>
               </div>
               <div>
                 <p className="font-black text-sm tracking-tight">AI Service Assistant</p>
                 <div className="flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse"></span>
                    <span className="text-[10px] font-bold uppercase opacity-80 tracking-widest">Always Online</span>
                 </div>
               </div>
             </div>
             <button onClick={() => setIsOpen(false)} className="bg-white/10 p-2 rounded-xl hover:bg-white/20 transition">✕</button>
           </div>
           
           <div ref={scrollRef} className="flex-1 overflow-y-auto p-6 space-y-4 bg-slate-50">
             {messages.map((m, i) => (
               <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                 <div className={`max-w-[85%] p-4 rounded-3xl text-sm leading-relaxed shadow-sm ${
                   m.role === 'user' 
                     ? 'bg-indigo-600 text-white rounded-tr-none' 
                     : 'bg-white border border-slate-100 text-slate-700 rounded-tl-none'
                 }`}>
                   {m.text}
                 </div>
               </div>
             ))}
             {isTyping && (
               <div className="flex justify-start">
                  <div className="bg-white border border-slate-100 px-4 py-3 rounded-3xl flex gap-1.5">
                    <div className="w-1.5 h-1.5 bg-indigo-300 rounded-full animate-bounce"></div>
                    <div className="w-1.5 h-1.5 bg-indigo-300 rounded-full animate-bounce [animation-delay:0.2s]"></div>
                    <div className="w-1.5 h-1.5 bg-indigo-300 rounded-full animate-bounce [animation-delay:0.4s]"></div>
                  </div>
               </div>
             )}
           </div>

           <div className="p-4 border-t bg-white">
             <div className="flex gap-2 p-1.5 bg-slate-100 rounded-2xl">
               <input 
                type="text"
                placeholder="Ask about AC service, RO, or pricing..."
                className="flex-1 bg-transparent border-none rounded-xl px-4 py-2 text-sm focus:ring-0 outline-none text-slate-700 font-medium"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSend()}
               />
               <button 
                onClick={handleSend}
                className="bg-indigo-600 text-white w-10 h-10 rounded-xl flex items-center justify-center hover:bg-indigo-700 transition active:scale-95 shadow-lg shadow-indigo-100"
               >
                 ➤
               </button>
             </div>
           </div>
        </div>
      )}
      
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="w-16 h-16 bg-indigo-600 text-white rounded-[1.25rem] shadow-2xl flex items-center justify-center text-3xl hover:scale-110 transition active:scale-95 group relative overflow-hidden"
      >
        <div className="absolute inset-0 bg-white/10 group-hover:translate-y-full transition-transform duration-500"></div>
        {isOpen ? '✕' : '🦾'}
      </button>
    </div>
  );
};

export default AIChatAssistant;
