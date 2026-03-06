import React, { useEffect, useState } from 'react';
import { motion, useScroll, useSpring } from 'framer-motion';

const MotionDiv = motion.div as any;

const ScrollProgress: React.FC = () => {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 });

  return (
    <MotionDiv
      className="fixed top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-primary via-accent-purple to-accent-blue z-[70] origin-left"
      style={{ scaleX }}
    />
  );
};

export default ScrollProgress;
