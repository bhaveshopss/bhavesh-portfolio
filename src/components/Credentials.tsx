import { Award, Trophy } from 'lucide-react';
import { credentials } from '../data/content';
import { Reveal, Section, SectionLabel } from './Reveal';

export function Credentials() {
  const featured = credentials.filter((c) => c.kind === 'award' || c.name === 'Claude Architect');
  const rest = credentials.filter((c) => !featured.includes(c));

  return (
    <Section id="credentials" className="py-16 sm:py-24">
      <SectionLabel index="02" title="Credentials & recognition" />

      <div className="mt-10 grid gap-4 md:grid-cols-2">
        {featured.map((cred, i) => (
          <Reveal key={cred.name} delay={i}>
            <div
              className={`flex h-full items-start justify-between gap-6 rounded-2xl p-7 sm:p-8 ${
                cred.kind === 'award' ? 'bg-signal text-cream' : 'border border-ink/10 bg-paper'
              }`}
            >
              <div>
                <div className="flex items-center gap-3">
                  {cred.kind === 'award' ? (
                    <Trophy className="h-5 w-5" strokeWidth={1.5} />
                  ) : (
                    <Award className="h-5 w-5 text-ink-mid" strokeWidth={1.5} />
                  )}
                  <span
                    className={`font-mono text-[11px] uppercase tracking-[0.14em] ${
                      cred.kind === 'award' ? 'opacity-70' : 'text-ink-low'
                    }`}
                  >
                    {cred.issuer}
                  </span>
                </div>
                <h3 className="mt-4 font-display text-2xl font-semibold tracking-tight">
                  {cred.name}
                </h3>
                <p
                  className={`mt-2 font-mono text-[11px] ${
                    cred.kind === 'award' ? 'opacity-70' : 'text-ink-low'
                  }`}
                >
                  {cred.date}
                </p>
              </div>
              <span
                className={`font-mono text-[10px] uppercase tracking-[0.14em] ${
                  cred.kind === 'award' ? 'opacity-60' : 'text-ink-low'
                }`}
              >
                {cred.kind === 'award' ? '1st place' : 'verified'}
              </span>
            </div>
          </Reveal>
        ))}
      </div>

      <div className="mt-4">
        {rest.map((cred, i) => (
          <Reveal key={cred.name} delay={Math.min(i, 2)}>
            <div className="flex items-baseline justify-between gap-4 border-b border-ink/10 py-4">
              <div className="flex items-baseline gap-4">
                <span className="font-mono text-[10.5px] text-signal">
                  {String(credentials.indexOf(cred) + 1).padStart(2, '0')}
                </span>
                <h3 className="font-display text-[15px] font-medium text-ink">{cred.name}</h3>
              </div>
              <div className="flex shrink-0 items-baseline gap-5">
                <span className="hidden font-mono text-[11px] text-ink-low sm:inline">
                  {cred.issuer}
                </span>
                <span className="font-mono text-[11px] text-ink-mid">{cred.date}</span>
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
