import { useCallback, useState } from 'react';
import { motion, useScroll, useSpring } from 'framer-motion';
import { Sparkle } from 'lucide-react';
import { Nav } from './src/components/Nav';
import { Hero } from './src/components/Hero';
import { StackStrip } from './src/components/StackStrip';
import { AboutMe } from './src/components/AboutMe';
import { Work } from './src/components/Work';
import { Credentials } from './src/components/Credentials';
import { BigStatement } from './src/components/BigStatement';
import { Blog } from './src/components/Blog';
import { Contact, Footer } from './src/components/Contact';
import { Concierge, scrollToSection } from './src/agent/Concierge';
import { EASE } from './src/components/Reveal';

function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 28, restDelta: 0.001 });
  return (
    <motion.div
      aria-hidden
      style={{ scaleX }}
      className="fixed inset-x-0 top-0 z-50 h-[3px] origin-left bg-gradient-to-r from-signal via-blush to-signal"
    />
  );
}

function Aurora() {
  return (
    <div className="aurora" aria-hidden>
      <span />
      <span />
      <span />
    </div>
  );
}

export default function App() {
  const [agentOpen, setAgentOpen] = useState(false);

  const openContact = useCallback(() => {
    scrollToSection('contact');
  }, []);

  return (
    <div className="grain relative min-h-screen bg-cream font-display text-ink">
      <Aurora />
      <ScrollProgress />

      <Nav onContactClick={openContact} />

      <main className="relative z-10">
        <Hero onContactClick={openContact} />
        <StackStrip />
        <AboutMe onHireClick={openContact} />
        <Work />
        <Credentials />
        <BigStatement onContactClick={openContact} />
        <Blog />
        <Contact />
      </main>

      <div className="relative z-10">
        <Footer onContactClick={openContact} />
      </div>

      <motion.button
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 1.2, ease: EASE }}
        onClick={() => setAgentOpen(true)}
        aria-label="Open Bhavesh's AI concierge"
        className="glass-deep group fixed bottom-20 right-5 z-40 flex items-center gap-2.5 rounded-full py-2.5 pl-4 pr-5 transition-all duration-300 hover:scale-[1.04] hover:border-signal/50 md:bottom-6 md:right-6"
      >
        <span className="relative flex h-5 w-5 items-center justify-center">
          <span
            className="absolute h-full w-full rounded-full bg-signal/15 blur-[6px] transition-all duration-300 group-hover:bg-signal/30"
            aria-hidden
          />
          <Sparkle className="relative h-3.5 w-3.5 text-signal" />
        </span>
        <span className="font-mono text-[12px] font-medium text-ink">Ask Bhavesh</span>
      </motion.button>

      <Concierge open={agentOpen} onClose={() => setAgentOpen(false)} />
    </div>
  );
}
