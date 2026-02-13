import React, { lazy } from 'react';
import { useSectionTracking } from '../../hooks/useSectionTracking';

// Lazy load below-the-fold content to improve initial load time
const WorkSection = lazy(() => import('../Work/WorkSection'));
const TechStack = lazy(() => import('../TechStack/TechStack'));
const About = lazy(() => import('../About/About'));
const Blog = lazy(() => import('../Blog/Blog'));
const Contact = lazy(() => import('../Contact/Contact'));

const PortfolioContent: React.FC = () => {
  // This hook will now run after all lazy components have mounted and are present in the DOM
  useSectionTracking(['home', 'work', 'infrastructure', 'about', 'blog', 'contact']);

  return (
    <>
      <WorkSection />
      <TechStack />
      <About />
      <Blog />
      <Contact />
    </>
  );
};

export default PortfolioContent;
