import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { navLinks, identity } from '../data/content';
import { useActiveSection } from '../hooks/useActiveSection';
import { EASE } from './Reveal';

export function Nav({ onContactClick }: { onContactClick: () => void }) {
  const active = useActiveSection();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);

  return (
    <>
      <motion.header
        initial={{ y: -32, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.2, ease: EASE }}
        className={`fixed inset-x-0 top-0 z-40 transition-all duration-500 ${
          scrolled ? 'border-b border-line bg-ink/80 backdrop-blur-xl' : 'bg-transparent'
        }`}
      >
        <nav
          aria-label="Primary"
          className="mx-auto flex h-16 max-w-6xl items-center justify-between px-5 sm:px-8 lg:px-12"
        >
          <a
            href="#top"
            className="font-display text-[15px] font-bold tracking-tight text-paper-hi"
          >
            bhavesh<span className="text-signal">.</span>
          </a>

          <div className="hidden items-center gap-7 md:flex">
            {navLinks.map((link) => (
              <a
                key={link.id}
                href={`#${link.id}`}
                aria-current={active === link.id ? 'true' : undefined}
                className={`font-mono text-[12px] tracking-wide transition-colors duration-300 ${
                  active === link.id ? 'text-paper-hi' : 'text-paper-mid hover:text-paper-hi'
                }`}
              >
                {link.label}
              </a>
            ))}
            <button
              onClick={onContactClick}
              className="group flex items-center gap-2 rounded-full border border-line bg-paper-hi/[0.04] px-4 py-2 font-mono text-[12px] text-paper-hi transition-all duration-300 hover:border-signal/50 hover:bg-signal-dim"
            >
              <span className="h-1.5 w-1.5 rounded-full bg-signal transition-transform duration-300 group-hover:scale-125" />
              Let's work together
            </button>
          </div>

          <button
            className="relative z-50 flex h-10 w-10 items-center justify-center md:hidden"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? 'Close menu' : 'Open menu'}
          >
            <span className="relative block h-3 w-5">
              <span
                className={`absolute left-0 top-0 h-px w-full bg-paper-hi transition-all duration-300 ${
                  open ? 'top-1/2 rotate-45' : ''
                }`}
              />
              <span
                className={`absolute bottom-0 left-0 h-px w-full bg-paper-hi transition-all duration-300 ${
                  open ? 'bottom-1/2 -rotate-45' : ''
                }`}
              />
            </span>
          </button>
        </nav>
      </motion.header>

      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-menu"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
            className="fixed inset-0 z-[45] flex flex-col justify-between bg-ink/95 px-6 pb-10 pt-24 backdrop-blur-2xl md:hidden"
          >
            <nav aria-label="Mobile" className="flex flex-col">
              {navLinks.map((link, i) => (
                <motion.a
                  key={link.id}
                  href={`#${link.id}`}
                  initial={{ opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 12 }}
                  transition={{ duration: 0.45, delay: 0.06 * i, ease: EASE }}
                  onClick={() => setOpen(false)}
                  className="group flex items-baseline justify-between border-b border-line py-4"
                >
                  <span className="font-display text-3xl font-semibold text-paper-hi">
                    {link.label}
                  </span>
                  <span className="font-mono text-[11px] text-paper-low">
                    0{i + 1}
                  </span>
                </motion.a>
              ))}
            </nav>
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4, ease: EASE }}
              className="flex flex-col gap-4"
            >
              <button
                onClick={() => {
                  setOpen(false);
                  onContactClick();
                }}
                className="flex items-center justify-center gap-2 rounded-full bg-paper-hi py-3.5 font-mono text-[13px] font-medium text-ink"
              >
                Let's work together
              </button>
              <p className="text-center font-mono text-[11px] text-paper-low">
                {identity.location}
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
