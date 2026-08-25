import { Reveal } from './Reveal';

const STACK = [
  'AWS', 'Google Cloud', 'Azure', 'Kubernetes', 'Terraform', 'ArgoCD',
  'Docker', 'Helm', 'Jenkins', 'GitHub Actions', 'Prometheus', 'Grafana',
  'Datadog', 'LangChain', 'Anthropic MCP', 'Python', 'Go', 'TypeScript',
];

export function StackStrip() {
  return (
    <section aria-label="Core stack" className="px-4 py-6 sm:px-6 lg:px-8">
      <Reveal>
        <div className="mx-auto grid max-w-6xl grid-cols-2 gap-px overflow-hidden rounded-2xl border border-ink/10 bg-ink/10 sm:grid-cols-3 lg:grid-cols-6">
          {STACK.map((tool, i) => (
            <div
              key={tool}
              className="flex h-20 items-center justify-center bg-cream transition-colors duration-300 hover:bg-paper"
            >
              <span
                className={`px-3 text-center text-ink-mid ${
                  i % 3 === 0
                    ? 'font-display text-[15px] font-bold tracking-tight'
                    : i % 3 === 1
                      ? 'font-mono text-[12px] uppercase tracking-[0.12em]'
                      : 'font-display text-[15px] font-semibold italic'
                }`}
              >
                {tool}
              </span>
            </div>
          ))}
        </div>
      </Reveal>
    </section>
  );
}
