import React, { useState, useEffect, Suspense } from 'react';
import Navbar from './components/Layout/Navbar';
import Cursor from './components/Layout/Cursor';
import OSSettings from './components/Layout/OSSettings';
import Hero from './components/Hero/Hero';
import { Analytics } from "@vercel/analytics/react";
import PortfolioContent from './components/Layout/PortfolioContent';

const App: React.FC = () => {
  const [scanlines, setScanlines] = useState(true);
  const [grain, setGrain] = useState(true);

  // Apply visual effects
  useEffect(() => {
    // Grain effect logic
    // The grain overlay is always present in HTML structure below, 
    // we toggle classes or opacity based on state.
  }, [grain]);

  return (
    <div className={`min-h-screen bg-background-light dark:bg-background-dark text-gray-900 dark:text-text-high-contrast font-body transition-colors duration-500 selection:bg-primary selection:text-white overflow-x-hidden relative`}>
      {/* Global Overlays */}
      <div
        className={`fixed inset-0 pointer-events-none z-50 bg-grain mix-blend-overlay transition-opacity duration-300 ${grain ? 'opacity-90 dark:opacity-40' : 'opacity-20 dark:opacity-5'}`}
        id="grain-overlay"
      ></div>

      {scanlines && <div className="scanline-overlay"></div>}

      <Cursor />
      <Navbar />
      <OSSettings
        scanlines={scanlines}
        setScanlines={setScanlines}
        grain={grain}
        setGrain={setGrain}
      />

      <Hero />

      <Suspense fallback={
        <div className="flex items-center justify-center w-full py-20">
          <div className="text-primary font-mono animate-pulse">Loading system modules...</div>
        </div>
      }>
        <PortfolioContent />
      </Suspense>

      <Analytics />
    </div>
  );
};

export default App;
