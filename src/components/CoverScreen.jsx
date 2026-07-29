import React, { useState } from 'react';
import MagicalBackground from './MagicalBackground';

const CoverScreen = ({ data, onOpen, onPlayMusic }) => {
  const [isOpen, setIsOpen] = useState(false);
  
  const handleOpen = () => { 
    // Picu Layar Penuh lintas browser
    const elem = document.documentElement;
    if (elem.requestFullscreen) { elem.requestFullscreen().catch(()=>console.log("FS blocked")); }
    else if (elem.webkitRequestFullscreen) { elem.webkitRequestFullscreen(); } 
    else if (elem.msRequestFullscreen) { elem.msRequestFullscreen(); }

    if(onPlayMusic) onPlayMusic(); 
    
    setIsOpen(true); 
    setTimeout(onOpen, 1400); 
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto overflow-x-hidden custom-scrollbar theme-keraton bg-[#120808]">
      <MagicalBackground />
      
      {/* Pintu Statis di Background */}
      <div className="fixed inset-0 pointer-events-none z-[20]">
        <div className={`absolute inset-y-0 left-0 w-1/2 bg-[#1A0B0B] border-r border-[#D4AF37]/30 flex justify-start items-center transition-all duration-1000 ${isOpen ? 'animate-doorOpenLeft' : ''}`}>
          <div className="absolute inset-0 bg-gradient-to-r from-[#120808] to-transparent"></div>
          {data.content.cornerUrl && <img src={data.content.cornerUrl} className="absolute top-0 left-0 w-24 sm:w-32 md:w-40 h-24 sm:h-32 md:h-40 object-contain opacity-30" alt="corner" />}
          {data.content.cornerUrl && <img src={data.content.cornerUrl} className="absolute bottom-0 left-0 w-24 sm:w-32 md:w-40 h-24 sm:h-32 md:h-40 object-contain opacity-30 transform scale-y-[-1]" alt="corner" />}
        </div>
        <div className={`absolute inset-y-0 right-0 w-1/2 bg-[#1A0B0B] border-l border-[#D4AF37]/30 flex justify-end items-center transition-all duration-1000 ${isOpen ? 'animate-doorOpenRight' : ''}`}>
          <div className="absolute inset-0 bg-gradient-to-l from-[#120808] to-transparent"></div>
          {data.content.cornerUrl && <img src={data.content.cornerUrl} className="absolute top-0 right-0 w-24 sm:w-32 md:w-40 h-24 sm:h-32 md:h-40 object-contain opacity-30 transform scale-x-[-1]" alt="corner" />}
          {data.content.cornerUrl && <img src={data.content.cornerUrl} className="absolute bottom-0 right-0 w-24 sm:w-32 md:w-40 h-24 sm:h-32 md:h-40 object-contain opacity-30 transform scale-x-[-1] scale-y-[-1]" alt="corner" />}
        </div>
      </div>
      
      {/* Konten Scrollable Tengah (Foreground) */}
      <div className={`relative z-30 min-h-full flex flex-col items-center justify-center py-10 px-4 sm:px-6 transition-all duration-1000 ${isOpen ? 'opacity-0 scale-110 pointer-events-none' : 'opacity-100 scale-100'}`}>
        <div className="w-px min-h-[4rem] sm:min-h-[6rem] bg-gradient-to-b from-transparent to-[#D4AF37] mb-6 opacity-60"></div>
        <h4 className="text-[10px] sm:text-xs md:text-sm tracking-[0.4em] uppercase text-[#D4AF37] mb-6 sm:mb-8 font-light font-sans text-center drop-shadow-md animate-float">{data.content.titlePrefix || 'Pawiwahan Ageng'}</h4>
        <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl heading-font gold-text-gradient leading-none text-center drop-shadow-lg px-2">{data.content.groom}</h1>
        
        <div className="relative w-28 h-28 sm:w-36 sm:h-36 my-6 flex items-center justify-center animate-subtle-bounce">
          {data.content.gununganUrl && <img src={data.content.gununganUrl} className="absolute inset-0 w-full h-full object-contain opacity-90 drop-shadow-[0_0_20px_rgba(212,175,55,0.6)] pointer-events-none" alt="gunungan" />}
          <span className="text-2xl sm:text-3xl accent-text font-sans font-light relative z-10 bg-[#120808]/60 w-10 h-10 sm:w-12 sm:h-12 rounded-full flex items-center justify-center backdrop-blur-sm border border-[#D4AF37]/50 shadow-[0_0_15px_rgba(212,175,55,0.3)] animate-pulse-gold">&</span>
        </div>
        
        <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl heading-font gold-text-gradient leading-none text-center mb-10 sm:mb-12 drop-shadow-lg px-2">{data.content.bride}</h1>
        <p className="text-[9px] sm:text-[10px] md:text-xs font-light tracking-[0.3em] mb-10 text-gray-300 font-sans uppercase text-center max-w-sm px-4">{data.content.coverGreeting}</p>
        <button onClick={handleOpen} className="animate-pulse-gold btn-gold px-10 sm:px-12 py-4 sm:py-5 rounded-sm text-[10px] sm:text-xs font-bold uppercase tracking-[0.25em] hover:scale-105 transition-all duration-300 relative z-40">{data.content.coverButtonText}</button>
        <div className="w-px min-h-[4rem] sm:min-h-[6rem] bg-gradient-to-t from-transparent to-[#D4AF37] mt-10 opacity-60"></div>
      </div>
    </div>
  );
};

export default CoverScreen;
