import { Mail, Phone, Linkedin, Github, ArrowUpRight } from 'lucide-react';
import { identity, faqs, navLinks } from '../data/content';
import { Reveal, Section, SectionLabel } from './Reveal';

const contactMethods = [
  { label: 'Email', value: identity.email, href: `mailto:${identity.email}`, icon: Mail },
  { label: 'Phone', value: identity.phone, href: `tel:${identity.phoneHref}`, icon: Phone },
  { label: 'LinkedIn', value: 'in/bhaveshops', href: identity.linkedin, icon: Linkedin, external: true },
  { label: 'GitHub', value: 'bhaveshopss', href: identity.github, icon: Github, external: true },
];

export function Contact() {
  return (
    <Section id="contact" className="pb-16 pt-24 sm:pt-32">
      <SectionLabel index="07" title="Contact" />

      <Reveal delay={1}>
        <h2 className="mt-10 max-w-4xl font-display text-[13vw] font-black leading-[0.9] tracking-[-0.03em] text-paper-hi sm:text-7xl md:text-8xl">
          Let's build what's
          <span className="text-signal"> next.</span>
        </h2>
      </Reveal>

      <Reveal delay={2}>
        <p className="mt-8 max-w-md text-[14px] leading-relaxed text-paper-mid">
          DevOps, AIOps, or technical founder-office work — if you're building something ambitious
          and need the systems side handled, start a conversation.
        </p>
      </Reveal>

      <div className="mt-12 grid gap-px overflow-hidden rounded-2xl border border-line bg-line sm:grid-cols-2">
        {contactMethods.map((method, i) => (
          <Reveal key={method.label} delay={Math.min(i, 3)} className="h-full">
            <a
              href={method.href}
              {...(method.external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
              className="group flex h-full items-center justify-between bg-ink p-6 transition-colors duration-500 hover:bg-ink-raised"
            >
              <div className="flex items-center gap-4">
                <span className="flex h-10 w-10 items-center justify-center rounded-full border border-line text-paper-mid transition-colors duration-300 group-hover:border-signal/40 group-hover:text-signal">
                  <method.icon className="h-4 w-4" strokeWidth={1.5} />
                </span>
                <div>
                  <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-paper-low">
                    {method.label}
                  </p>
                  <p className="mt-0.5 font-display text-[14px] font-medium text-paper-hi">
                    {method.value}
                  </p>
                </div>
              </div>
              <ArrowUpRight className="h-4 w-4 text-paper-low transition-all duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-signal" />
            </a>
          </Reveal>
        ))}
      </div>

      <div className="mt-16">
        <Reveal>
          <p className="font-mono text-[10.5px] uppercase tracking-[0.18em] text-paper-low">
            Frequently asked
          </p>
        </Reveal>
        <div className="mt-6 grid gap-x-10 md:grid-cols-2">
          {faqs.map((faq, i) => (
            <Reveal key={faq.q} delay={Math.min(i, 3)}>
              <div className="border-b border-line py-5">
                <h3 className="font-display text-[14.5px] font-semibold text-paper-hi">{faq.q}</h3>
                <p className="mt-2 text-[12.5px] leading-relaxed text-paper-mid">{faq.a}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </Section>
  );
}

export function Footer() {
  return (
    <footer className="px-5 pb-10 sm:px-8 lg:px-12">
      <div className="mx-auto flex max-w-6xl flex-col gap-6 border-t border-line pt-8 md:flex-row md:items-center md:justify-between">
        <a href="#top" className="font-display text-[15px] font-bold tracking-tight text-paper-hi">
          bhavesh<span className="text-signal">.</span>
        </a>

        <nav aria-label="Footer" className="flex flex-wrap items-center gap-x-6 gap-y-2">
          {navLinks.map((link) => (
            <a
              key={link.id}
              href={`#${link.id}`}
              className="font-mono text-[11px] text-paper-low transition-colors hover:text-paper-hi"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <p className="font-mono text-[10.5px] text-paper-low">
          © {new Date().getFullYear()} {identity.name} — {identity.location}
        </p>
      </div>
    </footer>
  );
}
