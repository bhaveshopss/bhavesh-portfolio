import React, { useEffect, useState } from 'react';

const Cursor: React.FC = () => {
  const [position, setPosition] = useState({ x: -100, y: -100 });
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    const onMouseMove = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
    };

    const onMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (
        target.tagName === 'A' ||
        target.tagName === 'BUTTON' ||
        target.closest('a') ||
        target.closest('button') ||
        target.classList.contains('cursor-interactive')
      ) {
        setIsHovering(true);
      } else {
        setIsHovering(false);
      }
    };

    window.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseover', onMouseOver);

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseover', onMouseOver);
    };
  }, []);

  return (
    <div
      className={`fixed pointer-events-none z-[9999] transition-transform duration-100 ease-out mix-blend-difference hidden md:block`}
      style={{
        left: position.x,
        top: position.y,
        transform: `translate(-50%, -50%) ${isHovering ? 'scale(1.5)' : 'scale(1)'}`,
      }}
    >
      {/* Radar Circle */}
      <div className={`
        relative w-10 h-10 rounded-full border border-[rgba(0,255,65,0.4)]
        ${isHovering ? 'bg-[rgba(255,255,255,0.1)] border-white' : ''}
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