import { useEffect } from 'react';

// Extend window interface to include Vercel Analytics function
declare global {
  interface Window {
    va?: (event: 'beforeSend' | 'event' | 'pageview', properties?: any) => void;
  }
}

export const useSectionTracking = (sectionIds: string[]) => {
  useEffect(() => {
    // Only run if IntersectionObserver is available
    if (!('IntersectionObserver' in window)) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const id = entry.target.id;
            const newHash = `#${id}`;

            // Only update if the hash is different to avoid redundant events
            if (window.location.hash !== newHash) {
              // Update URL hash without scrolling
              window.history.replaceState(null, '', newHash);

              // Manually track pageview for Vercel Analytics
              if (window.va) {
                window.va('pageview', { route: `/${newHash}` });
              }
            }
          }
        });
      },
      {
        root: null, // viewport
        rootMargin: '-50% 0px -50% 0px', // Trigger when section is in the middle of viewport
        threshold: 0
      }
    );

    sectionIds.forEach((id) => {
      const element = document.getElementById(id);
      if (element) {
        observer.observe(element);
      }
    });

    return () => {
      observer.disconnect();
    };
  }, [sectionIds]);
};
