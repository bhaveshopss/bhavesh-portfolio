import { Award, Trophy } from 'lucide-react';
import { credentials } from '../data/content';
import { Reveal, Section, SectionLabel } from './Reveal';

export function Credentials() {
  const featured = credentials.filter((c) => c.kind === 'award' || c.name === 'Claude Architect');
  const rest = credentials.filter((c) => !featured.includes(c));

  return (
    <Section id="credentials" className="py-24 sm:py-32">
      <SectionLabel index="03" title="Credentials & recognition" />

      <Reveal delay={1}>
        <h2 className="mt-8 max-w-2xl font-display text-4xl font-semibold leading-[1.02] tracking-tight text-paper-hi sm:text-5xl md:text-6xl">
          Verified, not
          <span className="text-paper-low"> decorated.</span>
        </h2>
      </Reveal>

      <div className="mt-14 grid gap-4 sm:mt-16 md:grid-cols-2">
        {featured.map((cred, i) => (
          <Reveal key={cred.name} delay={i}>
            <div
              className={`group relative overflow-hidden rounded-2xl border p-8 transition-colors duration-500 sm:p-10 ${
                cred.kind === 'award'
                  ? 'border-signal/30 bg-signal-dim'
                  : 'border-line bg-ink-raised hover:border-signal/25'
              }`}
            >
              <div className="flex items-start justify-between">
                <span
                  className={`flex h-11 w-11 items-center justify-center rounded-full border ${
                    cred.kind === 'award'
                      ? 'border-signal/40 bg-signal/15 text-signal'
                      : 'border-line text-paper-mid'
                  }`}
                >
                  {cred.kind === 'award' ? (
                    <Trophy className="h-5 w-5" strokeWidth={1.5} />
                  ) : (
                    <Award className="h-5 w-5" strokeWidth={1.5} />
                  )}
                </span>
                <span className="font-mono text-[11px] text-paper-low">{cred.date}</span>
              </div>

              <h3 className="mt-8 font-display text-2xl font-semibold tracking-tight text-paper-hi sm:text-3xl">
                {cred.name}
              </h3>
              <p className="mt-2 font-mono text-[11.5px] uppercase tracking-[0.16em] text-paper-mid">
                {cred.issuer}
              </p>

              {cred.kind === 'award' && (
                <p className="mt-5 max-w-sm text-[13px] leading-relaxed text-paper-mid">
                  First place at Ignition — Shellkode's internal hackathon — competing across the
                  whole company.
                </p>
              )}
            </div>
          </Reveal>
        ))}
      </div>

      <div className="mt-4">
        {rest.map((cred, i) => (
          <Reveal key={cred.name} delay={Math.min(i, 2)}>
            <div className="flex items-baseline justify-between gap-4 border-b border-line py-4 transition-colors duration-300 hover:border-signal/25">
              <div className="flex items-baseline gap-4">
                <span className="font-mono text-[10.5px] text-signal/70">
                  0{credentials.indexOf(cred) + 1}
                </span>
                <h3 className="font-display text-[15px] font-medium text-paper-hi">{cred.name}</h3>
              </div>
              <div className="flex shrink-0 items-baseline gap-5">
                <span className="hidden font-mono text-[11px] text-paper-low sm:inline">
                  {cred.issuer}
                </span>
                <span className="font-mono text-[11px] text-paper-mid">{cred.date}</span>
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
