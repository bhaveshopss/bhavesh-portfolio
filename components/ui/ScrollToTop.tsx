import React from 'react';
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from 'framer-motion';
import { ArrowUp } from 'lucide-react';

const MotionButton = motion.button as any;

const ScrollToTop: React.FC = () => {
  const { scrollYProgress } = useScroll();
  const [visible, setVisible] = React.useState(false);

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    setVisible(latest > 0.15);
  });

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <AnimatePresence>
      {visible && (
        <MotionButton
          initial={{ opacity: 0, scale: 0.8, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.8, y: 20 }}
          transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={scrollToTop}
          className="fixed bottom-20 sm:bottom-8 right-6 z-[55] w-10 h-10 rounded-full bg-white dark:bg-gray-900 border border-gray-200 dark:border-white/10 shadow-lg flex items-center justify-center cursor-interactive hover:bg-primary hover:border-primary hover:text-white dark:hover:bg-primary transition-colors group"
          aria-label="Scroll to top"
        >
          <ArrowUp className="w-4 h-4 text-gray-600 dark:text-gray-300 group-hover:text-white transition-colors" />
        </MotionButton>
      )}
    </AnimatePresence>
  );
};

export default ScrollToTop;
