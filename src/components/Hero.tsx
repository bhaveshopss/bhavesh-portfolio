import { useEffect, useRef, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { identity } from '../data/content';
import { PixelScene } from './PixelArt';
import { EASE } from './Reveal';

const INTRO_LINES = [
  `Hi, I'm ${identity.shortName.split(' ')[0]} — a human, not an AI employee.`,
  "I build infrastructure that heals itself and the AI that runs it.",
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
      className="w-[300px] rounded-xl border border-ink/10 bg-paper p-5 font-mono text-[12.5px] leading-relaxed text-ink-soft shadow-[0_2px_20px_rgba(19,19,17,0.06)] sm:w-[340px]"
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
      <div className="pointer-events-none absolute inset-x-0 top-24 mx-auto h-[46vh] max-w-4xl opacity-90" aria-hidden>
        <PixelScene seed={13} layers={['#D8E2FC', '#B4C6F8', '#8FA8F0']} accent="#E879B9" density={0.32} />
      </div>

      <div className="relative mx-auto flex w-full max-w-6xl flex-1 flex-col px-5 pt-28 sm:px-8 lg:px-10">
        <div className="flex justify-end">
          <TypewriterCard />
        </div>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.5, ease: EASE }}
          className="mt-auto pb-6 pt-16 font-display text-[15px] font-medium text-ink-soft sm:text-base"
        >
          {identity.role} · {identity.company} — {identity.location}
        </motion.p>
      </div>

      <motion.div style={{ y: contentY, opacity: contentOpacity }} className="relative">
        <h1
          className="select-none px-5 font-display text-[clamp(5rem,21.5vw,19rem)] font-black leading-[0.78] tracking-[-0.05em] text-ink sm:px-8 lg:px-10"
          aria-label="bhavesh"
        >
          <span aria-hidden className="flex justify-between">
            {'bhavesh'.split('').map((letter, i) => (
              <span key={i} className="inline-block overflow-hidden pb-[0.06em] -mb-[0.06em]">
                <motion.span
                  className="inline-block will-change-transform"
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

        <div className="mx-auto flex w-full max-w-6xl flex-col gap-8 px-5 pb-12 pt-8 sm:px-8 lg:flex-row lg:items-end lg:justify-between lg:px-10">
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
              className="rounded-full bg-ink px-6 py-3 font-mono text-[13.5px] text-cream transition-all duration-200 hover:scale-[1.03] hover:bg-signal active:scale-[0.98]"
            >
              Hire Me
            </button>
            <a
              href={identity.github}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-full border border-ink/15 bg-white/60 px-6 py-3 font-mono text-[13.5px] text-ink backdrop-blur-sm transition-all duration-200 hover:scale-[1.03] hover:border-ink/30 hover:bg-white"
            >
              GitHub
            </a>
            <a
              href={identity.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-full border border-ink/15 bg-white/60 px-6 py-3 font-mono text-[13.5px] text-ink backdrop-blur-sm transition-all duration-200 hover:scale-[1.03] hover:border-ink/30 hover:bg-white"
            >
              LinkedIn
            </a>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}
