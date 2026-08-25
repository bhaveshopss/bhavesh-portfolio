import { motion } from 'framer-motion';
import { identity } from '../data/content';
import { PixelScene } from './PixelArt';
import { Reveal, EASE } from './Reveal';

export function BigStatement({ onContactClick }: { onContactClick: () => void }) {
  return (
    <section className="relative overflow-hidden px-4 py-24 sm:px-6 sm:py-32">
      <div className="relative mx-auto max-w-5xl">
        <Reveal>
          <h2 className="text-balance text-center font-display text-4xl font-semibold leading-[1.05] tracking-tight text-ink sm:text-5xl md:text-6xl">
            What if infrastructure healed itself before anyone noticed?
          </h2>
        </Reveal>
        <Reveal delay={1}>
          <div className="mt-9 flex justify-center">
            <button
              onClick={onContactClick}
              className="rounded-full bg-ink px-7 py-3 font-mono text-[14px] text-cream transition-all duration-200 hover:scale-[1.04] hover:bg-signal active:scale-[0.98]"
            >
              Hire Me
            </button>
          </div>
        </Reveal>

        <motion.div
          initial={window.matchMedia('(prefers-reduced-motion: reduce)').matches ? { opacity: 0 } : { opacity: 0, y: 60 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 1, delay: 0.2, ease: EASE }}
          className="mt-16 h-[300px] overflow-hidden rounded-2xl border border-ink/10 sm:h-[380px]"
          aria-hidden
        >
          <PixelScene seed={42} layers={['#B4C6F8', '#6C8CF8', '#2B4BF2', '#0E1E66']} accent="#E879B9" />
        </motion.div>

        <Reveal delay={1}>
          <p className="mt-6 text-center font-mono text-[11px] uppercase tracking-[0.16em] text-ink-low">
            {identity.shortName} · {identity.role} · {identity.company}
          </p>
        </Reveal>
      </div>
    </section>
  );
}
