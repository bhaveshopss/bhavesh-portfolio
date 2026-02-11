import React, { useEffect, useState } from 'react';

const OperationalScorecard: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );
    const element = document.getElementById('scorecard');
    if (element) observer.observe(element);
    return () => observer.disconnect();
  }, []);

  return (
    <section id="scorecard" className="relative z-10 py-20 bg-[#020202] border-y border-white/5 overflow-hidden">
      {/* Background Grid */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ 
          backgroundImage: 'linear-gradient(rgba(255, 255, 255, 0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255, 255, 255, 0.5) 1px, transparent 1px)', 
          backgroundSize: '40px 40px' 
      }}></div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="flex items-center gap-4 mb-12">
           <div className="h-px w-12 bg-terminal-green"></div>
           <h2 className="font-display text-2xl md:text-3xl text-white uppercase font-bold tracking-tight">Operational Scorecard</h2>
           <div className="h-px flex-grow bg-white/10"></div>
           <span className="font-mono text-xs text-terminal-green border border-terminal-green/30 px-2 py-1 rounded animate-pulse">LIVE METRICS</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          {/* Card 1: AIOps / MTTR */}
          <div className="group relative bg-[#0a0a0a] border border-white/10 rounded-xl p-6 overflow-hidden hover:border-accent-purple/50 transition-all duration-500 hover:shadow-[0_0_30px_rgba(168,85,247,0.15)]">
            <div className="absolute inset-0 bg-accent-purple/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            
            <div className="flex justify-between items-start mb-4 relative z-10">
              <div>
                <h3 className="text-gray-400 font-mono text-xs uppercase font-bold tracking-wider mb-1">Incident Response</h3>
                <div className="text-white font-display text-4xl font-bold">-65%</div>
              </div>
              <div className="w-10 h-10 rounded-full bg-accent-purple/10 flex items-center justify-center border border-accent-purple/20 text-accent-purple">
                <span className="material-symbols-outlined">auto_fix_high</span>
              </div>
            </div>
            
            {/* Chart Area */}
            <div className="h-24 w-full relative mb-4 opacity-80 group-hover:opacity-100 transition-opacity">
               <svg className="w-full h-full" viewBox="0 0 100 50" preserveAspectRatio="none">
                 {/* Grid lines */}
                 <line x1="0" y1="10" x2="100" y2="10" stroke="#333" strokeWidth="0.5" strokeDasharray="2,2" />
                 <line x1="0" y1="40" x2="100" y2="40" stroke="#333" strokeWidth="0.5" strokeDasharray="2,2" />
                 
                 {/* Data Line (High to Low) */}
                 <path 
                   d="M0,10 C30,10 40,35 100,42" 
                   fill="none" 
                   stroke="#a855f7" 
                   strokeWidth="2" 
                   className={isVisible ? "animate-flow-dash" : ""}
                   strokeDasharray="100"
                   strokeDashoffset={isVisible ? "0" : "100"}
                   style={{ transition: 'stroke-dashoffset 2s ease-out' }}
                 />
                 {/* Area fill */}
                 <path 
                   d="M0,10 C30,10 40,35 100,42 V50 H0 Z" 
                   fill="url(#gradPurple)" 
                   opacity="0.2" 
                 />
                 <defs>
                   <linearGradient id="gradPurple" x1="0%" y1="0%" x2="0%" y2="100%">
                     <stop offset="0%" stopColor="#a855f7" stopOpacity="0.5" />
                     <stop offset="100%" stopColor="#a855f7" stopOpacity="0" />
                   </linearGradient>
                 </defs>
               </svg>
            </div>

            <div className="relative z-10 font-mono text-[10px] text-gray-400 border-t border-white/10 pt-3 flex justify-between">
              <span>MTTD / MTTR</span>
              <span className="text-accent-purple font-bold">AIOPS DRIVEN</span>
            </div>
          </div>

          {/* Card 2: FinOps / Cost */}
          <div className="group relative bg-[#0a0a0a] border border-white/10 rounded-xl p-6 overflow-hidden hover:border-terminal-green/50 transition-all duration-500 hover:shadow-[0_0_30px_rgba(0,255,65,0.15)]">
            <div className="absolute inset-0 bg-terminal-green/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            
            <div className="flex justify-between items-start mb-4 relative z-10">
              <div>
                <h3 className="text-gray-400 font-mono text-xs uppercase font-bold tracking-wider mb-1">Cloud Spend</h3>
                <div className="text-white font-display text-4xl font-bold text-terminal-green">-20%</div>
              </div>
              <div className="w-10 h-10 rounded-full bg-terminal-green/10 flex items-center justify-center border border-terminal-green/20 text-terminal-green">
                <span className="material-symbols-outlined">savings</span>
              </div>
            </div>

            {/* Chart Area */}
            <div className="h-24 w-full relative mb-4 opacity-80 group-hover:opacity-100 transition-opacity">
               <svg className="w-full h-full" viewBox="0 0 100 50" preserveAspectRatio="none">
                 {/* Bars for cost */}
                 {[10, 25, 40, 55, 70, 85].map((x, i) => {
                    const h = [40, 38, 35, 30, 25, 20][i]; // decreasing height
                    return (
                        <rect 
                            key={i}
                            x={x} 
                            y={50 - h} 
                            width="8" 
                            height={h} 
                            fill="#00ff41" 
                            opacity={0.3 + (i * 0.1)}
                            className={isVisible ? "animate-pulse-slow" : ""}
                            style={{ animationDelay: `${i * 0.1}s` }}
                        />
                    );
                 })}
                 {/* Trend line */}
                 <path 
                   d="M14,10 L89,30" 
                   fill="none" 
                   stroke="#00ff41" 
                   strokeWidth="1" 
                   strokeDasharray="4,4"
                 />
               </svg>
            </div>

            <div className="relative z-10 font-mono text-[10px] text-gray-400 border-t border-white/10 pt-3 flex justify-between">
              <span>AWS FINOPS</span>
              <span className="text-terminal-green font-bold">OPTIMIZED</span>
            </div>
          </div>

          {/* Card 3: Velocity */}
          <div className="group relative bg-[#0a0a0a] border border-white/10 rounded-xl p-6 overflow-hidden hover:border-accent-blue/50 transition-all duration-500 hover:shadow-[0_0_30px_rgba(59,130,246,0.15)]">
            <div className="absolute inset-0 bg-accent-blue/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            
            <div className="flex justify-between items-start mb-4 relative z-10">
              <div>
                <h3 className="text-gray-400 font-mono text-xs uppercase font-bold tracking-wider mb-1">Release Velocity</h3>
                <div className="text-white font-display text-4xl font-bold text-accent-blue">+40%</div>
              </div>
              <div className="w-10 h-10 rounded-full bg-accent-blue/10 flex items-center justify-center border border-accent-blue/20 text-accent-blue">
                <span className="material-symbols-outlined">rocket_launch</span>
              </div>
            </div>

            {/* Chart Area */}
            <div className="h-24 w-full relative mb-4 opacity-80 group-hover:opacity-100 transition-opacity">
               <svg className="w-full h-full" viewBox="0 0 100 50" preserveAspectRatio="none">
                 <path 
                   d="M0,45 C20,45 40,45 50,25 C60,5 80,15 100,5" 
                   fill="none" 
                   stroke="#3b82f6" 
                   strokeWidth="2" 
                   className={isVisible ? "animate-flow-dash" : ""}
                   strokeDasharray="100"
                   strokeDashoffset={isVisible ? "0" : "100"}
                   style={{ transition: 'stroke-dashoffset 2s ease-out' }}
                 />
                 <path 
                   d="M0,45 C20,45 40,45 50,25 C60,5 80,15 100,5 V50 H0 Z" 
                   fill="url(#gradBlue)" 
                   opacity="0.2" 
                 />
                 <defs>
                   <linearGradient id="gradBlue" x1="0%" y1="0%" x2="0%" y2="100%">
                     <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.5" />
                     <stop offset="100%" stopColor="#3b82f6" stopOpacity="0" />
                   </linearGradient>
                 </defs>
                 
                 {/* Deployment Dots */}
                 {[20, 50, 80].map((x, i) => (
                    <circle key={i} cx={x} cy={i === 1 ? 25 : i === 2 ? 15 : 45} r="2" fill="white" className="animate-ping" style={{ animationDuration: '3s', animationDelay: `${i}s` }} />
                 ))}
               </svg>
            </div>

            <div className="relative z-10 font-mono text-[10px] text-gray-400 border-t border-white/10 pt-3 flex justify-between">
              <span>DEPLOYMENT FREQ</span>
              <span className="text-accent-blue font-bold">GITOPS ENABLED</span>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default OperationalScorecard;