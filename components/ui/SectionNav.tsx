import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

const MotionDiv = motion.div as any;

const sections = [
  { id: 'hero', label: 'Hero' },
  { id: 'services', label: 'Services' },
  { id: 'work', label: 'Work' },
  { id: 'infrastructure', label: 'Stack' },
  { id: 'ops', label: 'Ops' },
  { id: 'about', label: 'About' },
  { id: 'blog', label: 'Blog' },
  { id: 'contact', label: 'Contact' },
];

const SectionNav: React.FC = () => {
  const [activeSection, setActiveSection] = useState('hero');
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsVisible(window.scrollY > 300);

      const scrollPos = window.scrollY + window.innerHeight / 3;
      for (let i = sections.length - 1; i >= 0; i--) {
        const el = document.getElementById(sections[i].id);
        if (el && el.offsetTop <= scrollPos) {
          setActiveSection(sections[i].id);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  if (!isVisible) return null;

  return (
    <div className="fixed right-6 top-1/2 -translate-y-1/2 z-50 hidden lg:flex flex-col items-center gap-3">
      {sections.map((section) => {
        const isActive = activeSection === section.id;
        return (
          <a
            key={section.id}
            href={`#${section.id}`}
            className="group relative flex items-center cursor-interactive"
            aria-label={`Navigate to ${section.label}`}
          >
            {/* Label tooltip */}
            <span className="absolute right-6 px-2 py-1 rounded bg-gray-900 dark:bg-white text-white dark:text-black text-[10px] font-mono font-bold uppercase tracking-wider opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap">
              {section.label}
            </span>

            {/* Dot */}
            <div className={`w-2 h-2 rounded-full transition-all duration-300 ${
              isActive
                ? 'bg-primary scale-125 shadow-[0_0_8px_rgba(99,102,241,0.6)]'
                : 'bg-gray-300 dark:bg-gray-600 hover:bg-primary/50 hover:scale-110'
            }`} />
          </a>
        );
      })}
    </div>
  );
};

export default SectionNav;
