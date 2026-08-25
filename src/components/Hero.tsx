import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowUpRight, ArrowDown } from 'lucide-react';
import { identity } from '../data/content';
import { SignalField } from './SignalField';
import { EASE } from './Reveal';

function KineticName() {
  const letters = 'bhavesh'.split('');
  return (
    <h1
      className="font-display font-black leading-[0.82] tracking-[-0.045em] text-paper-hi select-none"
      aria-label="Bhavesh"
    >
      <span aria-hidden className="flex justify-between text-[clamp(3.4rem,15vw,12.5rem)]">
        {letters.map((letter, i) => (
          <span key={i} className="inline-block overflow-hidden pb-[0.08em] -mb-[0.08em]">
            <motion.span
              className="inline-block will-change-transform"
              initial={{ y: '110%' }}
              animate={{ y: 0 }}
              transition={{ duration: 0.9, delay: 0.35 + i * 0.055, ease: EASE }}
            >
              {letter}
            </motion.span>
          </span>
        ))}
      </span>
    </h1>
  );
}

export function Hero({ onContactClick }: { onContactClick: () => void }) {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end start'],
  });
  const contentY = useTransform(scrollYProgress, [0, 1], ['0%', '24%']);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);
  const fieldOpacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  return (
    <section id="top" ref={ref} className="relative flex min-h-svh flex-col overflow-hidden">
      <div className="hero-grid absolute inset-0" aria-hidden />
      <div className="glow-field absolute inset-0" aria-hidden />
      <motion.div
        style={{ opacity: fieldOpacity }}
        className="absolute inset-x-0 top-0 h-[72vh]"
        aria-hidden
      >
        <SignalField />
      </motion.div>

      <motion.div
        style={{ y: contentY, opacity: contentOpacity }}
        className="relative mx-auto flex w-full max-w-6xl flex-1 flex-col justify-end px-5 pb-10 pt-32 sm:px-8 lg:px-12"
      >
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.15, ease: EASE }}
          className="mb-8 flex items-center gap-3"
        >
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-signal opacity-60 motion-reduce:animate-none" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-signal" />
          </span>
          <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-paper-mid">
            {identity.role} · {identity.company} · {identity.location}
          </p>
        </motion.div>

        <KineticName />

        <div className="mt-8 grid grid-cols-12 items-end gap-6">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.9, ease: EASE }}
            className="col-span-12 max-w-md font-display text-lg font-medium leading-snug text-paper-hi sm:text-xl lg:col-span-5"
          >
            {identity.positioning}
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.0, ease: EASE }}
            className="col-span-12 max-w-md text-[13px] leading-relaxed text-paper-mid sm:text-sm lg:col-span-4"
          >
            {identity.intro}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.1, ease: EASE }}
            className="col-span-12 flex flex-wrap items-center gap-3 lg:col-span-3 lg:justify-end"
          >
            <a
              href={identity.resume}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center gap-2 rounded-full bg-paper-hi px-5 py-2.5 font-mono text-[12.5px] font-medium text-ink transition-transform duration-300 hover:scale-[1.03] active:scale-[0.98]"
            >
              Résumé
              <ArrowUpRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </a>
            <button
              onClick={onContactClick}
              className="group flex items-center gap-2 rounded-full border border-line px-5 py-2.5 font-mono text-[12.5px] text-paper-hi transition-all duration-300 hover:border-signal/50 hover:bg-signal-dim"
            >
              Let's work together
              <ArrowUpRight className="h-3.5 w-3.5 text-signal transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </button>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.5 }}
          className="mt-14 flex items-center justify-between border-t border-line pt-5"
        >
          <p className="font-mono text-[10.5px] uppercase tracking-[0.18em] text-paper-low">
            DevOps → AIOps → Founder's Office
          </p>
          <motion.div
            animate={{ y: [0, 5, 0] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
            className="motion-reduce:animate-none"
            aria-hidden
          >
            <ArrowDown className="h-3.5 w-3.5 text-paper-low" />
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  );
}
