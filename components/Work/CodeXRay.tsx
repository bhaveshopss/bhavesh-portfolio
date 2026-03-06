import React, { useState, useRef } from 'react';
import { motion, AnimatePresence, useMotionValue, useSpring } from 'framer-motion';
import { XRayNode } from '../../types';

interface CodeXRayProps {
  id: string;
  nodes: XRayNode[];
  connections: React.ReactNode;
  title: string;
  version: string;
  logLines?: React.ReactNode;
}

const NODE_ICONS: Record<string, string> = {
  developer: 'person',
  default: 'hub',
  process: 'settings_suggest',
  ai: 'psychology',
  server: 'dns',
  cloud: 'cloud',
};

const NODE_COLORS: Record<string, { rgb: string; hex: string }> = {
  ai: { rgb: '168,85,247', hex: '#a855f7' },
  process: { rgb: '59,130,246', hex: '#3b82f6' },
  server: { rgb: '16,185,129', hex: '#10b981' },
  cloud: { rgb: '52,211,153', hex: '#34d399' },
  developer: { rgb: '99,102,241', hex: '#6366f1' },
  default: { rgb: '148,163,184', hex: '#94a3b8' },
};

const CodeXRay: React.FC<CodeXRayProps> = ({ id, nodes, connections, title, version }) => {
  const [activeNode, setActiveNode] = useState<XRayNode | null>(null);
  const [modalNode, setModalNode] = useState<XRayNode | null>(null);
  const [hoveredNodeId, setHoveredNodeId] = useState<string | null>(null);

  const rotateX = useMotionValue(18);
  const rotateY = useMotionValue(0);
  const springRotateX = useSpring(rotateX, { stiffness: 80, damping: 20 });
  const springRotateY = useSpring(rotateY, { stiffness: 80, damping: 20 });
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    rotateY.set(((e.clientX - rect.left) / rect.width - 0.5) * 12);
    rotateX.set(18 + ((e.clientY - rect.top) / rect.height - 0.5) * -10);
  };
  const handleTouchMove = (e: React.TouchEvent) => {
    if (!containerRef.current || e.touches.length !== 1) return;
    const t = e.touches[0], rect = containerRef.current.getBoundingClientRect();
    rotateY.set(((t.clientX - rect.left) / rect.width - 0.5) * 12);
    rotateX.set(18 + ((t.clientY - rect.top) / rect.height - 0.5) * -10);
  };
  const handleMouseLeave = () => { rotateX.set(18); rotateY.set(0); };

  const getColor = (type: string) => NODE_COLORS[type] || NODE_COLORS.default;

  // Build flow paths between consecutive nodes
  const flowPaths = nodes.slice(0, -1).map((from, i) => {
    const to = nodes[i + 1];
    return { d: `M${from.x},${from.y} L${to.x},${to.y}`, color: getColor(to.type), delay: i * 0.6 };
  });

  return (
    <>
      <style>{`
        @keyframes xr-float-${id} {
          0%, 100% { transform: translate(-50%, -50%) translateZ(var(--z)) translateY(0); }
          50% { transform: translate(-50%, -50%) translateZ(calc(var(--z) + 12px)) translateY(-5px); }
        }
        @keyframes xr-flow-${id} {
          0% { stroke-dashoffset: 200; }
          100% { stroke-dashoffset: 0; }
        }
        @keyframes xr-ring { 0% { transform: scale(1); opacity: 0.5 } 100% { transform: scale(2.8); opacity: 0 } }
        @keyframes xr-orbit { 0% { transform: rotate(0deg) } 100% { transform: rotate(360deg) } }
        @keyframes xr-glow-pulse { 0%, 100% { opacity: 0.4 } 50% { opacity: 1 } }
        .xr-flow-line-${id} {
          stroke-dasharray: 12 188;
          animation: xr-flow-${id} var(--flow-dur, 2.5s) linear infinite;
          animation-delay: var(--flow-del, 0s);
        }
      `}</style>

      {/* ── MODAL ── */}
      <AnimatePresence>
        {modalNode && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[100] flex items-center justify-center px-4 font-mono" style={{ perspective: 1000 }}>
            <div className="absolute inset-0 bg-black/85" onClick={() => setModalNode(null)} />
            <motion.div initial={{ rotateX: 15, y: 80, opacity: 0 }} animate={{ rotateX: 0, y: 0, opacity: 1 }} exit={{ rotateX: -15, y: -80, opacity: 0 }} className="relative w-full max-w-2xl bg-[#08080c] border border-white/15 rounded-xl shadow-[0_0_60px_rgba(99,102,241,0.15)] overflow-hidden">
              <div className="flex justify-between items-center p-4 border-b border-white/10 bg-white/[0.03]">
                <div className="flex items-center gap-3">
                  <div className="flex gap-1.5">
                    <div className="w-2.5 h-2.5 rounded-full bg-red-500/80" /><div className="w-2.5 h-2.5 rounded-full bg-yellow-500/80" /><div className="w-2.5 h-2.5 rounded-full bg-green-500/80" />
                  </div>
                  <div className="h-4 w-px bg-white/20 mx-1" />
                  <span className="text-xs font-bold tracking-[0.2em] uppercase" style={{ color: getColor(modalNode.type).hex }}>{modalNode.label} <span className="text-gray-600 mx-1">|</span> <span className="text-gray-400">SOURCE</span></span>
                </div>
                <button onClick={() => setModalNode(null)} className="text-gray-500 hover:text-white transition-colors w-8 h-8 flex items-center justify-center rounded-full hover:bg-white/10" aria-label="Close">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
                </button>
              </div>
              <div className="bg-[#050508] max-h-[55vh] overflow-hidden flex relative">
                <div className="w-10 bg-[#0a0a10] border-r border-white/5 flex flex-col items-end py-4 pr-2 text-[11px] text-gray-700 font-mono select-none">{modalNode.codeSnippet.split('\n').map((_, i) => <div key={i}>{i + 1}</div>)}</div>
                <div className="flex-1 p-4 overflow-auto"><pre className="text-sm text-gray-300 font-mono leading-relaxed"><code>{modalNode.codeSnippet}</code></pre></div>
                <div className="absolute inset-0 pointer-events-none opacity-10 bg-[linear-gradient(rgba(0,0,0,0)_50%,rgba(0,0,0,0.15)_50%)] bg-[length:100%_3px]" />
              </div>
              <div className="px-4 py-2 border-t border-white/10 bg-[#08080c] flex justify-between text-[10px] text-gray-500 uppercase tracking-wider">
                <span className="flex items-center gap-1"><span className="material-symbols-outlined text-[12px]">lock</span> READ_ONLY</span>
                <span>LANG: <span className="text-white">{modalNode.codeLanguage.toUpperCase()}</span></span>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── MAIN STAGE ── */}
      <div ref={containerRef} onMouseMove={handleMouseMove} onMouseLeave={handleMouseLeave} onTouchMove={handleTouchMove} onTouchEnd={handleMouseLeave} className="relative w-full h-full min-h-[480px] bg-[#030308] rounded-card-lg overflow-hidden border border-white/[0.08] shadow-[0_0_40px_rgba(0,0,0,0.5)] cursor-move touch-none" style={{ perspective: 1000 }}>

        {/* ── BG LAYERS ── */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(99,102,241,0.06)_0%,transparent_70%)]" />
        <div className="absolute inset-0 opacity-[0.08]" style={{ backgroundImage: 'radial-gradient(rgba(255,255,255,0.3) 1px, transparent 1px)', backgroundSize: '24px 24px' }} />

        {/* Subtle hex tint — static, no animation */}
        <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'linear-gradient(rgba(99,102,241,0.08) 1px, transparent 1px), linear-gradient(90deg, rgba(99,102,241,0.08) 1px, transparent 1px)', backgroundSize: '40px 40px' }} />

        {/* ── 3D SCENE ── */}
        <motion.div className="absolute inset-0 w-full h-full" style={{ rotateX: springRotateX, rotateY: springRotateY, transformOrigin: 'center center', transformStyle: 'preserve-3d' as any }}>

          {/* Floor grid */}
          <div className="absolute inset-0 opacity-[0.1] pointer-events-none" style={{ background: 'linear-gradient(rgba(99,102,241,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(99,102,241,0.1) 1px, transparent 1px)', backgroundSize: '50px 50px', transform: 'translateZ(0)' }} />

          {/* Central platform glow */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[70%] h-[50%] rounded-full pointer-events-none" style={{ background: 'radial-gradient(circle, rgba(99,102,241,0.08) 0%, transparent 70%)', transform: 'translateZ(1px)' }} />

          {/* ── CONNECTIONS ── */}
          <svg className="absolute inset-0 w-full h-full pointer-events-none overflow-visible" viewBox="0 0 100 100" preserveAspectRatio="none" style={{ transform: 'translateZ(3px)' }}>
            {/* Base connection lines — crisp, no blur */}
            <g opacity="0.35">{connections}</g>

            {/* Flowing energy pulses — sharp lines, no SVG filter blur */}
            {flowPaths.map((p, i) => (
              <g key={`flow-${i}`}>
                {/* Colored flow pulse */}
                <path
                  d={p.d}
                  fill="none"
                  stroke={p.color.hex}
                  strokeWidth="2"
                  vectorEffect="non-scaling-stroke"
                  strokeLinecap="round"
                  className={`xr-flow-line-${id}`}
                  style={{ '--flow-del': `${p.delay}s`, '--flow-dur': '2.2s' } as React.CSSProperties}
                />
                {/* White core for brightness */}
                <path
                  d={p.d}
                  fill="none"
                  stroke="white"
                  strokeWidth="0.8"
                  vectorEffect="non-scaling-stroke"
                  strokeLinecap="round"
                  opacity="0.6"
                  className={`xr-flow-line-${id}`}
                  style={{ '--flow-del': `${p.delay}s`, '--flow-dur': '2.2s' } as React.CSSProperties}
                />
                {/* Second wave, staggered */}
                <path
                  d={p.d}
                  fill="none"
                  stroke={p.color.hex}
                  strokeWidth="1.5"
                  vectorEffect="non-scaling-stroke"
                  strokeLinecap="round"
                  opacity="0.3"
                  className={`xr-flow-line-${id}`}
                  style={{ '--flow-del': `${p.delay + 1.1}s`, '--flow-dur': '2.2s' } as React.CSSProperties}
                />
              </g>
            ))}
          </svg>

          {/* ── NODES ── */}
          {nodes.map((node, ni) => {
            const isActive = activeNode?.id === node.id;
            const isHovered = hoveredNodeId === node.id;
            const c = getColor(node.type);
            const icon = NODE_ICONS[node.type] || 'hub';
            const z = isActive ? 70 : isHovered ? 55 : 25;

            return (
              <div
                key={node.id}
                className="absolute"
                style={{
                  left: `${node.x}%`, top: `${node.y}%`,
                  '--z': `${z}px`,
                  animation: !isActive && !isHovered ? `xr-float-${id} ${5.5 + ni * 0.6}s ease-in-out infinite` : 'none',
                  animationDelay: `${ni * 0.5}s`,
                  transform: isActive || isHovered ? `translate(-50%, -50%) translateZ(${z}px)` : `translate(-50%, -50%) translateZ(25px)`,
                  transition: 'transform 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                  transformStyle: 'preserve-3d',
                  zIndex: isActive ? 40 : isHovered ? 30 : 10,
                } as React.CSSProperties}
                onMouseEnter={() => setHoveredNodeId(node.id)}
                onMouseLeave={() => setHoveredNodeId(null)}
                onClick={(e) => { e.stopPropagation(); setActiveNode(node); }}
              >
                {/* Outer pulse rings on hover/active */}
                {(isHovered || isActive) && (
                  <>
                    <div className="absolute inset-[-8px] rounded-2xl pointer-events-none" style={{ border: `1px solid rgba(${c.rgb}, 0.3)`, animation: 'xr-ring 2s ease-out infinite' }} />
                    <div className="absolute inset-[-8px] rounded-2xl pointer-events-none" style={{ border: `1px solid rgba(${c.rgb}, 0.2)`, animation: 'xr-ring 2s ease-out infinite 0.6s' }} />
                  </>
                )}

                {/* Orbiting particle (active only) */}
                {isActive && (
                  <div className="absolute inset-[-16px] pointer-events-none" style={{ animation: 'xr-orbit 3s linear infinite' }}>
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full" style={{ background: c.hex, boxShadow: `0 0 8px ${c.hex}` }} />
                  </div>
                )}

                {/* Node card */}
                <div
                  className="relative flex flex-col items-center gap-1.5 cursor-pointer"
                  style={{ width: node.type === 'ai' ? 140 : 115 }}
                >
                  {/* Glass card body */}
                  <div
                    className="w-full rounded-xl border relative overflow-hidden transition-all duration-300"
                    style={{
                      background: isActive ? `rgba(${c.rgb}, 0.12)` : `rgba(0,0,0,0.6)`,
                      borderColor: `rgba(${c.rgb}, ${isActive ? 0.7 : isHovered ? 0.5 : 0.2})`,
                      boxShadow: `0 0 ${isActive ? 35 : isHovered ? 20 : 8}px rgba(${c.rgb}, ${isActive ? 0.4 : isHovered ? 0.25 : 0.1}), inset 0 1px 0 rgba(255,255,255,0.05)`,
                    }}
                  >
                    {/* Top accent bar */}
                    <div className="h-[2px] w-full" style={{ background: `linear-gradient(90deg, transparent, rgba(${c.rgb}, ${isHovered || isActive ? 0.8 : 0.3}), transparent)` }} />

                    <div className="px-3 py-3 flex flex-col items-center text-center gap-1.5">
                      {/* Icon circle */}
                      <div
                        className="w-9 h-9 rounded-lg flex items-center justify-center border transition-all duration-300"
                        style={{
                          background: `rgba(${c.rgb}, ${isActive ? 0.2 : 0.08})`,
                          borderColor: `rgba(${c.rgb}, 0.25)`,
                          boxShadow: isHovered || isActive ? `0 0 12px rgba(${c.rgb}, 0.3)` : 'none',
                        }}
                      >
                        <span className="material-symbols-outlined text-[18px]" style={{ color: c.hex }}>{icon}</span>
                      </div>

                      {/* Type label */}
                      <span className="font-mono text-[8px] font-bold uppercase tracking-[0.15em]" style={{ color: `rgba(${c.rgb}, 0.8)` }}>{node.type}</span>

                      {/* Main label */}
                      <span className="font-display font-bold text-white text-[11px] leading-tight tracking-wide">{node.label}</span>

                      {/* Sub label */}
                      {node.subLabel && (
                        <span className="font-mono text-[8px] text-gray-500">{node.subLabel}</span>
                      )}

                      {/* Status indicator */}
                      <div className="flex items-center gap-1 mt-0.5">
                        <div className="w-1 h-1 rounded-full" style={{ background: c.hex, animation: 'xr-glow-pulse 2s ease-in-out infinite', animationDelay: `${ni * 0.3}s` }} />
                        <span className="font-mono text-[7px] uppercase tracking-widest" style={{ color: `rgba(${c.rgb}, 0.6)` }}>Online</span>
                      </div>
                    </div>

                    {/* Hover shimmer */}
                    <div className={`absolute inset-0 bg-gradient-to-br from-white/[0.06] to-transparent pointer-events-none transition-opacity duration-300 ${isHovered ? 'opacity-100' : 'opacity-0'}`} />
                  </div>

                  {/* View source button */}
                  <div className={`absolute -top-9 left-1/2 -translate-x-1/2 transition-all duration-300 ${isHovered || isActive ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2 pointer-events-none'}`} style={{ transform: `translateZ(15px) translateX(-50%)` }}>
                    <button onClick={(e) => { e.stopPropagation(); setModalNode(node); }} className="flex items-center gap-1 px-2.5 py-1 rounded-full text-[9px] font-bold uppercase tracking-wide transition-transform hover:scale-105 border" style={{ background: `rgba(${c.rgb}, 0.15)`, borderColor: `rgba(${c.rgb}, 0.4)`, color: c.hex, boxShadow: `0 0 12px rgba(${c.rgb}, 0.2)` }}>
                      <span className="material-symbols-outlined text-[11px]">code</span>
                      Source
                    </button>
                  </div>
                </div>

                {/* Floor shadow */}
                <div className="absolute top-[110%] left-1/2 -translate-x-1/2 w-[70%] h-3 rounded-full pointer-events-none" style={{ background: `radial-gradient(circle, rgba(${c.rgb}, 0.3), transparent 70%)`, transform: `translateZ(-${z}px)`, filter: 'blur(4px)' }} />

                {/* Tether beam */}
                <div className="absolute left-1/2 top-full w-[1px] pointer-events-none" style={{ height: z, transform: 'translateX(-50%) rotateX(-90deg)', transformOrigin: 'top center', background: `linear-gradient(to top, transparent, rgba(${c.rgb}, 0.25))` }} />
              </div>
            );
          })}
        </motion.div>

        {/* ── HUD OVERLAYS ── */}

        {/* Corner brackets */}
        <div className="absolute top-3 left-3 w-6 h-6 border-t border-l border-white/20 pointer-events-none z-40" />
        <div className="absolute top-3 right-3 w-6 h-6 border-t border-r border-white/20 pointer-events-none z-40" />
        <div className="absolute bottom-3 left-3 w-6 h-6 border-b border-l border-white/20 pointer-events-none z-40" />
        <div className="absolute bottom-3 right-3 w-6 h-6 border-b border-r border-white/20 pointer-events-none z-40" />

        {/* Title */}
        <div className="absolute top-5 left-5 z-50 pointer-events-none">
          <div className="flex items-center gap-2">
            <div className="w-1.5 h-1.5 bg-terminal-green rounded-full animate-pulse" />
            <span className="font-mono text-[9px] text-terminal-green uppercase tracking-[0.2em] font-bold">{version}</span>
          </div>
          <h3 className="font-display text-white text-xl md:text-2xl font-bold tracking-tight uppercase mt-1">{title}</h3>
          <div className="h-[1px] w-20 mt-2" style={{ background: 'linear-gradient(90deg, rgba(99,102,241,0.6), transparent)' }} />
        </div>

        {/* Top-right HUD */}
        <div className="absolute top-5 right-5 z-50 pointer-events-none flex flex-col items-end gap-1">
          <span className="font-mono text-[8px] text-gray-600 uppercase tracking-widest">SYS.ARCH</span>
          <div className="flex items-center gap-1.5">
            <span className="font-mono text-[8px] text-gray-500 uppercase">Nodes</span>
            <span className="font-mono text-[9px] text-primary font-bold">{nodes.length}</span>
            <span className="text-gray-700 text-[8px]">|</span>
            <span className="font-mono text-[8px] text-gray-500 uppercase">Links</span>
            <span className="font-mono text-[9px] text-primary font-bold">{nodes.length - 1}</span>
          </div>
          <div className="px-2 py-0.5 rounded border border-white/10 bg-black/40 mt-1">
            <span className="font-mono text-[8px] text-white/40 uppercase tracking-widest">3D Interactive</span>
          </div>
        </div>

        {/* Bottom-left status */}
        <div className="absolute bottom-5 left-5 z-50 pointer-events-none flex items-center gap-3">
          <div className="flex items-center gap-1.5">
            <div className="w-1 h-1 rounded-full bg-terminal-green" />
            <span className="font-mono text-[8px] text-terminal-green/70 uppercase tracking-widest font-bold">All Systems Nominal</span>
          </div>
        </div>

        {/* Bottom-right coordinates */}
        <div className="absolute bottom-5 right-5 z-50 pointer-events-none">
          <span className="font-mono text-[8px] text-gray-700 uppercase tabular-nums tracking-wider">
            {new Date().toISOString().slice(0, 19).replace('T', ' ')}
          </span>
        </div>
      </div>
    </>
  );
};

export default CodeXRay;
