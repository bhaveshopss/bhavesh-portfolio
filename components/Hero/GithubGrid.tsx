import React, { useEffect, useState } from 'react';

const GithubGrid: React.FC = () => {
  const [nodes, setNodes] = useState<number[]>([]);

  useEffect(() => {
    // Generate ~15 weeks of data (7 days * 15 cols = 105 nodes)
    // Using 7 rows to match GitHub's Mon-Sun layout
    const totalNodes = 7 * 15;
    const newNodes = Array.from({ length: totalNodes }, () => 
      Math.random() > 0.6 ? Math.floor(Math.random() * 4) + 1 : 0
    );
    setNodes(newNodes);
  }, []);

  const getLevelStyle = (level: number) => {
    switch(level) {
      // Using explicit colors for the 3D block effect
      case 1: return { bg: '#0e4429', shadow: '#062616' };
      case 2: return { bg: '#006d32', shadow: '#00421e' };
      case 3: return { bg: '#26a641', shadow: '#176327' };
      case 4: return { bg: '#39d353', shadow: '#228633' }; // Brightest
      default: return { bg: 'var(--block-empty)', shadow: 'var(--block-shadow)' };
    }
  };

  return (
    <div className="relative w-full max-w-2xl mt-16 mb-16 group perspective-[1000px]">
      
      {/* Label */}
      <div className="absolute -top-12 left-1/2 -translate-x-1/2 text-center opacity-80">
         <div className="font-mono text-[10px] text-terminal-green font-bold uppercase tracking-[0.2em] animate-pulse">
            Contribution_Hologram_v2.0
         </div>
         <div className="w-px h-8 bg-gradient-to-b from-transparent to-terminal-green/30 mx-auto mt-1"></div>
      </div>

      {/* 3D Container Plane */}
      <div 
         className="relative p-8 bg-white/80 dark:bg-[#0a0a0a]/90 border border-black/5 dark:border-white/10 rounded-2xl backdrop-blur-sm transform transition-transform duration-700 hover:rotate-x-[10deg] hover:scale-105"
         style={{ 
           transform: 'rotateX(20deg)',
           boxShadow: '0 30px 60px -12px rgba(0,0,0,0.15), 0 0 0 1px rgba(0,0,0,0.05)'
         }}
      >
        {/* Glowing Base */}
        <div className="absolute inset-0 bg-gradient-to-t from-terminal-green/5 to-transparent pointer-events-none rounded-xl"></div>

        {/* The Grid */}
        <div 
          className="grid grid-rows-7 grid-flow-col gap-2 w-full h-full" 
          style={{ transformStyle: 'preserve-3d' }}
        >
          {nodes.map((level, i) => {
            const style = getLevelStyle(level);
            
            return (
              <div 
                key={i}
                className="relative w-full aspect-square group/cell cursor-interactive"
                style={{ transformStyle: 'preserve-3d' }}
              >
                {/* 3D Block Implementation */}
                <div 
                  className="w-full h-full transition-all duration-300 ease-out group-hover/cell:translate-z-6 relative"
                  style={{
                    backgroundColor: style.bg,
                    // Elevate blocks based on contribution level to create physical depth
                    transform: level > 0 ? `translateZ(${level * 4}px)` : 'translateZ(0)',
                    boxShadow: level > 3 ? `0 0 15px ${style.bg}` : 'none',
                    borderRadius: '2px'
                  }}
                >
                    {/* Top Face highlight */}
                    <div className="absolute inset-0 bg-white/20 opacity-0 group-hover/cell:opacity-100 transition-opacity rounded-[2px]"></div>
                    
                    {/* Side Face (Thickness) if elevated */}
                    {level > 0 && (
                        <>
                           {/* Bottom Face (Shadow) */}
                           <div 
                             className="absolute top-full left-0 w-full origin-top brightness-50"
                             style={{ 
                               height: `${level * 4}px`, 
                               backgroundColor: style.shadow,
                               transform: 'rotateX(-90deg)'
                             }} 
                           />
                           {/* Right Face (Shadow) */}
                           <div 
                             className="absolute top-0 right-0 h-full origin-right brightness-75"
                             style={{ 
                               width: `${level * 4}px`, 
                               backgroundColor: style.shadow,
                               transform: 'rotateY(90deg) translateZ(0px)' 
                             }} 
                           />
                        </>
                    )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Legend */}
        <div className="flex justify-between items-center mt-8 pt-4 border-t border-black/5 dark:border-white/5 opacity-70 hover:opacity-100 transition-opacity">
            <span className="text-[9px] font-mono text-gray-500 font-bold uppercase tracking-widest">Year: 2024</span>
            <div className="flex items-center gap-2">
            <span className="text-[9px] font-mono text-gray-500 font-bold uppercase">Less</span>
            <div className="flex gap-1.5">
                <div className="w-2.5 h-2.5 bg-[#0e4429] rounded-[2px] border border-black/5 dark:border-white/5"></div>
                <div className="w-2.5 h-2.5 bg-[#006d32] rounded-[2px] border border-black/5 dark:border-white/5"></div>
                <div className="w-2.5 h-2.5 bg-[#26a641] rounded-[2px] border border-black/5 dark:border-white/5"></div>
                <div className="w-2.5 h-2.5 bg-[#39d353] rounded-[2px] border border-black/5 dark:border-white/5 shadow-[0_0_8px_#39d353]"></div>
            </div>
            <span className="text-[9px] font-mono text-gray-500 font-bold uppercase">More</span>
            </div>
        </div>
      </div>
      
      {/* Floor Reflection/Glow */}
      <div className="absolute -bottom-10 left-0 right-0 h-24 bg-terminal-green/10 blur-[60px] transform rotate-x-[60deg] opacity-40 pointer-events-none"></div>

      {/* Description Text (Moved from Hero) */}
      <div className="mt-12 text-center relative z-10 px-4">
        <p className="max-w-xl mx-auto text-base md:text-lg text-gray-600 dark:text-text-high-contrast font-medium font-mono leading-relaxed transition-colors duration-500">
            Bhavesh Kumar Parmar, DevOps & AIOps Engineer constructing self-healing infrastructures and intelligent pipelines.
        </p>
      </div>

    </div>
  );
};

export default GithubGrid;