import React, { useState, useEffect } from 'react';
import Navbar from './components/Layout/Navbar';
import Cursor from './components/Layout/Cursor';
import ScrollProgress from './components/ui/ScrollProgress';
import ScrollToTop from './components/ui/ScrollToTop';
import SectionNav from './components/ui/SectionNav';

import Hero from './components/Hero/Hero';
import Services from './components/Services/Services';
import WorkSection from './components/Work/WorkSection';
import TechStack from './components/TechStack/TechStack';
import MetricsDashboard from './components/Metrics/MetricsDashboard';
import About from './components/About/About';
import Blog from './components/Blog/Blog';
import Contact from './components/Contact/Contact';
import { Analytics } from "@vercel/analytics/react";

const App: React.FC = () => {
  const [grain, setGrain] = useState(true);

  return (
    <div className={`min-h-screen bg-background-light dark:bg-background-dark text-gray-900 dark:text-text-high-contrast font-body selection:bg-primary selection:text-white overflow-x-hidden relative`}>
      {/* Global Overlays */}
      <div
        className={`fixed inset-0 pointer-events-none z-50 bg-grain mix-blend-overlay ${grain ? 'opacity-30 dark:opacity-20' : 'opacity-10 dark:opacity-5'}`}
        id="grain-overlay"
        style={{ willChange: 'auto' }}
      ></div>

      <ScrollProgress />
      <Cursor />
      <Navbar />
      <SectionNav />
      <ScrollToTop />

      <Hero />
      <Services />
      <WorkSection />
      <TechStack />
      <MetricsDashboard />
      <About />
      <Blog />
      <Contact />
      <Analytics />
    </div>
  );
};

export default App;
