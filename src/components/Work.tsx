import { ArrowUpRight } from 'lucide-react';
import { projects } from '../data/content';
import { Reveal, SectionLabel } from './Reveal';

export function Work() {
  return (
    <section id="work" className="scroll-mt-20 px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
      <div className="mx-auto max-w-6xl">
        <SectionLabel index="01" title="Selected work" />

        <Reveal delay={1}>
          <h2 className="mt-8 max-w-2xl font-display text-4xl font-semibold leading-[1.02] tracking-tight text-ink sm:text-5xl">
            Systems that operate themselves.
          </h2>
        </Reveal>

        <div className="mt-12 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {projects.map((project, i) => (
            <Reveal key={project.id} delay={Math.min(i, 2)} className="h-full">
              <article
                className={`group relative flex h-full flex-col overflow-hidden rounded-2xl p-7 transition-transform duration-500 hover:-translate-y-1 sm:p-8 ${
                  i === 1
                    ? 'bg-signal text-cream'
                    : i === 2
                      ? 'bg-blush text-ink blush-texture'
                      : 'border border-ink/10 bg-paper text-ink'
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
                      <p className="font-display text-xl font-bold tracking-tight">{metric.value}</p>
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
                    <ArrowUpRight className="h-3.5 w-3.5" />
                  </a>
                )}
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
