import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { roleCards, timeline, faqs } from '../data/content';
import { PixelSprite } from './PixelArt';
import { Reveal, EASE } from './Reveal';

type Tab = 'roles' | 'journey' | 'faq';

const TABS: { id: Tab; label: string; dot: string }[] = [
  { id: 'roles', label: 'Roles', dot: '#8B5CF6' },
  { id: 'journey', label: 'How I work', dot: '#2B4BF2' },
  { id: 'faq', label: 'FAQs', dot: '#E879B9' },
];

function RolesGrid({ onHireClick }: { onHireClick: () => void }) {
  const [activeId, setActiveId] = useState<string | null>(null);
  const active = roleCards.find((r) => r.id === activeId);

  return (
    <div className="relative">
      <div className="grid grid-cols-2 gap-px overflow-hidden rounded-xl bg-ink/10 sm:grid-cols-3 lg:grid-cols-6">
        {roleCards.map((role) => (
          <button
            key={role.id}
            onClick={() => setActiveId(role.id === activeId ? null : role.id)}
            onMouseEnter={() => setActiveId(role.id)}
            onFocus={() => setActiveId(role.id)}
            aria-expanded={activeId === role.id}
            className={`flex min-h-[150px] cursor-pointer flex-col items-center justify-center gap-3 p-4 transition-colors duration-300 ${
              activeId === role.id ? 'bg-white' : 'bg-cream hover:bg-paper'
            }`}
          >
            <div className={`transition-transform duration-300 ${activeId === role.id ? 'scale-110' : ''}`}>
              <PixelSprite seed={role.seed} palette={role.palette} size={64} />
            </div>
            <span className="text-center font-mono text-[11px] leading-tight text-ink-soft">
              {role.title}
            </span>
          </button>
        ))}
      </div>

      <AnimatePresence mode="wait">
        {active && (
          <motion.div
            key={active.id}
            initial={window.matchMedia('(prefers-reduced-motion: reduce)').matches ? { opacity: 0 } : { opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 8 }}
            transition={{ duration: 0.35, ease: EASE }}
            className="mt-6 rounded-2xl border border-ink/10 bg-paper/90 p-6 shadow-[0_4px_30px_rgba(19,19,17,0.08)] backdrop-blur-md sm:p-8"
          >
            <h3 className="font-display text-3xl font-semibold tracking-tight text-ink sm:text-4xl lg:text-5xl">
              {active.title}
            </h3>
            <div className="mt-6 grid gap-6 md:grid-cols-3">
              {[
                { label: 'Strengths', body: active.strengths },
                { label: 'Best used', body: active.bestUsed },
                { label: 'Output', body: active.output },
              ].map((block) => (
                <div key={block.label}>
                  <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-ink-low">
                    {block.label}
                  </p>
                  <p className="mt-2 text-[13px] leading-relaxed text-ink-soft">{block.body}</p>
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="mt-10 flex justify-center">
        <button
          onClick={onHireClick}
          className="rounded-full bg-ink px-7 py-3 font-mono text-[13.5px] text-cream transition-all duration-200 hover:scale-[1.03] hover:bg-signal active:scale-[0.98]"
        >
          Hire Me
        </button>
      </div>
    </div>
  );
}

function JourneyColumns() {
  return (
    <div className="grid gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
      {timeline.map((stage, i) => (
        <Reveal key={stage.id} delay={i}>
          <div className="relative border-l-2 border-ink/15 pl-6">
            <span className="absolute -left-[2px] top-0 h-10 w-[2px] bg-signal" aria-hidden />
            <span className="inline-block rounded-full border border-ink/15 bg-white px-3 py-1 font-mono text-[11px] tracking-wide text-ink">
              {stage.period}
            </span>
            <h3 className="mt-4 font-display text-lg font-semibold leading-snug tracking-tight text-ink">
              {stage.role}
            </h3>
            <p className="mt-3 text-[13px] leading-relaxed text-ink-mid">{stage.description}</p>
            <ul className="mt-4 space-y-2">
              {stage.points.slice(0, 3).map((point) => (
                <li key={point} className="flex items-start gap-2.5 text-[12.5px] leading-relaxed text-ink-soft">
                  <span className="mt-[7px] h-1 w-1 shrink-0 rounded-full bg-signal" aria-hidden />
                  {point}
                </li>
              ))}
            </ul>
          </div>
        </Reveal>
      ))}
    </div>
  );
}

function FaqList() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  return (
    <div className="max-w-2xl">
      {faqs.map((faq, i) => (
        <div key={faq.q} className="border-b border-ink/10">
          <button
            onClick={() => setOpenIndex(openIndex === i ? null : i)}
            aria-expanded={openIndex === i}
            className="flex w-full items-center justify-between gap-4 py-4 text-left"
          >
            <span className="font-display text-[15px] font-semibold text-ink">{faq.q}</span>
            <span className="font-mono text-[16px] text-ink-low">{openIndex === i ? '−' : '+'}</span>
          </button>
          <AnimatePresence initial={false}>
            {openIndex === i && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.3, ease: EASE }}
                className="overflow-hidden"
              >
                <p className="pb-5 text-[13.5px] leading-relaxed text-ink-mid">{faq.a}</p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      ))}
    </div>
  );
}

export function AboutMe({ onHireClick }: { onHireClick: () => void }) {
  const [tab, setTab] = useState<Tab>('roles');

  useEffect(() => {
    const onSetTab = (e: Event) => {
      const detail = (e as CustomEvent<string>).detail;
      if (detail === 'roles' || detail === 'journey' || detail === 'faq') setTab(detail);
    };
    window.addEventListener('bhavesh:set-tab', onSetTab);
    return () => window.removeEventListener('bhavesh:set-tab', onSetTab);
  }, []);

  return (
    <section id="about" className="scroll-mt-20 px-4 py-16 sm:px-6 sm:py-24 lg:px-8">
      <Reveal>
        <div className="mx-auto max-w-6xl rounded-[1.75rem] border border-ink/10 bg-paper shadow-[0_2px_40px_rgba(19,19,17,0.05)]">
          <div className="grid lg:grid-cols-[220px_1fr]">
            <div className="border-b border-ink/10 p-7 sm:p-9 lg:border-b-0 lg:border-r">
              <p className="font-display text-xl font-semibold tracking-tight text-ink">About me</p>
              <div
                role="tablist"
                aria-label="About sections"
                className="mt-10 flex flex-row flex-wrap gap-2 lg:mt-40 lg:flex-col lg:items-start"
              >
                {TABS.map((t) => (
                  <button
                    key={t.id}
                    role="tab"
                    aria-selected={tab === t.id}
                    onClick={() => setTab(t.id)}
                    className={`flex items-center gap-2.5 rounded-full px-5 py-2.5 text-[14.5px] transition-all duration-300 ${
                      tab === t.id
                        ? 'bg-white font-medium text-ink shadow-[0_2px_12px_rgba(19,19,17,0.08)]'
                        : 'text-ink-mid hover:bg-white/60 hover:text-ink'
                    }`}
                  >
                    <span className="h-2 w-2 rounded-full" style={{ backgroundColor: t.dot }} aria-hidden />
                    {t.label}
                  </button>
                ))}
              </div>
            </div>

            <div className="p-7 sm:p-9 lg:p-12" role="tabpanel">
              {tab === 'roles' && (
                <>
                  <div className="mb-10 flex items-start gap-3">
                    <span className="mt-1 h-6 w-[3px] rounded bg-ink" aria-hidden />
                    <h2 className="font-display text-lg font-medium tracking-tight text-ink sm:text-xl">
                      I play different roles across everything I build
                    </h2>
                  </div>
                  <RolesGrid onHireClick={onHireClick} />
                </>
              )}
              {tab === 'journey' && (
                <>
                  <div className="mb-10 flex items-start gap-3">
                    <span className="mt-1 h-6 w-[3px] rounded bg-ink" aria-hidden />
                    <h2 className="font-display text-lg font-medium tracking-tight text-ink sm:text-xl">
                      From keeping infrastructure alive to deciding what gets built
                    </h2>
                  </div>
                  <JourneyColumns />
                  <div className="mt-10 flex justify-center">
                    <button
                      onClick={onHireClick}
                      className="rounded-full bg-ink px-7 py-3 font-mono text-[13.5px] text-cream transition-all duration-200 hover:scale-[1.03] hover:bg-signal active:scale-[0.98]"
                    >
                      Hire Me
                    </button>
                  </div>
                </>
              )}
              {tab === 'faq' && (
                <>
                  <div className="mb-8 flex items-start gap-3">
                    <span className="mt-1 h-6 w-[3px] rounded bg-ink" aria-hidden />
                    <h2 className="font-display text-lg font-medium tracking-tight text-ink sm:text-xl">
                      Questions people actually ask
                    </h2>
                  </div>
                  <FaqList />
                  <div className="mt-10 flex justify-center">
                    <button
                      onClick={onHireClick}
                      className="rounded-full bg-ink px-7 py-3 font-mono text-[13.5px] text-cream transition-all duration-200 hover:scale-[1.03] hover:bg-signal active:scale-[0.98]"
                    >
                      Hire Me
                    </button>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
