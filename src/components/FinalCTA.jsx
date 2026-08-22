import React from 'react';
import { Sparkles, ArrowRight, Check } from 'lucide-react';
import { useModal } from '../context/ModalContext';
import { useReveal } from '../lib/useReveal';

const HIGHLIGHTS = [
  { label: 'Zero Commitment', tone: 'text-brand-cyan' },
  { label: '100% Live Classes', tone: 'text-brand-purple' },
  { label: 'Instant Pass Generation', tone: 'text-emerald-500 dark:text-emerald-400' },
];

export const FinalCTA = () => {
  const { openEnrollModal } = useModal();
  const ref = useReveal();

  return (
    <section className="relative py-20 sm:py-28 overflow-hidden bg-radial-atmosphere-bottom">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[760px] h-[380px]
                      bg-gradient-to-b from-brand-cyan/12 via-brand-purple/8 to-transparent
                      blur-[110px] rounded-full pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div
          ref={ref}
          data-reveal="scale"
          className="relative rounded-3xl overflow-hidden text-center
                     glass-panel-glow border-accent/35 shadow-glow-mixed
                     p-8 sm:p-12 lg:p-14"
        >
          <div className="absolute inset-0 bg-grid-pattern opacity-40 pointer-events-none" />
          <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-[420px] h-[420px]
                          rounded-full bg-brand-cyan/[0.07] blur-3xl pointer-events-none" />

          <div className="relative max-w-2xl mx-auto">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-semibold
                             bg-accent-soft text-accent border border-accent/25">
              <Sparkles className="w-3 h-3" />
              Begin Your Transformation Today
            </span>

            <h2 className="font-display text-display-lg text-ink mt-4 text-balance">
              Your Learning Journey <span className="gradient-text-cyan-purple">Starts Here.</span>
            </h2>

            <p className="text-body text-ink-muted mt-4 max-w-xl mx-auto text-pretty">
              Learn directly from senior architects at Microsoft, Cisco and top tech MNCs. Attend
              three full live interactive classes free before you decide.
            </p>

            <ul className="flex flex-wrap items-center justify-center gap-x-5 gap-y-2 mt-6">
              {HIGHLIGHTS.map(({ label, tone }) => (
                <li key={label} className="inline-flex items-center gap-1.5 text-[12.5px] font-medium text-ink-muted">
                  <Check className={`w-3.5 h-3.5 ${tone}`} strokeWidth={3} />
                  {label}
                </li>
              ))}
            </ul>

            <button
              onClick={() => openEnrollModal('')}
              className="btn-gradient btn-shine group w-full sm:w-auto mt-8 px-9 py-4 rounded-xl
                         text-[14px] font-bold text-[#04101F] shadow-glow-cyan hover:shadow-glow-mixed
                         hover:-translate-y-0.5 active:translate-y-0 active:scale-[0.98]
                         transition-[transform,box-shadow,background-position] duration-300 ease-out-expo
                         cursor-pointer inline-flex items-center justify-center gap-2.5"
            >
              <Sparkles className="w-4.5 h-4.5 w-[18px] h-[18px]" />
              <span>Start Your 3-Day Free Demo</span>
              <ArrowRight className="w-[18px] h-[18px] transition-transform duration-300 group-hover:translate-x-1" />
            </button>

            <p className="text-[11.5px] text-ink-soft mt-3.5">
              No credit card required. Live classroom access delivered to your email.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
