import React, { useRef, useEffect, useState } from 'react';
import { ShieldCheck } from 'lucide-react';
import { instructors } from '../data/instructors';
import { InstructorCard } from './InstructorCard';
import { SectionHeading } from './UI/SectionHeading';
import { useReveal } from '../lib/useReveal';

/**
 * Instructor marquee.
 *
 * The list is rendered twice back-to-back and the track is translated by
 * exactly one copy's width, then snapped back — so the loop is seamless and
 * never "rewinds" visually.
 *
 * The movement is a CSS animation on `transform`, which the compositor runs on
 * its own thread. It keeps sliding smoothly even while the main thread is busy,
 * and costs no JavaScript per frame.
 */
export const InstructorSection = () => {
  const headingRef = useReveal();
  const [paused, setPaused] = useState(false);
  const viewportRef = useRef(null);

  // Repeat the list until one copy is wider than the viewport, so the loop has
  // something to scroll through even on a wide desktop with only four mentors.
  const [repeats, setRepeats] = useState(2);

  useEffect(() => {
    const check = () => {
      const vw = window.innerWidth;
      const CARD = vw < 640 ? 276 : 300; // card width + gap
      const needed = Math.max(2, Math.ceil((vw * 1.35) / (instructors.length * CARD)));
      setRepeats(needed);
    };
    check();
    window.addEventListener('resize', check, { passive: true });
    return () => window.removeEventListener('resize', check);
  }, []);

  // Pause while the section is off-screen so an unseen animation isn't running.
  useEffect(() => {
    const el = viewportRef.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => setPaused(!e.isIntersecting), { threshold: 0 });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  // Two identical halves: the animation slides exactly 50%, so the seam is
  // invisible and the loop never jumps.
  const half = Array.from({ length: repeats }, () => instructors).flat();
  const items = [...half, ...half];

  return (
    <section id="instructors" className="relative py-20 sm:py-28 overflow-hidden bg-grid-pattern">
      <div className="absolute top-1/3 -right-32 w-80 h-80 rounded-full bg-brand-purple/[0.09] blur-[120px] pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div ref={headingRef} data-reveal>
          <SectionHeading
            eyebrow="Verified Enterprise Mentors"
            eyebrowIcon={ShieldCheck}
            title={<>Learn From The <span className="gradient-text-cyan-purple">Best Industry Experts</span></>}
            subtitle="Direct access to seasoned tech architects and engineering leaders with 12–15+ years of live industry experience."
          />
        </div>
      </div>

      {/* Full-bleed viewport so cards can slide past the container edges */}
      <div className="relative mt-14">
        {/* Edge fades hint that the row continues */}
        <div
          aria-hidden
          className="absolute inset-y-0 left-0 w-12 sm:w-24 z-10 pointer-events-none
                     bg-gradient-to-r from-[var(--bg-main)] to-transparent"
        />
        <div
          aria-hidden
          className="absolute inset-y-0 right-0 w-12 sm:w-24 z-10 pointer-events-none
                     bg-gradient-to-l from-[var(--bg-main)] to-transparent"
        />

        <div ref={viewportRef} className="overflow-hidden px-4 sm:px-6 lg:px-8">
          <ul
            className="flex gap-4 sm:gap-5 marquee-track"
            data-paused={paused ? 'true' : 'false'}
            onMouseEnter={() => setPaused(true)}
            onMouseLeave={() => setPaused(false)}
            onFocusCapture={() => setPaused(true)}
            onBlurCapture={() => setPaused(false)}
          >
            {items.map((instructor, i) => (
              <li
                key={`${instructor.id}-${i}`}
                className="shrink-0 w-[260px] sm:w-[280px]"
                aria-hidden={i >= half.length}
              >
                <InstructorCard instructor={instructor} />
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
};
