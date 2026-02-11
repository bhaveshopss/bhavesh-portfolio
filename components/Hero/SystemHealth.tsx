import React from 'react';

const SystemHealth: React.FC = () => {
  return (
    <div className="hidden md:block absolute top-5 right-5 w-[220px] bg-[#050505]/95 border border-[rgba(0,255,65,0.4)] rounded font-mono z-50 shadow-[0_0_15px_rgba(0,255,65,0.15)] overflow-hidden">
      <div className="bg-[rgba(0,255,65,0.15)] px-2 py-1 flex justify-between items-center border-b border-[rgba(0,255,65,0.3)]">
        <span className="text-[10px] tracking-widest text-terminal-green font-bold">SYS_HEALTH</span>
        <span className="w-1.5 h-1.5 bg-terminal-green rounded-full animate-pulse"></span>
      </div>
      <div className="p-2 grid gap-1">
        <div className="flex justify-between text-[10px] text-white/90 font-medium">
          <span>CPU_LOAD</span>
          <span className="text-terminal-green text-shadow font-bold">12%</span>
        </div>
        <div className="flex justify-between text-[10px] text-white/90 font-medium">
          <span>MEM_USAGE</span>
          <span className="text-terminal-green text-shadow font-bold">6.4GB</span>
        </div>
        <div className="flex justify-between text-[10px] text-white/90 font-medium">
          <span>PODS</span>
          <span className="text-terminal-green text-shadow font-bold">154/154</span>
        </div>
        <div className="flex justify-between text-[10px] text-white/90 font-medium">
          <span>UPTIME</span>
          <span className="text-terminal-green text-shadow font-bold">99.99%</span>
        </div>
        
        {/* Animated Bars */}
        <div className="h-5 flex items-end gap-[2px] mt-1 opacity-90">
          {[0.1, 0.5, 0.2, 0.7, 0.3, 0.6, 0.4, 0.1].map((delay, i) => (
            <div 
              key={i} 
              className="flex-1 bg-[rgba(0,255,65,0.3)] animate-sh-bar-anim" 
              style={{ animationDelay: `${delay}s` }}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default SystemHealth;