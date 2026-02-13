import React from 'react';
import { LogoCloud } from '../ui/LogoCloud';
import { motion } from 'framer-motion';

const TechStack: React.FC = () => {
  // Cast motion components to any to avoid strict type issues in this environment
  const MotionH2 = motion.h2 as any;
  const MotionP = motion.p as any;
  const MotionDiv = motion.div as any;

  return (
    <section className="relative z-10 py-24 bg-gray-50 dark:bg-[#030303] overflow-hidden transition-colors duration-500" id="infrastructure">

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16">
          <MotionH2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="font-display text-3xl md:text-5xl text-gray-900 dark:text-white mb-4 uppercase font-bold tracking-tight"
          >
            Core <span className="text-primary">Infrastructure</span>
          </MotionH2>
          <MotionP
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-gray-600 dark:text-text-high-contrast max-w-2xl mx-auto font-medium text-base font-mono"
          >
            The foundational systems powering my engineering reliability.
          </MotionP>
        </div>

        <MotionDiv
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.4 }}
          className="w-full"
        >
          <LogoCloud />
        </MotionDiv>

        {/* Decorative footer element instead of redundant text */}
        <div className="mt-12 flex justify-center opacity-30">
          <div className="h-1 w-24 bg-gradient-to-r from-transparent via-primary to-transparent"></div>
        </div>
      </div>
    </section>
  );
};

export default TechStack;