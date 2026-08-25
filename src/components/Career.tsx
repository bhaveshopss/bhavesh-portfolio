import { useRef } from 'react';
import { motion, useScroll, useSpring } from 'framer-motion';
import { timeline } from '../data/content';
import { Reveal, Section, SectionLabel, EASE } from './Reveal';

export function Career() {
  const trackRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: trackRef,
    offset: ['start 0.75', 'end 0.55'],
  });
  const progress = useSpring(scrollYProgress, { stiffness: 90, damping: 26 });

  return (
    <Section id="career" className="py-24 sm:py-32">
      <SectionLabel index="01" title="Career evolution" />

      <Reveal delay={1}>
        <h2 className="mt-8 max-w-2xl font-display text-4xl font-semibold leading-[1.02] tracking-tight text-paper-hi sm:text-5xl md:text-6xl">
          Reliability first.
          <br />
          Then intelligence.
          <br />
          <span className="text-paper-low">Then direction.</span>
        </h2>
      </Reveal>

      <div ref={trackRef} className="relative mt-16 sm:mt-20">
        <div className="absolute bottom-0 left-[7px] top-2 w-px bg-line sm:left-[99px]" aria-hidden />
        <motion.div
          style={{ scaleY: progress }}
          className="absolute bottom-0 left-[7px] top-2 w-px origin-top bg-signal sm:left-[99px]"
          aria-hidden
        />

        <div className="flex flex-col gap-14 sm:gap-20">
          {timeline.map((stage, i) => (
            <div key={stage.id} className="relative grid grid-cols-[1fr] gap-4 pl-8 sm:grid-cols-[80px_130px_1fr] sm:gap-10 sm:pl-0">
              <div className="absolute left-0 top-[7px] sm:static">
                <Reveal delay={0}>
                  <span
                    className={`block h-[15px] w-[15px] rounded-full border sm:ml-[92px] ${
                      i === timeline.length - 1
                        ? 'border-signal bg-signal/25 shadow-[0_0_16px_rgba(255,176,32,0.4)]'
                        : 'border-paper-low bg-ink'
                    }`}
                    aria-hidden
                  />
                </Reveal>
              </div>

              <div className="hidden sm:block">
                <Reveal delay={0}>
                  <p className="font-mono text-[11px] text-paper-low">{stage.period}</p>
                </Reveal>
              </div>

              <div>
                <Reveal delay={1}>
                  <p className="font-mono text-[11px] text-signal sm:hidden">{stage.period}</p>
                  <h3 className="mt-2 font-display text-2xl font-semibold tracking-tight text-paper-hi sm:mt-0 sm:text-3xl">
                    {stage.role}
                    <span className="text-paper-low"> · {stage.company}</span>
                  </h3>
                  <p className="mt-1 font-mono text-[11px] uppercase tracking-[0.16em] text-paper-mid">
                    {stage.focus}
                  </p>
                </Reveal>

                <Reveal delay={2}>
                  <p className="mt-4 max-w-xl text-[13.5px] leading-relaxed text-paper-mid sm:text-sm">
                    {stage.description}
                  </p>
                </Reveal>

                <motion.ul
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, margin: '-60px' }}
                  transition={{ staggerChildren: 0.06 }}
                  className="mt-5 max-w-xl space-y-2"
                >
                  {stage.points.map((point) => (
                    <motion.li
                      key={point}
                      variants={{
                        hidden: { opacity: 0, x: -12 },
                        visible: { opacity: 1, x: 0, transition: { duration: 0.5, ease: EASE } },
                      }}
                      className="flex items-start gap-3 text-[13px] leading-relaxed text-paper-hi/85 sm:text-[13.5px]"
                    >
                      <span className="mt-[7px] h-px w-3 shrink-0 bg-signal/60" aria-hidden />
                      {point}
                    </motion.li>
                  ))}
                </motion.ul>

                <Reveal delay={2}>
                  <div className="mt-5 flex flex-wrap gap-x-4 gap-y-1.5">
                    {stage.tools.map((tool) => (
                      <span key={tool} className="font-mono text-[10.5px] text-paper-low">
                        {tool}
                      </span>
                    ))}
                  </div>
                </Reveal>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Section>
  );
}
