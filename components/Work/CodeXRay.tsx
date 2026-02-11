import React, { useState, useRef } from 'react';
import { motion, AnimatePresence, useMotionValue, useSpring } from 'framer-motion';
import { XRayNode } from '../../types';

interface CodeXRayProps {
  id: string;
  nodes: XRayNode[];
  connections: React.ReactNode; // SVG paths for base connections
  title: string;
  version: string;
  logLines: React.ReactNode;
}

const CodeXRay: React.FC<CodeXRayProps> = ({ id, nodes, connections, title, version, logLines }) => {
  const [activeNode, setActiveNode] = useState<XRayNode | null>(null);
  const [modalNode, setModalNode] = useState<XRayNode | null>(null);
  const [hoveredNodeId, setHoveredNodeId] = useState<string | null>(null);

  // Optimization: Use MotionValues for rotation to avoid React re-renders on every mouse move
  const rotateX = useMotionValue(20);
  const rotateY = useMotionValue(0);

  // Add simple spring physics for smoother movement
  const springRotateX = useSpring(rotateX, { stiffness: 100, damping: 20 });
  const springRotateY = useSpring(rotateY, { stiffness: 100, damping: 20 });

  const containerRef = useRef<HTMLDivElement>(null);

  // Parallax / 3D Tilt Effect on Mouse Move
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    // Calculate rotation based on cursor position relative to center
    // Range: -5 to 5 degrees
    const rY = ((x / rect.width) - 0.5) * 10;
    const rX = 20 + ((y / rect.height) - 0.5) * -10;

    rotateX.set(rX);
    rotateY.set(rY);
  };

  const handleMouseLeave = () => {
    rotateX.set(20);
    rotateY.set(0); // Reset to default isometric view
  };

  const getNodeColor = (type: string) => {
    switch (type) {
      case 'ai': return '168, 85, 247'; // Purple
      case 'process': return '59, 130, 246'; // Blue
      case 'server': return '16, 185, 129'; // Green
      case 'cloud': return '52, 211, 153'; // Emerald
      default: return '255, 255, 255'; // White
    }
  };

  return (
    <>
      <style>{`
        .perspective-container {
          perspective: 1000px;
        }
        .preserve-3d {
          transform-style: preserve-3d;
        }
        .node-float {
          animation: float-node 6s ease-in-out infinite;
        }
        @keyframes float-node {
          0%, 100% { transform: translateZ(20px) translateY(0px); }
          50% { transform: translateZ(40px) translateY(-10px); }
        }
        .data-packet {
          offset-path: path("M10,50 L30,50"); /* Default, overridden in JS */
          animation: travel 2s linear infinite;
        }
        @keyframes travel {
          0% { offset-distance: 0%; opacity: 0; }
          10% { opacity: 1; }
          90% { opacity: 1; }
          100% { offset-distance: 100%; opacity: 0; }
        }
      `}</style>

      {/* --- MODAL (unchanged logic, just styled) --- */}
      <AnimatePresence>
        {modalNode && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center px-4 font-mono perspective-container"
          >
            <div className="absolute inset-0 bg-black/80 backdrop-blur-md" onClick={() => setModalNode(null)}></div>

            <motion.div
              initial={{ rotateX: 20, y: 100, opacity: 0 }}
              animate={{ rotateX: 0, y: 0, opacity: 1 }}
              exit={{ rotateX: -20, y: -100, opacity: 0 }}
              className="relative w-full max-w-2xl bg-[#0a0a0f] border border-white/20 rounded-xl shadow-[0_0_50px_rgba(99,102,241,0.2)] overflow-hidden"
            >
              {/* Header */}
              <div className="flex justify-between items-center p-4 border-b border-white/10 bg-white/5">
                <div className="flex items-center gap-3">
                  <div className="flex gap-1.5">
                    <div className="w-2.5 h-2.5 rounded-full bg-red-500/80 shadow-[0_0_8px_rgba(239,68,68,0.6)]"></div>
                    <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/80 shadow-[0_0_8px_rgba(234,179,8,0.6)]"></div>
                    <div className="w-2.5 h-2.5 rounded-full bg-green-500/80 shadow-[0_0_8px_rgba(34,197,94,0.6)]"></div>
                  </div>
                  <div className="h-4 w-px bg-white/20 mx-2"></div>
                  <span className="text-xs text-primary font-bold tracking-[0.2em] uppercase">
                    {modalNode.label} <span className="text-gray-500 mx-2">|</span> SOURCE_VIEWER
                  </span>
                </div>
                <button onClick={() => setModalNode(null)} className="text-gray-500 hover:text-white transition-colors">
                  <span className="material-symbols-outlined text-xl">close</span>
                </button>
              </div>

              {/* Code */}
              <div className="p-0 bg-[#050505] max-h-[60vh] overflow-hidden flex relative">
                <div className="w-12 bg-[#0c0c0c] border-r border-white/5 flex flex-col items-end py-4 pr-3 text-xs text-gray-700 font-mono select-none">
                  {modalNode.codeSnippet.split('\n').map((_, i) => <div key={i}>{i + 1}</div>)}
                </div>
                <div className="flex-1 p-4 overflow-auto custom-scrollbar">
                  <pre className="text-sm text-gray-300 font-mono leading-relaxed">
                    <code>{modalNode.codeSnippet}</code>
                  </pre>
                </div>
                {/* Scanline Overlay */}
                <div className="absolute inset-0 pointer-events-none bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.1)_50%),linear-gradient(90deg,rgba(255,0,0,0.03),rgba(0,255,0,0.01),rgba(0,0,255,0.03))] z-20 bg-[length:100%_4px,6px_100%] opacity-20"></div>
              </div>

              {/* Footer */}
              <div className="px-4 py-2 border-t border-white/10 bg-[#0a0a0a] flex justify-between items-center text-[10px] text-gray-500 uppercase tracking-wider">
                <span className="flex items-center gap-2"><span className="material-symbols-outlined text-[14px]">lock</span> READ_ONLY_MODE</span>
                <span>LANG: <span className="text-white">{modalNode.codeLanguage.toUpperCase()}</span></span>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>


      {/* --- MAINSTAGE: 3D HOLOGRAPHIC VIEW --- */}
      <div
        ref={containerRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        className="relative w-full h-[600px] bg-[#020205] rounded-3xl overflow-hidden border border-white/10 shadow-2xl group/scene perspective-container cursor-move"
      >
        {/* Background Grid & Stars */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-indigo-900/20 via-[#050505] to-[#000000]"></div>
        <div className="absolute inset-0 opacity-20" style={{ backgroundImage: 'radial-gradient(rgba(255,255,255,0.15) 1px, transparent 1px)', backgroundSize: '30px 30px' }}></div>

        {/* 3D TRANSFORMED PLANE */}
        <motion.div
          className="absolute inset-0 w-full h-full preserve-3d"
          style={{
            rotateX: springRotateX,
            rotateY: springRotateY,
            transformOrigin: 'center center',
          }}
        >
          {/* Floor Grid (The Base) */}
          <div
            className="absolute inset-[-50%] w-[200%] h-[200%] opacity-20 pointer-events-none"
            style={{
              background: 'linear-gradient(rgba(99, 102, 241, 0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(99, 102, 241, 0.1) 1px, transparent 1px)',
              backgroundSize: '60px 60px',
              transform: 'translateZ(0px)'
            }}
          ></div>

          {/* Glowing Base Platform */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80%] h-[60%] bg-indigo-500/5 blur-3xl rounded-full transform translate-z-0"></div>

          {/* --- CONNECTIONS LAYER (On the Floor) --- */}
          <svg
            className="absolute inset-0 w-full h-full pointer-events-none z-0 overflow-visible"
            viewBox="0 0 100 100"
            preserveAspectRatio="none"
            style={{ transform: 'translateZ(2px)' }} // Slightly above floor
          >
            <defs>
              <filter id="glow-line" x="-20%" y="-20%" width="140%" height="140%">
                <feGaussianBlur stdDeviation="1" result="blur" />
                <feComposite in="SourceGraphic" in2="blur" operator="over" />
              </filter>
              <linearGradient id="gradient-line" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="rgba(99,102,241,0)" />
                <stop offset="50%" stopColor="rgba(99,102,241,0.5)" />
                <stop offset="100%" stopColor="rgba(99,102,241,0)" />
              </linearGradient>
            </defs>

            {/* Base Lines with 3D shadow effect */}
            <g className="opacity-30 blur-[1px] translate-y-1">
              {connections}
            </g>
            <g className="stroke-white/20 filter drop-shadow-md">
              {connections}
            </g>

            {/* NOTE: Data packets would need precise path definitions to run along SVG paths. 
                  For now, we simulate activity with pulsing opacity on the lines */}
          </svg>


          {/* --- FLOATING NODES --- */}
          {nodes.map((node) => {
            const isActive = activeNode?.id === node.id;
            const isHovered = hoveredNodeId === node.id;
            const colorRGB = getNodeColor(node.type);

            return (
              <div
                key={node.id}
                className="absolute preserve-3d cursor-pointer transition-all duration-500 ease-out"
                style={{
                  left: `${node.x}%`,
                  top: `${node.y}%`,
                  transform: `translate(-50%, -50%) translateZ(${isActive ? 80 : isHovered ? 60 : 30}px)`,
                }}
                onMouseEnter={() => setHoveredNodeId(node.id)}
                onMouseLeave={() => setHoveredNodeId(null)}
                onClick={(e) => { e.stopPropagation(); setActiveNode(node); }}
              >
                {/* The Node Content Card */}
                <div
                  className={`
                          relative flex flex-col items-center justify-center text-center p-4 rounded-xl backdrop-blur-md border border-white/10
                          transition-all duration-300
                          ${isActive ? 'bg-white/10 ring-1 ring-white/50 scale-110' : 'bg-black/40 hover:bg-white/5'}
                        `}
                  style={{
                    boxShadow: `0 0 ${isActive ? 40 : 20}px rgba(${colorRGB}, ${isActive ? 0.6 : 0.2})`,
                    borderColor: `rgba(${colorRGB}, ${isActive ? 0.8 : 0.3})`,
                    width: node.type === 'ai' ? '160px' : '120px'
                  }}
                >
                  {/* Type Icon/Label */}
                  <div
                    className="font-mono text-[9px] font-bold uppercase tracking-widest mb-1 transition-colors"
                    style={{ color: `rgba(${colorRGB}, 1)` }}
                  >
                    {node.type}
                  </div>

                  {/* Main Label */}
                  <div className="font-display font-bold text-white text-sm leading-tight">
                    {node.label}
                  </div>

                  {/* Reflection Gradient */}
                  <div className={`absolute inset-0 rounded-xl bg-gradient-to-tr from-white/20 to-transparent pointer-events-none transition-opacity ${isHovered ? 'opacity-100' : 'opacity-0'}`}></div>
                </div>

                {/* Floor Shadow (Projected down) */}
                <div
                  className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80%] h-[20%] bg-black/50 blur-md rounded-full pointer-events-none transition-all duration-500"
                  style={{
                    transform: `translateZ(-${isActive ? 80 : isHovered ? 60 : 30}px) scale(${isActive ? 1.5 : 1.2})`, // Pushes shadow back to Z=0
                    background: `radial-gradient(circle, rgba(${colorRGB}, 0.5) 0%, transparent 70%)`
                  }}
                ></div>

                {/* Vertical "Tether" Line (Holographic Beam) */}
                <div
                  className="absolute top-1/2 left-1/2 w-[1px] bg-gradient-to-t from-transparent to-white/20 pointer-events-none"
                  style={{
                    height: `${isActive ? 80 : isHovered ? 60 : 30}px`,
                    transform: `translate(-50%, 0) rotateX(-90deg)`,
                    transformOrigin: 'top center',
                    background: `linear-gradient(to top, rgba(${colorRGB}, 0), rgba(${colorRGB}, 0.5))`
                  }}
                ></div>

                {/* View Code Button (Floating above) */}
                <div
                  className={`absolute -top-10 left-1/2 -translate-x-1/2 transition-all duration-300 ${isHovered || isActive ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'}`}
                  style={{ transform: 'translateZ(20px) translateX(-50%)' }}
                >
                  <button
                    onClick={(e) => { e.stopPropagation(); setModalNode(node); }}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white text-black text-[10px] font-bold uppercase tracking-wide hover:scale-105 transition-transform shadow-[0_0_15px_rgba(255,255,255,0.5)]"
                  >
                    <span className="material-symbols-outlined text-[12px]">code</span>
                    Source
                  </button>
                </div>
              </div>
            );
          })}
        </motion.div>

        {/* --- HUD OVERLAYS (Static, not 3D) --- */}

        {/* System Title */}
        <div className="absolute top-6 left-6 z-50 pointer-events-none">
          <h3 className="font-display text-white text-2xl font-bold tracking-tight uppercase drop-shadow-md">
            {title}
          </h3>
          <div className="flex items-center gap-2 mt-1">
            <div className="w-1.5 h-1.5 bg-terminal-green rounded-full animate-pulse"></div>
            <span className="font-mono text-[10px] text-terminal-green uppercase tracking-widest">{version}</span>
          </div>
        </div>

        {/* 3D Toggle Hint */}
        <div className="absolute top-6 right-6 z-50 pointer-events-none opacity-50 bg-black/20 backdrop-blur px-2 py-1 rounded text-[9px] font-mono text-white border border-white/10 uppercase tracking-widest">
          Interactive 3D View
        </div>
      </div>


      {/* --- TERMINAL LOG (Below the 3D Stage) --- */}
      <div className="relative w-full bg-[#050505] border-x border-b border-white/10 rounded-b-xl overflow-hidden mt-[-10px] pt-4 z-40 shadow-xl">
        {/* Green Glow Top Border */}
        <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-terminal-green/50 to-transparent"></div>

        <div className="flex flex-col md:flex-row h-32 md:h-24">
          {/* Status Panel */}
          <div className="w-full md:w-48 bg-white/[0.02] border-r border-white/5 p-4 flex flex-col justify-center gap-2">
            <div className="flex justify-between items-center text-[10px] font-mono text-gray-500">
              <span>STATUS</span>
              <span className="text-terminal-green animate-pulse">LIVE MONITORING</span>
            </div>
            <div className="w-full h-1 bg-gray-800 rounded-full overflow-hidden">
              <div className="h-full bg-terminal-green animate-sh-bar-anim w-[60%]"></div>
            </div>
          </div>

          {/* Scrolling Logs */}
          <div className="flex-1 p-3 overflow-hidden relative font-mono text-[10px] bg-black/40">
            <div className="absolute inset-x-0 top-0 h-4 bg-gradient-to-b from-[#050505] to-transparent z-10 pointer-events-none"></div>
            <div className="absolute inset-x-0 bottom-0 h-4 bg-gradient-to-t from-[#050505] to-transparent z-10 pointer-events-none"></div>

            <div className="h-full overflow-y-auto scrollbar-hide space-y-1.5">
              <div className="animate-scroll-log opacity-80 hover:opacity-100 transition-opacity">
                {logLines}
                {logLines}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CodeXRay;