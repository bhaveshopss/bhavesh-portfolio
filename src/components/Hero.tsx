import { useEffect, useRef, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { identity } from '../data/content';
import { PixelFigure } from './PixelArt';
import { EASE } from './Reveal';

const INTRO_LINES = [
  `Hi, I'm ${identity.shortName.split(' ')[0]}. A human, not an AI employee.`,
  'I build infrastructure that heals itself and the AI that runs it.',
  'Three years, three roles, one direction: more leverage per decision.',
];

function TypewriterCard() {
  const [lineIndex, setLineIndex] = useState(0);
  const [charCount, setCharCount] = useState(0);

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setLineIndex(INTRO_LINES.length);
      setCharCount(0);
      return;
    }
    if (lineIndex >= INTRO_LINES.length) return;
    const line = INTRO_LINES[lineIndex];
    if (charCount < line.length) {
      const t = setTimeout(() => setCharCount((c) => c + 1), 22);
      return () => clearTimeout(t);
    }
    const t = setTimeout(() => {
      setLineIndex((l) => l + 1);
      setCharCount(0);
    }, 700);
    return () => clearTimeout(t);
  }, [lineIndex, charCount]);

  const done = lineIndex >= INTRO_LINES.length;

  return (
    <motion.div
      initial={{ opacity: 0, y: -12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, delay: 0.3, ease: EASE }}
      className="glass w-[290px] rounded-2xl p-5 font-mono text-[12.5px] leading-relaxed text-ink sm:w-[335px]"
    >
      {INTRO_LINES.slice(0, lineIndex).map((line, i) => (
        <p key={i} className="mb-2.5 last:mb-0">
          {line}
        </p>
      ))}
      {!done && (
        <p className="mb-0">
          {INTRO_LINES[lineIndex].slice(0, charCount)}
          <span className="caret-blink text-signal">▍</span>
        </p>
      )}
    </motion.div>
  );
}

export function Hero({ onContactClick }: { onContactClick: () => void }) {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end start'],
  });
  const contentY = useTransform(scrollYProgress, [0, 1], ['0%', '18%']);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.85], [1, 0]);

  return (
    <section id="top" ref={ref} className="relative flex min-h-svh flex-col overflow-hidden">
      <div className="relative mx-auto flex w-full max-w-6xl flex-1 flex-col px-5 pt-28 sm:px-8 lg:px-10">
        <div className="flex justify-end">
          <TypewriterCard />
        </div>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.5, ease: EASE }}
          className="glass-chip mb-auto mt-10 w-fit rounded-full px-4 py-2 font-mono text-[11.5px] tracking-wide text-ink-soft"
        >
          {identity.role} · {identity.company} · {identity.location}
        </motion.p>
      </div>

      <motion.div style={{ y: contentY, opacity: contentOpacity }} className="relative">
        <div className="relative">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.7 }}
            className="pointer-events-none absolute bottom-[52%] right-[3%] z-0 w-[34%] max-w-[520px] sm:right-[6%]"
            aria-hidden
          >
            <PixelFigure cell={6} />
          </motion.div>
          <h1
            className="relative z-10 select-none whitespace-nowrap text-center font-display text-[24.5vw] font-black leading-[0.78] tracking-[-0.055em] text-transparent"
            aria-label="bhavesh"
          >
            <span aria-hidden className="inline-flex">
              {'bhavesh'.split('').map((letter, i) => (
                <span key={i} className="inline-block overflow-hidden pb-[0.06em] -mb-[0.06em]">
                  <motion.span
                    className="inline-block bg-gradient-to-b from-ink via-ink to-[#33409e] bg-clip-text will-change-transform"
                    initial={{ y: '108%' }}
                    animate={{ y: 0 }}
                    transition={{ duration: 0.9, delay: 0.35 + i * 0.05, ease: EASE }}
                  >
                    {letter}
                  </motion.span>
                </span>
              ))}
            </span>
          </h1>
        </div>

        <div className="mx-auto flex w-full max-w-6xl flex-col gap-8 px-5 pb-12 pt-10 sm:px-8 lg:flex-row lg:items-end lg:justify-between lg:px-10">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.0, ease: EASE }}
            className="max-w-md font-display text-2xl font-semibold tracking-tight text-ink sm:text-3xl"
          >
            {identity.positioning}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.1, ease: EASE }}
            className="flex flex-wrap items-center gap-2.5"
          >
            <button
              onClick={onContactClick}
              className="shine rounded-full bg-ink px-7 py-3 font-mono text-[13.5px] text-cream transition-all duration-200 hover:scale-[1.03] hover:bg-signal active:scale-[0.98]"
            >
              Hire Me
            </button>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}
