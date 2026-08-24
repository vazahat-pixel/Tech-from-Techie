import React, { useState, useRef, useEffect, useCallback } from 'react';
import { Compass, Video, ShieldCheck, Rocket, Sparkles, ArrowRight, Check } from 'lucide-react';
import { howItWorksSteps } from '../data/features';
import { useModal } from '../context/ModalContext';
import { onFrame } from '../lib/smoothScroll';
import { getDeviceCapability } from '../lib/useDeviceCapability';
import { SectionHeading } from './UI/SectionHeading';


const STEP_IMAGES = [
  'https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=900&auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1531482615713-2afd69097998?w=900&auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1543269865-cbf427effbad?w=900&auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=900&auto=format&fit=crop&q=80',
];

const STEP_ICONS = [Compass, Video, ShieldCheck, Rocket];

const STEP_HIGHLIGHTS = [
  ['Explore all technology tracks', 'Match your career goals', 'Understand the curriculum'],
  ['One-to-one session with mentor', 'Experience live coding demo', 'Zero commitment required'],
  ['12+ year industry professionals', 'Hands-on real-world projects', 'Chapter-wise mock interviews'],
  ['Build professional portfolio', 'Earn certifications', 'Career guidance & placement prep'],
];

const ACCENTS = [
  { text: 'text-blue-500 dark:text-blue-400', bg: 'bg-blue-500', ring: 'ring-blue-500/40', glow: 'rgba(37,99,235,0.25)' },
  { text: 'text-blue-400 dark:text-blue-300', bg: 'bg-blue-400', ring: 'ring-blue-400/40', glow: 'rgba(96,165,250,0.25)' },
  { text: 'text-indigo-500 dark:text-indigo-400', bg: 'bg-indigo-500', ring: 'ring-indigo-500/40', glow: 'rgba(99,102,241,0.25)' },
  { text: 'text-emerald-500 dark:text-emerald-400', bg: 'bg-emerald-500', ring: 'ring-emerald-500/40', glow: 'rgba(16,185,129,0.25)' },
];

export const HowItWorks = () => {
  const { openEnrollModal } = useModal();
  const [activeStep, setActiveStep] = useState(0);
  const caps = getDeviceCapability();

  const trackRef = useRef(null);
  const progressRef = useRef(null);
  const stepRefs = useRef([]);
  const activeRef = useRef(0);

  /**
   * Scroll-driven progression.
   *
   * Runs on the shared frame loop rather than a scroll listener, and only calls
   * setState when the active step actually changes — the progress line itself
   * is updated by writing a transform directly, so scrolling costs no renders.
   */
  useEffect(() => {
    if (caps.reducedMotion) return;

    let ticking = false;

    const unsubscribe = onFrame(() => {
      const track = trackRef.current;
      if (!track || ticking) return;
      ticking = true;

      const rect = track.getBoundingClientRect();
      const vh = window.innerHeight;

      // 0 → 1 as the track travels through the middle band of the viewport.
      const raw = (vh * 0.62 - rect.top) / Math.max(rect.height * 0.85, 1);
      const progress = Math.min(1, Math.max(0, raw));

      if (progressRef.current) {
        progressRef.current.style.transform = `scaleY(${progress.toFixed(4)})`;
      }

      const next = Math.min(3, Math.max(0, Math.floor(progress * 4 - 0.02)));
      if (next !== activeRef.current) {
        activeRef.current = next;
        setActiveStep(next);
      }

      ticking = false;
    });

    return unsubscribe;
  }, [caps.reducedMotion]);

  const jumpTo = useCallback((i) => {
    activeRef.current = i;
    setActiveStep(i);
    stepRefs.current[i]?.scrollIntoView({ behavior: 'smooth', block: 'center' });
  }, []);

  return (
    <section id="how-it-works" className="relative py-20 sm:py-28 overflow-hidden bg-radial-atmosphere">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Your Learning Journey"
          eyebrowIcon={Compass}
          title={<>How Your <span className="gradient-text-cyan-purple">Journey Unfolds</span></>}
          subtitle="A structured, risk-free pathway from your first trial class to production-grade engineering mastery."
        />

        <div className="grid lg:grid-cols-[1fr_minmax(320px,44%)] gap-10 lg:gap-14 mt-14 items-start">
          {/* ---------------- Timeline ---------------- */}
          <div ref={trackRef} className="relative">
            {/* Rail */}
            <div className="absolute left-[19px] top-4 bottom-4 w-[2px] bg-line rounded-full overflow-hidden">
              <div
                ref={progressRef}
                className="absolute inset-0 origin-top rounded-full
                           bg-gradient-to-b from-brand-blue via-blue-500 to-brand-indigo"
                style={{ transform: 'scaleY(0)', willChange: 'transform' }}
              />
            </div>

            <ol className="space-y-8 sm:space-y-11">
              {howItWorksSteps.map((step, i) => {
                const Icon = STEP_ICONS[i];
                const accent = ACCENTS[i];
                const isActive = i === activeStep;
                const isDone = i < activeStep;

                return (
                  <li
                    key={step.step}
                    ref={(el) => (stepRefs.current[i] = el)}
                    className="relative pl-14 sm:pl-16"
                  >
                    {/* Node */}
                    <button
                      onClick={() => jumpTo(i)}
                      aria-label={`Go to step ${step.step}: ${step.title}`}
                      aria-current={isActive ? 'step' : undefined}
                      className={`absolute left-0 top-0 w-10 h-10 rounded-xl grid place-items-center
                                  border cursor-pointer
                                  transition-[transform,background-color,border-color,box-shadow] duration-500 ease-out-expo
                                  ${isActive || isDone
                                    ? 'border-transparent text-[#04101F] scale-105'
                                    : 'border-line-strong bg-[var(--surface-100)] text-ink-soft hover:border-accent/50'}`}
                      style={
                        isActive || isDone
                          ? {
                              background: 'linear-gradient(135deg,#2563EB,#4338CA,#6D28D9)',
                              boxShadow: isActive ? `0 0 26px -4px ${accent.glow}` : 'none',
                            }
                          : undefined
                      }
                    >
                      {isDone ? <Check className="w-4 h-4" strokeWidth={3} /> : <Icon className="w-4 h-4" />}
                    </button>

                    {/* Content */}
                    <div
                      className="transition-[opacity,transform] duration-600 ease-out-expo"
                      style={{
                        opacity: isActive ? 1 : isDone ? 0.72 : 0.42,
                        transform: isActive ? 'translateX(0)' : 'translateX(-4px)',
                      }}
                    >
                      <span className={`font-mono text-[11px] font-bold tracking-[0.14em] ${isActive ? accent.text : 'text-ink-soft'}`}>
                        STEP {step.step}
                      </span>

                      <h3 className="font-display text-display-sm text-ink mt-1 leading-tight">
                        {step.title}
                      </h3>

                      <p className="text-body-sm text-ink-muted mt-1.5 max-w-md leading-relaxed">
                        {step.description}
                      </p>

                      {/* Highlights expand for the active step only */}
                      <div
                        className="grid transition-[grid-template-rows,opacity] duration-500 ease-out-expo"
                        style={{
                          gridTemplateRows: isActive ? '1fr' : '0fr',
                          opacity: isActive ? 1 : 0,
                        }}
                      >
                        <div className="overflow-hidden">
                          <ul className="flex flex-wrap gap-1.5 pt-3">
                            {STEP_HIGHLIGHTS[i].map((h) => (
                              <li
                                key={h}
                                className="inline-flex items-center gap-1.5 px-2 py-1 rounded-md
                                           bg-[var(--surface-200)] border border-line text-[11px] text-ink-muted"
                              >
                                <span className={`w-1 h-1 rounded-full ${accent.bg}`} />
                                {h}
                              </li>
                            ))}
                          </ul>

                          {i === 1 && (
                            <button
                              onClick={() => openEnrollModal('')}
                              className="btn-gradient btn-shine group mt-3.5 inline-flex items-center gap-2
                                         px-4 py-2 rounded-lg text-[12px] font-bold text-white
                                         shadow-glow-blue hover:shadow-glow-mixed
                                         active:scale-[0.97] transition-transform duration-200 cursor-pointer"
                            >
                              <Sparkles className="w-3.5 h-3.5" />
                              <span>Book your free demo</span>
                              <ArrowRight className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-1" />
                            </button>
                          )}
                        </div>
                      </div>
                    </div>
                  </li>
                );
              })}
            </ol>
          </div>

          {/* ---------------- Sticky 3D stage ---------------- */}
          <div className="lg:sticky lg:top-28">
            <div className="relative rounded-2xl overflow-hidden solid-card">
              <div className="absolute inset-0 bg-grid-pattern opacity-70 pointer-events-none" />
              <div
                className="absolute inset-0 pointer-events-none transition-[background] duration-700"
                style={{ background: `radial-gradient(circle at 50% 45%, ${ACCENTS[activeStep].glow}, transparent 68%)` }}
              />

              <div className="relative h-[300px] sm:h-[360px]">
                {STEP_IMAGES.map((src, i) => (
                  <img
                    key={src}
                    src={src}
                    alt={howItWorksSteps[i].title}
                    loading="lazy"
                    decoding="async"
                    className="absolute inset-0 w-full h-full object-cover transition-opacity duration-500 ease-out-expo"
                    style={{ opacity: i === activeStep ? 1 : 0 }}
                  />
                ))}
                <div className="absolute inset-0 bg-gradient-to-t from-[var(--surface-100)] via-transparent to-transparent" />
              </div>

              {/* Stage caption */}
              <div className="relative px-5 py-4 border-t border-line">
                <div className="flex items-center justify-between gap-3">
                  <div className="min-w-0">
                    <p className={`font-mono text-[10px] font-bold tracking-[0.14em] ${ACCENTS[activeStep].text}`}>
                      PHASE {howItWorksSteps[activeStep].step}
                    </p>
                    <p className="font-display text-[14px] font-semibold text-ink truncate mt-0.5">
                      {howItWorksSteps[activeStep].title}
                    </p>
                  </div>

                  {/* Progress pips */}
                  <div className="flex items-center gap-1.5 shrink-0">
                    {howItWorksSteps.map((s, i) => (
                      <button
                        key={s.step}
                        onClick={() => jumpTo(i)}
                        aria-label={`Step ${s.step}`}
                        className={`h-1.5 rounded-full cursor-pointer transition-all duration-500 ease-out-expo
                                    ${i === activeStep ? `w-6 ${ACCENTS[i].bg}` : 'w-1.5 bg-line-strong hover:bg-accent/50'}`}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
