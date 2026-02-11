import React from 'react';

const Logo: React.FC = () => {
  return (
    <div className="relative w-12 h-12 bg-gray-900 dark:bg-black flex-shrink-0 cursor-pointer group overflow-hidden border border-black/10 dark:border-white/10 rounded-sm shadow-lg dark:shadow-none transition-colors duration-300">
      {/* Background glow on hover */}
      <div className="absolute inset-0 bg-primary/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
      
      <div className="relative w-full h-full p-1.5">
        {/* B - Top Left */}
        <div className="absolute top-1 left-1.5 font-display font-black text-white text-2xl leading-none tracking-tighter z-10 drop-shadow-[0_2px_0_rgba(0,0,0,1)]">
          B
        </div>
        
        {/* P - Offset Right */}
        <div className="absolute top-4 right-1.5 font-display font-black text-white text-2xl leading-none tracking-tighter z-10 drop-shadow-[0_2px_0_rgba(0,0,0,1)]">
          P
        </div>
        
        {/* CC - Bottom Left */}
        <div className="absolute bottom-1.5 left-1.5 font-mono font-bold text-gray-400 dark:text-[#C0C0C0] text-[10px] leading-none tracking-widest z-20">
          CC
        </div>
      </div>
    </div>
  );
};

export default Logo;