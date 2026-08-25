import { useEffect, useState } from 'react';
import { sections } from '../data/content';

export function useActiveSection() {
  const [active, setActive] = useState<string>('');

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      const onScroll = () => {
        const mid = window.scrollY + window.innerHeight / 3;
        let current = '';
        for (const s of sections) {
          const el = document.getElementById(s.id);
          if (el && el.offsetTop <= mid) current = s.id;
        }
        setActive(current);
      };
      window.addEventListener('scroll', onScroll, { passive: true });
      onScroll();
      return () => window.removeEventListener('scroll', onScroll);
    }

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActive(entry.target.id);
        }
      },
      { rootMargin: '-30% 0px -55% 0px' }
    );

    for (const s of sections) {
      const el = document.getElementById(s.id);
      if (el) observer.observe(el);
    }
    return () => observer.disconnect();
  }, []);

  return active;
}
