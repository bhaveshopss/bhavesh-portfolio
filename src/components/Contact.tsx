import { useEffect, useRef } from 'react';
import { Mail, Phone, ArrowRight, ArrowUpRight } from 'lucide-react';
import { identity, navLinks, posts } from '../data/content';
import { Reveal, Section, SectionLabel } from './Reveal';

export function Contact() {
  return (
    <Section id="contact" className="pb-8 pt-16 sm:pt-24">
      <SectionLabel index="05" title="Contact" />
      <Reveal delay={1}>
        <h2 className="mt-10 max-w-3xl font-display text-5xl font-semibold leading-[1.0] tracking-tight text-ink sm:text-6xl md:text-7xl">
          Let's build what's next.
        </h2>
      </Reveal>
      <Reveal delay={2}>
        <p className="mt-6 max-w-md text-[14px] leading-relaxed text-ink-mid">
          DevOps, AIOps, or technical founder-office work — if you're building something ambitious
          and need the systems side handled, start a conversation.
        </p>
      </Reveal>

      <div className="mt-10 flex flex-wrap gap-2.5">
        {[
          { label: `Email — ${identity.email}`, href: `mailto:${identity.email}` },
          { label: `Phone — ${identity.phone}`, href: `tel:${identity.phoneHref}` },
          { label: 'LinkedIn', href: identity.linkedin, external: true },
          { label: 'GitHub', href: identity.github, external: true },
        ].map((method) => (
          <a
            key={method.label}
            href={method.href}
            {...(method.external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
            className="group flex items-center gap-2 rounded-full border border-ink/15 bg-paper px-5 py-2.5 font-mono text-[12.5px] text-ink transition-all duration-200 hover:scale-[1.02] hover:border-ink/35"
          >
            {method.label}
            <ArrowUpRight className="h-3.5 w-3.5 text-ink-mid transition-colors group-hover:text-signal" />
          </a>
        ))}
      </div>
    </Section>
  );
}

export function Blog() {
  return (
    <Section id="blog" className="pb-8 pt-16">
      <SectionLabel index="04" title="Writing" />
      <div className="mt-8">
        {posts.map((post, i) => (
          <Reveal key={post.href} delay={Math.min(i, 2)}>
            <a
              href={post.href}
              className="group flex items-start justify-between gap-6 border-b border-ink/10 py-6 first:border-t"
            >
              <div>
                <div className="flex items-center gap-4">
                  <span className="font-mono text-[10.5px] text-ink-low">{post.date}</span>
                  <span className="font-mono text-[10.5px] text-signal">
                    {post.tags.join(' · ')}
                  </span>
                </div>
                <h3 className="mt-2.5 font-display text-xl font-semibold tracking-tight text-ink transition-colors group-hover:text-signal sm:text-2xl">
                  {post.title}
                </h3>
                <p className="mt-1.5 max-w-xl text-[13px] leading-relaxed text-ink-mid">
                  {post.excerpt}
                </p>
              </div>
              <ArrowUpRight className="mt-2 h-4 w-4 shrink-0 text-ink-low transition-all duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-signal" />
            </a>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}

const GLYPHS: Record<string, string[]> = {
  b: ['10000', '10000', '11110', '10001', '10001', '10001', '11110'],
  h: ['10001', '10001', '11110', '10001', '10001', '10001', '10001'],
  a: ['01110', '00001', '01111', '10001', '10001', '10011', '01101'],
  v: ['10001', '10001', '10001', '10001', '10001', '01010', '00100'],
  e: ['01110', '10001', '11111', '10000', '01110', '00001', '01110'],
  s: ['01111', '10000', '10000', '01110', '00001', '00001', '11110'],
  '.': ['00000', '00000', '00000', '00000', '00000', '00100', '00100'],
};

const DOT_COLORS = ['#EFEFEA', '#9DB8FA', '#E8C46A', '#E879B9', '#7EE0D2'];

function DottedWordmark() {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const word = 'bhavesh.';
    const dot = 5;
    const gap = 2;
    const glyphW = 5;
    const letterGap = 2;
    const totalUnits = word.length * (glyphW + letterGap);
    const width = totalUnits * (dot + gap);
    const height = 7 * (dot + gap);
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    canvas.width = width * dpr;
    canvas.height = height * dpr;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    ctx.clearRect(0, 0, width, height);

    let unit = 0;
    let dotIndex = 0;
    for (const ch of word) {
      const glyph = GLYPHS[ch];
      if (!glyph) {
        unit += glyphW + letterGap;
        continue;
      }
      for (let y = 0; y < 7; y++) {
        for (let x = 0; x < glyphW; x++) {
          if (glyph[y][x] !== '1') continue;
          ctx.fillStyle = DOT_COLORS[dotIndex % DOT_COLORS.length];
          dotIndex++;
          ctx.beginPath();
          ctx.arc(
            unit * (dot + gap) + x * (dot + gap) + dot / 2,
            y * (dot + gap) + dot / 2,
            dot / 2,
            0,
            Math.PI * 2
          );
          ctx.fill();
        }
      }
      unit += glyphW + letterGap;
    }
  }, []);

  return <canvas ref={ref} aria-hidden className="w-full max-w-2xl" style={{ height: 'auto', imageRendering: 'auto' }} />;
}

export function Footer({ onContactClick }: { onContactClick: () => void }) {
  return (
    <footer className="px-4 pb-6 pt-12 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl rounded-[1.75rem] bg-signal p-8 text-cream sm:p-12">
        <div className="grid gap-10 md:grid-cols-2">
          <div>
            <p className="font-mono text-[13px] uppercase tracking-[0.18em]">
              • Reliability is leverage
            </p>
            <p className="mt-4 max-w-xs text-[14px] leading-relaxed opacity-90">
              Hand the systems work to someone who treats uptime, AI operations, and product
              momentum as one job.
            </p>
            <button
              onClick={onContactClick}
              className="group mt-6 inline-flex items-center gap-2 border-b border-cream/60 pb-1 font-mono text-[13px] uppercase tracking-[0.14em] transition-colors hover:border-cream"
            >
              Start a conversation
              <ArrowRight className="h-4 w-4" />
            </button>
          </div>

          <div className="grid grid-cols-2 gap-8 sm:grid-cols-3">
            <div>
              <p className="font-mono text-[12px] uppercase tracking-[0.16em] opacity-80">• Site</p>
              <ul className="mt-4 space-y-2.5">
                {navLinks.slice(0, 4).map((link) => (
                  <li key={link.id}>
                    <a
                      href={`#${link.id}`}
                      className="group flex items-center gap-2 text-[13.5px] opacity-90 transition-opacity hover:opacity-100"
                    >
                      {link.label}
                      <ArrowRight className="h-3 w-3 transition-transform duration-300 group-hover:translate-x-1" />
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <p className="font-mono text-[12px] uppercase tracking-[0.16em] opacity-80">• Elsewhere</p>
              <ul className="mt-4 space-y-2.5">
                {[
                  { label: 'LinkedIn', href: identity.linkedin },
                  { label: 'GitHub', href: identity.github },
                  { label: 'Email', href: `mailto:${identity.email}` },
                ].map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      target={link.href.startsWith('http') ? '_blank' : undefined}
                      rel="noopener noreferrer"
                      className="group flex items-center gap-2 text-[13.5px] opacity-90 transition-opacity hover:opacity-100"
                    >
                      {link.label}
                      <ArrowUpRight className="h-3 w-3 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <p className="font-mono text-[12px] uppercase tracking-[0.16em] opacity-80">• Direct</p>
              <ul className="mt-4 space-y-2.5 text-[13.5px] opacity-90">
                <li className="flex items-start gap-2">
                  <Mail className="mt-0.5 h-3.5 w-3.5 shrink-0" strokeWidth={1.5} />
                  <a href={`mailto:${identity.email}`} className="break-all hover:underline">
                    {identity.email}
                  </a>
                </li>
                <li className="flex items-start gap-2">
                  <Phone className="mt-0.5 h-3.5 w-3.5 shrink-0" strokeWidth={1.5} />
                  {identity.phone}
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="mt-12">
          <DottedWordmark />
        </div>

        <div className="mt-8 flex flex-col items-start justify-between gap-3 border-t border-cream/25 pt-6 sm:flex-row sm:items-center">
          <p className="font-mono text-[10.5px] uppercase tracking-[0.14em] opacity-70">
            © {new Date().getFullYear()} {identity.name} — {identity.location}
          </p>
          <p className="font-mono text-[10.5px] uppercase tracking-[0.14em] opacity-70">
            DevOps → AIOps → Founder's Office
          </p>
        </div>
      </div>
    </footer>
  );
}
