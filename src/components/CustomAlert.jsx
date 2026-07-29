import React, { useEffect } from 'react';

const CustomAlert = ({ message, onClose }) => {
  useEffect(() => {
    if (message) {
      const timer = setTimeout(() => { if (onClose) onClose(); }, 4000);
      return () => clearTimeout(timer);
    }
  }, [message, onClose]);

  if (!message) return null;
  const isSuccess = message.toLowerCase().includes('berhasil') || message.toLowerCase().includes('terkirim') || message.toLowerCase().includes('disalin') || message.toLowerCase().includes('dihapus');
  
  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/60 backdrop-blur-sm px-4">
      <div className="glass-card p-8 md:p-10 rounded-2xl max-w-sm w-full text-center border border-[#D4AF37]/50 shadow-[0_0_40px_rgba(212,175,55,0.3)] animate-pop-in relative">
        <button onClick={onClose} className="absolute top-4 right-4 text-gray-400 hover:text-white">&times;</button>
        <div className="w-16 h-16 mx-auto mb-6 rounded-full border border-[#D4AF37]/50 flex items-center justify-center bg-[#D4AF37]/10 shadow-[0_0_15px_rgba(212,175,55,0.3)]">
          {isSuccess ? (
            <svg className="w-8 h-8 text-[#D4AF37]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M5 13l4 4L19 7"></path></svg>
          ) : (
            <svg className="w-8 h-8 text-[#D4AF37]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
          )}
        </div>
        <h3 className="text-[#D4AF37] heading-font text-xl md:text-2xl mb-3 tracking-widest">{isSuccess ? 'Berhasil' : 'Pemberitahuan'}</h3>
        <p className="text-gray-200 text-xs md:text-sm font-light leading-relaxed subheading-font italic">"{message}"</p>
      </div>
    </div>
  );
};

export default CustomAlert;
