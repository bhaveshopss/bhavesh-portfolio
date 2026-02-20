import React from 'react';

interface LiveTerminalProps {
    logLines: React.ReactNode;
}

const LiveTerminal: React.FC<LiveTerminalProps> = ({ logLines }) => {
    return (
        <div className="w-full bg-[#050505] border border-white/10 rounded-card-lg overflow-hidden shadow-xl mt-6">
            <div className="flex flex-col h-40">
                {/* Header / Status Bar */}
                <div className="flex items-center justify-between px-4 py-3 border-b border-white/10 bg-white/[0.02]">
                    <div className="flex items-center gap-3">
                        <div className="w-1.5 h-1.5 bg-terminal-green rounded-full animate-pulse"></div>
                        <span className="text-[10px] font-mono text-gray-500 font-bold tracking-widest">SYSTEM_STATUS</span>
                        <span className="text-[10px] font-mono text-terminal-green font-bold tracking-widest">LIVE</span>
                    </div>
                    {/* Progress bar small */}
                    <div className="w-16 h-1 bg-gray-800 rounded-full overflow-hidden">
                        <div className="h-full bg-terminal-green animate-sh-bar-anim w-[60%]"></div>
                    </div>
                </div>

                {/* Logs */}
                <div className="flex-1 p-3 overflow-hidden relative font-mono text-[10px] bg-black/40">
                    <div className="absolute inset-x-0 top-0 h-4 bg-gradient-to-b from-[#050505] to-transparent z-10 pointer-events-none"></div>
                    <div className="absolute inset-x-0 bottom-0 h-4 bg-gradient-to-t from-[#050505] to-transparent z-10 pointer-events-none"></div>

                    <div className="h-full overflow-y-auto scrollbar-hide space-y-1.5">
                        <div className="animate-scroll-log opacity-80 hover:opacity-100 transition-opacity">
                            {logLines}
                            {logLines}
                            <div className="flex items-center text-terminal-green mt-1">
                                <span className="mr-1">{'>'}</span>
                                <span className="animate-pulse">_</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LiveTerminal;
