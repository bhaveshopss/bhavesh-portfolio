import { Reveal } from './Reveal';

const ROW_ONE = [
  'AWS', 'Google Cloud', 'Azure', 'Kubernetes', 'Terraform',
  'ArgoCD', 'Docker', 'Helm', 'Jenkins',
];

const ROW_TWO = [
  'GitHub Actions', 'Prometheus', 'Grafana', 'Datadog', 'LangChain',
  'Anthropic MCP', 'Python', 'Go', 'TypeScript',
];

function Chip({ label }: { label: string }) {
  return (
    <span className="glass-chip mx-1.5 inline-flex shrink-0 items-center whitespace-nowrap rounded-full px-5 py-2.5 font-mono text-[11px] uppercase tracking-[0.14em] text-ink-soft transition-colors duration-300 hover:text-ink">
      {label}
    </span>
  );
}

function Row({ items, reverse = false }: { items: string[]; reverse?: boolean }) {
  return (
    <div className="flex w-max">
      {[0, 1].map((copy) => (
        <div
          key={copy}
          aria-hidden={copy === 1}
          className={`flex ${reverse ? 'animate-marquee-reverse' : 'animate-marquee'}`}
        >
          {items.map((tool) => (
            <Chip key={`${copy}-${tool}`} label={tool} />
          ))}
        </div>
      ))}
    </div>
  );
}

export function StackStrip() {
  return (
    <section aria-label="Core stack" className="marquee-hover relative overflow-hidden py-10">
      <Reveal>
        <div className="mx-auto max-w-6xl space-y-3 [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]">
          <Row items={ROW_ONE} />
          <Row items={ROW_TWO} reverse />
        </div>
      </Reveal>
    </section>
  );
}
