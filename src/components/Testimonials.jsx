import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Star, ChevronLeft, ChevronRight, Quote, Heart, BadgeCheck } from 'lucide-react';
import { testimonials } from '../data/testimonials';
import { SectionHeading } from './UI/SectionHeading';
import { useReveal } from '../lib/useReveal';

const AUTOPLAY_MS = 4200;

/**
 * Slide transition.
 *
 * The card travels a full container width, so it genuinely slides in from the
 * edge instead of cross-fading in place. Only transform and opacity animate,
 * which the compositor handles without touching layout.
 */
const slideVariants = {
  enter: (d) => ({ x: d.dir * d.w, opacity: 0 }),
  center: {
    x: 0,
    opacity: 1,
    transition: {
      x: { type: 'spring', stiffness: 300, damping: 34, mass: 0.85 },
      opacity: { duration: 0.2 },
    },
  },
  exit: (d) => ({
    x: -d.dir * d.w,
    opacity: 0,
    transition: {
      x: { type: 'spring', stiffness: 300, damping: 34, mass: 0.85 },
      opacity: { duration: 0.3 },
    },
  }),
};

export const Testimonials = () => {
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState(1);
  const [paused, setPaused] = useState(false);
  const touchStart = useRef(0);
  const stageRef = useRef(null);
  const [stageW, setStageW] = useState(720);
  const cardRef = useReveal();

  const go = useCallback((next, dir) => {
    setDirection(dir);
    setIndex(((next % testimonials.length) + testimonials.length) % testimonials.length);
  }, []);

  const next = useCallback(() => go(index + 1, 1), [go, index]);
  const prev = useCallback(() => go(index - 1, -1), [go, index]);

  useEffect(() => {
    if (paused) return;
    const id = window.setInterval(() => {
      setDirection(1);
      setIndex((i) => (i + 1) % testimonials.length);
    }, AUTOPLAY_MS);
    return () => window.clearInterval(id);
  }, [paused]);

  useEffect(() => {
    const el = stageRef.current;
    if (!el) return;
    const measure = () => setStageW(el.clientWidth || 720);
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  const onTouchStart = (e) => {
    touchStart.current = e.touches[0].clientX;
  };
  const onTouchEnd = (e) => {
    const delta = touchStart.current - e.changedTouches[0].clientX;
    if (Math.abs(delta) > 50) (delta > 0 ? next : prev)();
  };

  const current = testimonials[index];

  return (
    <section id="testimonials" className="relative py-20 sm:py-28 overflow-hidden bg-radial-atmosphere">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full bg-brand-blue/[0.06] blur-[140px] pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Real Student Reviews"
          eyebrowIcon={Heart}
          title={<>Loved By <span className="gradient-text-cyan-purple">Our Learners</span></>}
          subtitle="How aspiring engineers transformed their careers with live mentorship and hands-on production architecture."
        />

        <div
          ref={cardRef}
          data-reveal
          className="max-w-3xl mx-auto mt-14"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
          onFocusCapture={() => setPaused(true)}
          onBlurCapture={() => setPaused(false)}
          onTouchStart={onTouchStart}
          onTouchEnd={onTouchEnd}
        >
          {/* Fixed min-height prevents the layout jumping between quotes of
              different lengths — a common source of scroll-position shifts. */}
          <div
            ref={stageRef}
            className="relative min-h-[268px] sm:min-h-[240px] overflow-hidden rounded-2xl"
            aria-live="polite"
          >
            <AnimatePresence initial={false} mode="sync" custom={{ dir: direction, w: stageW }}>
              <motion.figure
                key={current.id}
                custom={{ dir: direction, w: stageW }}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                className="solid-card rounded-2xl p-6 sm:p-8 absolute inset-0"
              >
                <Quote className="absolute top-5 right-6 w-12 h-12 text-accent/[0.08] pointer-events-none" />

                <div className="flex items-center gap-1">
                  {Array.from({ length: current.rating }).map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                  ))}
                  <span className="ml-2 text-[11.5px] font-semibold text-ink-muted">
                    {current.rating}.0 rating
                  </span>
                </div>

                <blockquote className="text-[15px] sm:text-[16.5px] text-ink leading-relaxed mt-4 text-pretty">
                  “{current.review}”
                </blockquote>

                <figcaption className="flex flex-wrap items-center justify-between gap-3 mt-5 pt-4 border-t border-line">
                  <div className="flex items-center gap-3">
                    <img
                      src={current.avatar}
                      alt=""
                      aria-hidden
                      loading="lazy"
                      decoding="async"
                      className="w-10 h-10 rounded-full object-cover ring-2 ring-accent/35"
                    />
                    <div>
                      <p className="text-[13px] font-bold text-ink flex items-center gap-1.5 leading-tight">
                        {current.name}
                        <BadgeCheck className="w-3.5 h-3.5 text-emerald-500 dark:text-emerald-400" />
                      </p>
                      <p className="text-[11px] text-ink-muted leading-tight mt-0.5">
                        {current.role} · <span className="font-semibold text-accent">{current.company}</span>
                      </p>
                    </div>
                  </div>

                  <span className="px-2.5 py-1 rounded-md text-[10.5px] font-medium
                                   bg-indigo-500/12 text-indigo-600 dark:text-indigo-400 border border-indigo-500/25">
                    {current.course}
                  </span>
                </figcaption>
              </motion.figure>
            </AnimatePresence>
          </div>

          {/* Controls */}
          <div className="flex items-center justify-between mt-5">
            <div className="flex items-center gap-1.5">
              {testimonials.map((t, i) => (
                <button
                  key={t.id}
                  onClick={() => go(i, i > index ? 1 : -1)}
                  aria-label={`Review ${i + 1} of ${testimonials.length}`}
                  aria-current={i === index}
                  className={`relative h-1.5 rounded-full cursor-pointer overflow-hidden
                              transition-all duration-400 ease-out-expo
                              ${i === index ? 'w-8 bg-accent/25' : 'w-1.5 bg-line-strong hover:bg-accent/50'}`}
                >
                  {/* Fills across the dwell time so the auto-advance is visible */}
                  {i === index && (
                    <span
                      key={`${t.id}-${index}`}
                      className="absolute inset-0 origin-left rounded-full bg-accent"
                      style={{
                        animation: `dot-fill ${AUTOPLAY_MS}ms linear forwards`,
                        animationPlayState: paused ? 'paused' : 'running',
                      }}
                    />
                  )}
                </button>
              ))}
            </div>

            <div className="flex items-center gap-2">
              {[
                { onClick: prev, Icon: ChevronLeft, label: 'Previous review' },
                { onClick: next, Icon: ChevronRight, label: 'Next review' },
              ].map(({ onClick, Icon, label }) => (
                <button
                  key={label}
                  onClick={onClick}
                  aria-label={label}
                  className="p-2 rounded-xl border border-line-strong bg-[var(--surface-100)] text-ink-muted
                             hover:text-ink hover:border-accent/50 hover:bg-accent-soft
                             active:scale-90 transition-all duration-200 cursor-pointer"
                >
                  <Icon className="w-4 h-4" />
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
