import { identity, aboutParagraphs } from '../data/content';
import { Reveal, Section, SectionLabel } from './Reveal';

export function About() {
  return (
    <Section id="about" className="py-24 sm:py-32">
      <div className="grid gap-12 lg:grid-cols-12">
        <div className="lg:col-span-4">
          <SectionLabel index="05" title="Working style" />
          <Reveal delay={1}>
            <h2 className="mt-8 font-display text-4xl font-semibold leading-[1.02] tracking-tight text-paper-hi sm:text-5xl">
              Find the constraint.
              <br />
              <span className="text-paper-low">Build the system.</span>
            </h2>
          </Reveal>
          <Reveal delay={2}>
            <div className="mt-10 flex items-center gap-4">
              <img
                src="/bhavesh-profile-optimized.jpg"
                alt={`Portrait of ${identity.name}`}
                loading="lazy"
                className="h-14 w-14 rounded-full object-cover grayscale"
              />
              <div>
                <p className="font-display text-[14px] font-semibold text-paper-hi">
                  {identity.name}
                </p>
                <p className="font-mono text-[10.5px] text-paper-low">
                  {identity.role} · {identity.company}
                </p>
              </div>
            </div>
          </Reveal>
        </div>

        <div className="lg:col-span-7 lg:col-start-6">
          {aboutParagraphs.map((paragraph, i) => (
            <Reveal key={i} delay={i}>
              <p
                className={`text-balance ${
                  i === 0
                    ? 'font-display text-2xl font-medium leading-snug tracking-tight text-paper-hi sm:text-[28px]'
                    : 'mt-8 text-[14.5px] leading-relaxed text-paper-mid'
                }`}
              >
                {paragraph}
              </p>
            </Reveal>
          ))}

          <Reveal delay={2}>
            <div className="mt-12 grid grid-cols-2 gap-px overflow-hidden rounded-xl border border-line bg-line sm:grid-cols-4">
              {[
                { v: '99.9%', l: 'uptime held' },
                { v: '−20%', l: 'cloud spend' },
                { v: '200+', l: 'resources as code' },
                { v: '1,000+', l: 'daily AI requests' },
              ].map((stat) => (
                <div key={stat.l} className="bg-ink p-4 text-center">
                  <p className="font-display text-xl font-bold tracking-tight text-paper-hi sm:text-2xl">
                    {stat.v}
                  </p>
                  <p className="mt-1 font-mono text-[9.5px] text-paper-low">{stat.l}</p>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </div>
    </Section>
  );
}
