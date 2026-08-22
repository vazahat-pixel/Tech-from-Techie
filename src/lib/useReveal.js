import { useEffect, useRef } from 'react';

/**
 * Shared IntersectionObserver for all scroll-reveal elements.
 *
 * One observer for the whole page instead of one framer-motion `whileInView`
 * node per element: reveals are handed to the compositor as a CSS class flip,
 * so scrolling never runs React render work.
 */
let observer = null;

function getObserver() {
  if (observer || typeof window === 'undefined') return observer;

  observer = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (entry.isIntersecting) {
          entry.target.setAttribute('data-revealed', 'true');
          // Reveal is one-shot; stop watching so the observer list stays small.
          observer.unobserve(entry.target);
        }
      }
    },
    { rootMargin: '0px 0px 12% 0px', threshold: 0.01 }
  );

  return observer;
}

/**
 * Attach to any element to reveal it once on scroll-in.
 * @param {{ delay?: number }} options staggered delay in ms
 */
export function useReveal({ delay = 0 } = {}) {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    // Respect reduced-motion by revealing immediately.
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      el.setAttribute('data-revealed', 'true');
      return;
    }

    if (delay) el.style.setProperty('--reveal-delay', `${delay}ms`);

    const obs = getObserver();
    obs?.observe(el);

    return () => obs?.unobserve(el);
  }, [delay]);

  return ref;
}
