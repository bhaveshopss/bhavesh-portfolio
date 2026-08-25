import { ArrowUpRight } from 'lucide-react';
import { projects } from '../data/content';
import { Reveal, Section, SectionLabel } from './Reveal';

export function Work() {
  return (
    <Section id="work" className="py-24 sm:py-32">
      <SectionLabel index="02" title="Selected work" />

      <Reveal delay={1}>
        <h2 className="mt-8 max-w-2xl font-display text-4xl font-semibold leading-[1.02] tracking-tight text-paper-hi sm:text-5xl md:text-6xl">
          Systems that operate
          <span className="text-paper-low"> themselves.</span>
        </h2>
      </Reveal>

      <div className="mt-16 flex flex-col gap-6 sm:mt-20 sm:gap-8">
        {projects.map((project, i) => (
          <Reveal key={project.id} delay={Math.min(i, 1)}>
            <article className="group relative overflow-hidden rounded-2xl border border-line bg-ink-raised transition-colors duration-500 hover:border-signal/30">
              <div
                className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-700 group-hover:opacity-100"
                style={{
                  background:
                    'radial-gradient(ellipse 60% 80% at 85% 20%, rgba(255,176,32,0.055), transparent 65%)',
                }}
                aria-hidden
              />

              <div
                className={`grid gap-8 p-6 sm:p-10 lg:grid-cols-12 lg:gap-12 ${
                  i % 2 === 1 ? 'lg:[direction:rtl]' : ''
                }`}
              >
                <div className="lg:[direction:ltr] lg:col-span-7">
                  <div className="flex items-baseline gap-4">
                    <span className="font-mono text-[11px] text-signal">{project.index}</span>
                    <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-paper-low">
                      {project.tagline}
                    </p>
                  </div>

                  <h3 className="mt-4 font-display text-2xl font-semibold tracking-tight text-paper-hi sm:text-3xl">
                    {project.name}
                  </h3>

                  <div className="mt-8 space-y-6">
                    <div>
                      <p className="font-mono text-[10.5px] uppercase tracking-[0.18em] text-paper-low">
                        Problem
                      </p>
                      <p className="mt-2 max-w-xl text-[13.5px] leading-relaxed text-paper-mid">
                        {project.problem}
                      </p>
                    </div>
                    <div>
                      <p className="font-mono text-[10.5px] uppercase tracking-[0.18em] text-paper-low">
                        Contribution
                      </p>
                      <p className="mt-2 max-w-xl text-[13.5px] leading-relaxed text-paper-hi/85">
                        {project.contribution}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="flex flex-col justify-between gap-8 lg:[direction:ltr] lg:col-span-5">
                  <div className="grid grid-cols-3 gap-3">
                    {project.impact.map((metric) => (
                      <div
                        key={metric.label}
                        className="rounded-xl border border-line bg-ink p-3.5 transition-colors duration-500 group-hover:border-signal/25"
                      >
                        <p className="font-display text-xl font-bold tracking-tight text-paper-hi sm:text-2xl">
                          {metric.value}
                        </p>
                        <p className="mt-1 font-mono text-[9.5px] leading-snug text-paper-low">
                          {metric.label}
                        </p>
                      </div>
                    ))}
                  </div>

                  <div>
                    <div className="flex flex-wrap gap-1.5">
                      {project.stack.map((tech) => (
                        <span
                          key={tech}
                          className="rounded-full border border-line px-2.5 py-1 font-mono text-[10px] text-paper-mid"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>

                    {project.link && (
                      <a
                        href={project.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="mt-6 inline-flex items-center gap-1.5 font-mono text-[12px] text-paper-hi transition-colors hover:text-signal"
                      >
                        {project.linkLabel}
                        <ArrowUpRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                      </a>
                    )}
                  </div>
                </div>
              </div>
            </article>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
