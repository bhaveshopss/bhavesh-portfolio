import { ArrowUpRight } from 'lucide-react';
import { posts } from '../data/content';
import { Reveal, Section, SectionLabel } from './Reveal';

export function Blog() {
  return (
    <Section id="blog" className="py-16 sm:py-24">
      <div className="flex flex-wrap items-end justify-between gap-6">
        <div>
          <SectionLabel index="04" title="Writing" />
          <Reveal delay={1}>
            <h2 className="mt-8 max-w-xl font-display text-4xl font-semibold leading-[1.02] tracking-tight text-ink sm:text-5xl">
              Field notes from{' '}
              <span className="bg-gradient-to-r from-signal to-blush bg-clip-text text-transparent">
                production.
              </span>
            </h2>
          </Reveal>
        </div>
        <Reveal delay={2}>
          <p className="max-w-xs font-mono text-[11px] leading-relaxed text-ink-mid">
            Full articles open on their own pages, written from real systems.
          </p>
        </Reveal>
      </div>

      <div className="mt-12 grid gap-4 md:grid-cols-3">
        {posts.map((post, i) => (
          <Reveal key={post.href} delay={Math.min(i, 2)} className="h-full">
            <a
              href={post.href}
              className="card-glow glass group flex h-full flex-col rounded-3xl p-6 sm:p-7"
            >
              <div className="flex items-center justify-between gap-3">
                <span className="glass-chip rounded-full px-3 py-1 font-mono text-[10px] text-ink-soft">
                  {post.date}
                </span>
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-ink/10 text-ink-mid transition-all duration-300 group-hover:border-signal group-hover:bg-signal group-hover:text-white">
                  <ArrowUpRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-px group-hover:-translate-y-px" />
                </span>
              </div>
              <h3 className="mt-5 font-display text-xl font-semibold leading-snug tracking-tight text-ink transition-colors duration-300 group-hover:text-signal">
                {post.title}
              </h3>
              <p className="mt-3 flex-1 text-[13px] leading-relaxed text-ink-mid">
                {post.excerpt}
              </p>
              <div className="mt-5 flex items-center justify-between border-t border-ink/10 pt-4">
                <span className="font-mono text-[10.5px] text-signal/80">
                  {post.tags.join(' · ')}
                </span>
                <span className="font-mono text-[10px] text-ink-low">{post.readTime}</span>
              </div>
            </a>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
