import React, { useEffect, useState, useRef } from 'react';

const Cursor: React.FC = () => {
  const cursorRef = useRef<HTMLDivElement>(null);
  const [isHovering, setIsHovering] = useState(false);

  // Use a ref to track position without triggering re-renders
  const positionRef = useRef({ x: -100, y: -100 });
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    const updatePosition = () => {
      if (cursorRef.current) {
        cursorRef.current.style.transform = `translate3d(${positionRef.current.x}px, ${positionRef.current.y}px, 0) translate(-50%, -50%) ${isHovering ? 'scale(1.5)' : 'scale(1)'}`;
      }
      rafRef.current = null;
    };

    const onMouseMove = (e: MouseEvent) => {
      positionRef.current = { x: e.clientX, y: e.clientY };

      if (rafRef.current === null) {
        rafRef.current = requestAnimationFrame(updatePosition);
      }
    };

    const onMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      // Check using closest to handle nested elements within interactive targets
      const interactive =
        target.tagName === 'A' ||
        target.tagName === 'BUTTON' ||
        target.closest('a') ||
        target.closest('button') ||
        target.closest('.cursor-interactive');

      setIsHovering(!!interactive);

      // Force an immediate update to apply the scale effect
      if (rafRef.current === null) {
        rafRef.current = requestAnimationFrame(updatePosition);
      }
    };

    window.addEventListener('mousemove', onMouseMove, { passive: true });
    document.addEventListener('mouseover', onMouseOver, { passive: true });

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseover', onMouseOver);
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
      }
    };
  }, [isHovering]); // Re-bind when hovering changes to ensure scale is applied correctly

  return (
    <div
      ref={cursorRef}
      className={`fixed pointer-events-none z-[9999] transition-transform duration-100 ease-out mix-blend-difference hidden md:block will-change-transform`}
      style={{
        left: 0,
        top: 0,
        transform: `translate3d(-100px, -100px, 0) translate(-50%, -50%) scale(1)`,
      }}
    >
      {/* Radar Circle */}
      <div className={`
        relative w-10 h-10 rounded-full border border-[rgba(0,255,65,0.4)]
        ${isHovering ? 'bg-[rgba(255,255,255,0.1)] border-white' : ''}
        transition-colors duration-200
      `}>
        {/* Radar Sweep Animation */}
        {!isHovering && (
          <div className="absolute inset-0 rounded-full animate-radar-sweep bg-[conic-gradient(from_0deg,transparent_0deg,rgba(0,255,65,0.1)_60deg,transparent_60deg)]" />
        )}

        {/* Center Dot */}
        <div className="absolute top-1/2 left-1/2 w-1 h-1 bg-[#00ff41] rounded-full -translate-x-1/2 -translate-y-1/2" />

        {/* Crosshairs */}
        <div className="absolute top-[-5px] left-1/2 w-px h-[50px] bg-[rgba(0,255,65,0.2)] -translate-x-1/2" />
        <div className="absolute top-1/2 left-[-5px] w-[50px] h-px bg-[rgba(0,255,65,0.2)] -translate-y-1/2" />
      </div>
    </div>
  );
};

export default Cursor;