import { motion } from 'framer-motion';
import { identity } from '../data/content';
import { PixelRidge } from './PixelArt';
import { Reveal, EASE } from './Reveal';

export function BigStatement({ onContactClick }: { onContactClick: () => void }) {
  return (
    <section className="relative overflow-hidden pt-24 sm:pt-32">
      <div className="mx-auto max-w-5xl px-5 sm:px-8">
        <Reveal>
          <h2 className="text-balance text-center font-display text-[clamp(2.5rem,7vw,4.5rem)] font-medium leading-[1.02] tracking-[-0.02em] text-ink">
            What if infrastructure healed itself before anyone noticed?
          </h2>
        </Reveal>
        <Reveal delay={1}>
          <div className="mt-10 flex justify-center">
            <button
              onClick={onContactClick}
              className="shine rounded-full bg-ink px-7 py-3 font-mono text-[14px] text-cream transition-all duration-200 hover:scale-[1.04] hover:bg-signal active:scale-[0.98]"
            >
              Hire Me
            </button>
          </div>
        </Reveal>
      </div>

      <motion.div
        initial={window.matchMedia('(prefers-reduced-motion: reduce)').matches ? { opacity: 0 } : { opacity: 0, y: 80 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-40px' }}
        transition={{ duration: 1, delay: 0.15, ease: EASE }}
        className="relative -mt-6 h-[320px] w-full sm:h-[420px]"
        aria-hidden
      >
        <PixelRidge seed={42} layers={['#9DB8FA', '#4C6EF5', '#2B4BF2', '#0E1E66']} accent="#E879B9" />
      </motion.div>
    </section>
  );
}
