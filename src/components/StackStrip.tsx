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
          {STACK.map((tool) => (
            <div
              key={tool}
              className="flex h-20 items-center justify-center bg-cream transition-colors duration-300 hover:bg-paper"
            >
              <span className="px-3 text-center font-mono text-[11.5px] uppercase tracking-[0.12em] text-ink-mid">
                {tool}
              </span>
            </div>
          ))}
        </div>
      </Reveal>
    </section>
  );
}
