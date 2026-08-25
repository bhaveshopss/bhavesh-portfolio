import { useCallback, useState } from 'react';
import { motion } from 'framer-motion';
import { Sparkle } from 'lucide-react';
import { Nav } from './src/components/Nav';
import { Hero } from './src/components/Hero';
import { StackStrip } from './src/components/StackStrip';
import { AboutMe } from './src/components/AboutMe';
import { Work } from './src/components/Work';
import { Credentials } from './src/components/Credentials';
import { BigStatement } from './src/components/BigStatement';
import { Blog, Contact, Footer } from './src/components/Contact';
import { Concierge, scrollToSection } from './src/agent/Concierge';
import { EASE } from './src/components/Reveal';

export default function App() {
  const [agentOpen, setAgentOpen] = useState(false);

  const openContact = useCallback(() => {
    scrollToSection('contact');
  }, []);

  return (
    <div className="grain min-h-screen bg-cream font-display text-ink">
      <Nav onContactClick={openContact} />

      <main>
        <Hero onContactClick={openContact} />
        <StackStrip />
        <AboutMe onHireClick={openContact} />
        <Work />
        <Credentials />
        <BigStatement onContactClick={openContact} />
        <Blog />
        <Contact />
      </main>

      <Footer onContactClick={openContact} />

      <motion.button
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 1.2, ease: EASE }}
        onClick={() => setAgentOpen(true)}
        aria-label="Open Bhavesh's AI concierge"
        className="group fixed bottom-20 right-5 z-40 flex items-center gap-2.5 rounded-full border border-ink/15 bg-white/90 py-2.5 pl-4 pr-5 shadow-[0_8px_32px_rgba(19,19,17,0.14)] backdrop-blur-xl transition-all duration-300 hover:border-signal/50 md:bottom-6 md:right-6"
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
