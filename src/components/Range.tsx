import { skillGroups } from '../data/content';
import { Reveal, Section, SectionLabel } from './Reveal';

export function Range() {
  return (
    <Section id="range" className="py-24 sm:py-32">
      <SectionLabel index="04" title="Technical range" />

      <Reveal delay={1}>
        <h2 className="mt-8 max-w-2xl font-display text-4xl font-semibold leading-[1.02] tracking-tight text-paper-hi sm:text-5xl md:text-6xl">
          One engineer,
          <span className="text-paper-low"> four altitudes.</span>
        </h2>
      </Reveal>

      <div className="mt-14 grid gap-px overflow-hidden rounded-2xl border border-line bg-line sm:mt-16 md:grid-cols-2 lg:grid-cols-4">
        {skillGroups.map((group, i) => (
          <Reveal key={group.id} delay={Math.min(i, 3)} className="h-full">
            <div className="group flex h-full flex-col bg-ink p-6 transition-colors duration-500 hover:bg-ink-raised sm:p-7">
              <div className="flex items-center justify-between">
                <span className="font-mono text-[10.5px] text-signal">0{i + 1}</span>
                <span className="h-1 w-1 rounded-full bg-paper-low transition-colors duration-500 group-hover:bg-signal" />
              </div>
              <h3 className="mt-8 font-display text-lg font-semibold leading-snug tracking-tight text-paper-hi">
                {group.title}
              </h3>
              <p className="mt-1 font-mono text-[10.5px] text-paper-low">{group.caption}</p>
              <div className="mt-6 flex flex-wrap gap-1.5">
                {group.skills.map((skill) => (
                  <span
                    key={skill}
                    className="rounded-md border border-line px-2 py-1 font-mono text-[10px] text-paper-mid transition-colors duration-300 group-hover:border-signal/20 group-hover:text-paper-hi/85"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </Reveal>
        ))}
      </div>

      <Reveal delay={1}>
        <div className="mt-10 flex flex-col gap-3 border-t border-line pt-8 sm:flex-row sm:items-center sm:justify-between">
          <p className="font-mono text-[11px] text-paper-low">
            Education — {`B.Tech, Computer Science · JIET Jodhpur · Aug 2020 – May 2024 · GPA 8.8/10`}
          </p>
          <p className="font-mono text-[11px] text-paper-low">
            President, Student Council · Secretary, CSE Department
          </p>
        </div>
      </Reveal>
    </Section>
  );
}
