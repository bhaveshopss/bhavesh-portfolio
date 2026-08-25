import { motion, type Variants } from 'framer-motion';
import type { ReactNode } from 'react';

export const EASE = [0.22, 1, 0.36, 1] as const;

export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 28 },
  visible: (i: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, delay: i * 0.08, ease: EASE },
  }),
};

export function Reveal({
  children,
  delay = 0,
  className = '',
  as = 'div',
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
  as?: 'div' | 'span';
}) {
  const Comp = as === 'span' ? motion.span : motion.div;
  return (
    <Comp
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-80px' }}
      custom={delay}
      variants={fadeUp}
      className={className}
    >
      {children}
    </Comp>
  );
}

export function SectionLabel({ index, title }: { index: string; title: string }) {
  return (
    <Reveal>
      <div className="flex items-center gap-4">
        <span className="font-mono text-[11px] text-signal">{index}</span>
        <span className="h-px w-10 bg-line" aria-hidden />
        <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-paper-mid">
          {title}
        </span>
      </div>
    </Reveal>
  );
}

export function Section({
  id,
  children,
  className = '',
}: {
  id: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <section id={id} className={`relative scroll-mt-20 px-5 sm:px-8 lg:px-12 ${className}`}>
      <div className="mx-auto max-w-6xl">{children}</div>
    </section>
  );
}
