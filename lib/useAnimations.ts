import { useInView } from 'framer-motion';
import { useRef, useCallback } from 'react';

export interface AnimationConfig {
  delay?: number;
  duration?: number;
  once?: boolean;
  margin?: string;
}

// Default animation durations for consistency
export const ANIMATION_DURATION = {
  fast: 0.2,
  normal: 0.4,
  slow: 0.6,
  slower: 0.8,
} as const;

// Stagger delays for lists
export const STAGGER_DELAY = {
  fast: 0.05,
  normal: 0.1,
  slow: 0.15,
} as const;

// Standard animation variants
export const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0 },
};

export const fadeIn = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
};

export const scaleIn = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: { opacity: 1, scale: 1 },
};

export const slideInLeft = {
  hidden: { opacity: 0, x: -30 },
  visible: { opacity: 1, x: 0 },
};

export const slideInRight = {
  hidden: { opacity: 0, x: 30 },
  visible: { opacity: 1, x: 0 },
};

export const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: STAGGER_DELAY.normal,
    },
  },
};

// Hook for scroll-triggered animations
export function useScrollAnimation(config: AnimationConfig = {}) {
  const { once = true, margin = '-100px' } = config;
  const ref = useRef(null);
  const isInView = useInView(ref, { once, margin });

  return { ref, isInView };
}

// Standard transition for consistent timing
export const standardTransition = {
  duration: ANIMATION_DURATION.normal,
  ease: [0.4, 0, 0.2, 1], // cubic-bezier(0.4, 0, 0.2, 1)
};

// Spring transition for bounce effects
export const springTransition = {
  type: 'spring' as const,
  stiffness: 300,
  damping: 30,
};