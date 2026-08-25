import { ArrowUpRight } from 'lucide-react';
import { posts } from '../data/content';
import { Reveal, Section, SectionLabel } from './Reveal';

export function Blog() {
  return (
    <Section id="blog" className="py-24 sm:py-32">
      <div className="flex flex-wrap items-end justify-between gap-6">
        <div>
          <SectionLabel index="06" title="Writing" />
          <Reveal delay={1}>
            <h2 className="mt-8 font-display text-4xl font-semibold leading-[1.02] tracking-tight text-paper-hi sm:text-5xl">
              Field notes from
              <span className="text-paper-low"> production.</span>
            </h2>
          </Reveal>
        </div>
        <Reveal delay={2}>
          <p className="max-w-xs font-mono text-[11px] leading-relaxed text-paper-low">
            Full articles open in-place — same system, separate pages.
          </p>
        </Reveal>
      </div>

      <div className="mt-14">
        {posts.map((post, i) => (
          <Reveal key={post.href} delay={Math.min(i, 2)}>
            <a
              href={post.href}
              className="group flex items-start justify-between gap-6 border-b border-line py-7 transition-colors duration-300 first:border-t hover:border-signal/30"
            >
              <div>
                <div className="flex items-center gap-4">
                  <span className="font-mono text-[10.5px] text-paper-low">{post.date}</span>
                  <span className="font-mono text-[10.5px] text-signal/70">
                    {post.tags.join(' · ')}
                  </span>
                </div>
                <h3 className="mt-3 font-display text-xl font-semibold tracking-tight text-paper-hi transition-colors duration-300 group-hover:text-signal sm:text-2xl">
                  {post.title}
                </h3>
                <p className="mt-2 max-w-xl text-[13px] leading-relaxed text-paper-mid">
                  {post.excerpt}
                </p>
              </div>
              <div className="flex shrink-0 flex-col items-end gap-2 pt-1">
                <ArrowUpRight className="h-4 w-4 text-paper-low transition-all duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-signal" />
                <span className="font-mono text-[10px] text-paper-low">{post.readTime}</span>
              </div>
            </a>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
