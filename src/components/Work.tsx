import { useEffect, useMemo, useRef, useState } from 'react';
import { animate, motion, useInView, useReducedMotion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import { projects } from '../data/content';
import { Reveal, SectionLabel, EASE } from './Reveal';

function parseMetric(value: string): { prefix: string; target: number; decimals: number; suffix: string } | null {
  const m = value.match(/^([^0-9]*)(\d+(?:\.\d+)?)(.*)$/);
  if (!m) return null;
  return {
    prefix: m[1],
    target: parseFloat(m[2]),
    decimals: m[2].includes('.') ? 1 : 0,
    suffix: m[3],
  };
}

function AnimatedMetric({ value, className }: { value: string; className?: string }) {
  const ref = useRef<HTMLParagraphElement>(null);
  const inView = useInView(ref, { once: true, margin: '-40px' });
  const reduce = useReducedMotion();
  const parts = useMemo(() => parseMetric(value), [value]);

  const [display, setDisplay] = useState(() => {
    if (!parts || reduce) return value;
    return `${parts.prefix}0${parts.suffix}`;
  });

  useEffect(() => {
    if (!parts || !inView || reduce) return;
    const controls = animate(0, parts.target, {
      duration: 1.4,
      ease: EASE,
      onUpdate: (v) =>
        setDisplay(`${parts.prefix}${v.toFixed(parts.decimals)}${parts.suffix}`),
    });
    return () => controls.stop();
  }, [inView, parts, reduce]);

  return (
    <p ref={ref} className={className}>
      {display}
    </p>
  );
}

export function Work() {
  return (
    <section id="work" className="relative scroll-mt-20 px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
      <div className="mx-auto max-w-6xl">
        <SectionLabel index="01" title="Selected work" />

        <Reveal delay={1}>
          <h2 className="mt-8 max-w-2xl font-display text-4xl font-semibold leading-[1.02] tracking-tight text-ink sm:text-5xl">
            Systems that operate{' '}
            <span className="bg-gradient-to-r from-signal to-blush bg-clip-text text-transparent">
              themselves.
            </span>
          </h2>
        </Reveal>

        <div className="mt-12 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {projects.map((project, i) => (
            <Reveal key={project.id} delay={Math.min(i, 2)} className="h-full">
              <motion.article
                whileHover={{ y: -6 }}
                transition={{ duration: 0.5, ease: EASE }}
                className={`group relative flex h-full flex-col overflow-hidden rounded-3xl p-7 sm:p-8 ${
                  i === 1
                    ? 'shine bg-signal text-cream shadow-[0_16px_40px_-12px_rgba(43,75,242,0.45)]'
                    : i === 2
                      ? 'shine bg-blush text-ink blush-texture shadow-[0_16px_40px_-12px_rgba(232,121,185,0.4)]'
                      : 'card-glow glass text-ink'
                }`}
              >
                <p
                  className={`font-mono text-[10.5px] uppercase tracking-[0.16em] ${
                    i === 0 ? 'text-ink-low' : 'opacity-60'
                  }`}
                >
                  ▪ {project.tagline}
                </p>
                <h3 className="mt-5 font-display text-2xl font-semibold tracking-tight">
                  {project.name}
                </h3>
                <p
                  className={`mt-4 text-[13px] leading-relaxed ${
                    i === 0 ? 'text-ink-mid' : 'opacity-80'
                  }`}
                >
                  {project.problem}
                </p>
                <p
                  className={`mt-3 text-[13px] leading-relaxed ${
                    i === 0 ? 'text-ink-soft' : 'opacity-95'
                  }`}
                >
                  {project.contribution}
                </p>

                <div className="mt-6 flex flex-wrap gap-1.5">
                  {project.stack.slice(0, 4).map((tech) => (
                    <span
                      key={tech}
                      className={`rounded-full px-2.5 py-1 font-mono text-[10px] ${
                        i === 0
                          ? 'border border-ink/15 text-ink-mid'
                          : 'border border-white/25 text-white/85'
                      }`}
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                <div
                  className={`mt-auto grid grid-cols-3 gap-2 pt-7 ${
                    i === 0 ? 'text-ink' : 'text-cream'
                  }`}
                >
                  {project.impact.map((metric) => (
                    <div key={metric.label}>
                      <AnimatedMetric
                        value={metric.value}
                        className="font-display text-xl font-bold tracking-tight"
                      />
                      <p
                        className={`mt-0.5 font-mono text-[9px] leading-snug ${
                          i === 0 ? 'text-ink-low' : 'opacity-65'
                        }`}
                      >
                        {metric.label}
                      </p>
                    </div>
                  ))}
                </div>

                {project.link && (
                  <a
                    href={project.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`mt-6 inline-flex w-fit items-center gap-1.5 font-mono text-[12px] underline-offset-4 hover:underline ${
                      i === 0 ? 'text-ink' : 'text-cream'
                    }`}
                  >
                    {project.linkLabel ?? 'View repository'}
                    <ArrowUpRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </a>
                )}
              </motion.article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
