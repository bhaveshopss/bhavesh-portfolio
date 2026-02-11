import React, { useState } from 'react';

interface OSSettingsProps {
  scanlines: boolean;
  setScanlines: (v: boolean) => void;
  grain: boolean;
  setGrain: (v: boolean) => void;
}

const OSSettings: React.FC<OSSettingsProps> = ({ scanlines, setScanlines, grain, setGrain }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [ambientHum, setAmbientHum] = useState(false); // Visual only for this demo

  return (
    <>
      <div 
        className={`fixed top-20 right-0 bg-white dark:bg-[#0a0a0a] border border-gray-200 dark:border-white/20 border-r-0 p-2 z-[61] cursor-pointer rounded-l-lg transition-all duration-300 hover:bg-gray-100 dark:hover:bg-[#1e1e1e] group shadow-lg ${isOpen ? 'translate-x-[-260px]' : ''}`}
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className="material-symbols-outlined text-gray-600 dark:text-gray-300 group-hover:text-black dark:group-hover:text-white group-hover:animate-spin">settings</span>
      </div>

      <div className={`fixed top-20 right-[-260px] w-[260px] bg-white/95 dark:bg-[#0a0a0a]/95 border border-gray-200 dark:border-white/20 backdrop-blur-md z-[60] p-4 font-mono shadow-[-10px_10px_30px_rgba(0,0,0,0.1)] dark:shadow-[-10px_10px_30px_rgba(0,0,0,0.5)] transition-transform duration-300 ${isOpen ? 'translate-x-[-260px]' : ''}`}>
        <div className="text-xs font-bold text-gray-900 dark:text-white mb-4 border-b border-gray-200 dark:border-gray-700 pb-2 tracking-widest flex items-center justify-between">
          <span>OS_SETTINGS_V1</span>
          <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
        </div>

        <div className="flex justify-between items-center mb-3 pb-3 border-b border-gray-200 dark:border-white/10">
          <span className="text-[11px] text-gray-600 dark:text-[#E0E0E0] uppercase tracking-wider font-medium">CRT Scanlines</span>
          <div 
            className={`w-9 h-[18px] border relative cursor-pointer transition-all ${scanlines ? 'bg-terminal-green/20 border-terminal-green' : 'bg-gray-200 dark:bg-[#222] border-gray-400 dark:border-[#666]'}`}
            onClick={() => setScanlines(!scanlines)}
          >
            <div className={`absolute top-[2px] w-3 h-3 bg-gray-500 dark:bg-[#888] transition-all duration-200 ${scanlines ? 'left-[20px] bg-terminal-green shadow-[0_0_5px_#00ff41]' : 'left-[2px]'}`} />
          </div>
        </div>

        <div className="flex justify-between items-center mb-3 pb-3 border-b border-gray-200 dark:border-white/10">
          <span className="text-[11px] text-gray-600 dark:text-[#E0E0E0] uppercase tracking-wider font-medium">Grain Intensity</span>
          <div 
            className={`w-9 h-[18px] border relative cursor-pointer transition-all ${grain ? 'bg-terminal-green/20 border-terminal-green' : 'bg-gray-200 dark:bg-[#222] border-gray-400 dark:border-[#666]'}`}
            onClick={() => setGrain(!grain)}
          >
            <div className={`absolute top-[2px] w-3 h-3 bg-gray-500 dark:bg-[#888] transition-all duration-200 ${grain ? 'left-[20px] bg-terminal-green shadow-[0_0_5px_#00ff41]' : 'left-[2px]'}`} />
          </div>
        </div>

        <div className="flex justify-between items-center mb-0 pb-0">
          <span className="text-[11px] text-gray-600 dark:text-[#E0E0E0] uppercase tracking-wider font-medium">Ambient Hum</span>
          <div 
            className={`w-9 h-[18px] border relative cursor-pointer transition-all ${ambientHum ? 'bg-terminal-green/20 border-terminal-green' : 'bg-gray-200 dark:bg-[#222] border-gray-400 dark:border-[#666]'}`}
            onClick={() => setAmbientHum(!ambientHum)}
          >
            <div className={`absolute top-[2px] w-3 h-3 bg-gray-500 dark:bg-[#888] transition-all duration-200 ${ambientHum ? 'left-[20px] bg-terminal-green shadow-[0_0_5px_#00ff41]' : 'left-[2px]'}`} />
          </div>
        </div>

        <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700 text-[10px] text-gray-500 dark:text-gray-400 font-mono">
          SYS_UPTIME: 4291h 22m<br/>
          KERNEL: LINUX_6.8.0
        </div>
      </div>
    </>
  );
};

export default OSSettings;