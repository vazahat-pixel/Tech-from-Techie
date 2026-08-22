import React from 'react';
import { Sparkles, Check, Clock, ArrowRight, Video } from 'lucide-react';
import { siteConfig } from '../data/siteConfig';
import { useModal } from '../context/ModalContext';
import { useReveal } from '../lib/useReveal';


export const DemoSection = () => {
  const { openEnrollModal } = useModal();
  const copyRef = useReveal();
  const stageRef = useReveal({ delay: 120 });

  return (
    <section id="demo" className="relative py-20 sm:py-28 overflow-hidden bg-radial-atmosphere-bottom">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative rounded-3xl overflow-hidden glass-panel-glow p-6 sm:p-10 lg:p-12">
          <div className="absolute inset-0 bg-grid-pattern opacity-60 pointer-events-none" />
          <div className="absolute -top-24 -right-24 w-72 h-72 rounded-full bg-brand-purple/12 blur-3xl pointer-events-none" />
          <div className="absolute -bottom-24 -left-24 w-72 h-72 rounded-full bg-brand-cyan/12 blur-3xl pointer-events-none" />

          <div className="relative grid lg:grid-cols-[1fr_minmax(300px,42%)] gap-10 lg:gap-12 items-center">
            {/* ---------- Copy ---------- */}
            <div ref={copyRef} data-reveal="left">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-semibold
                               bg-emerald-500/10 text-emerald-500 dark:text-emerald-400 border border-emerald-500/25">
                <Sparkles className="w-3 h-3" />
                Experience Before You Commit
              </span>

              <h2 className="font-display text-display-lg text-ink mt-4 text-balance">
                3 Days <span className="gradient-text-cyan-purple">FREE Live Demo</span> Classes
              </h2>

              <p className="text-body text-ink-muted mt-3.5 max-w-xl text-pretty">
                Experience our teaching caliber first-hand, interact live with senior Microsoft &amp;
                Cisco mentors, and test the virtual lab ecosystem before any financial commitment.
              </p>

              {/* Perks */}
              <ul className="grid sm:grid-cols-2 gap-x-5 gap-y-2.5 mt-6">
                {siteConfig.demoPerks.map((perk) => (
                  <li key={perk} className="flex items-start gap-2">
                    <span className="mt-[3px] w-4 h-4 shrink-0 rounded-full bg-emerald-500/15 border border-emerald-500/35 grid place-items-center">
                      <Check className="w-2.5 h-2.5 text-emerald-500 dark:text-emerald-400" strokeWidth={3.2} />
                    </span>
                    <span className="text-body-sm text-ink-muted leading-snug">{perk}</span>
                  </li>
                ))}
              </ul>

              {/* Batch banner */}
              <div className="mt-6 p-3.5 rounded-xl bg-[var(--surface-200)] border border-line
                              flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div className="flex items-center gap-2.5">
                  <span className="p-2 rounded-lg bg-brand-purple/15 border border-brand-purple/30">
                    <Clock className="w-4 h-4 text-brand-purple" />
                  </span>
                  <div>
                    <p className="text-[12.5px] font-semibold text-ink leading-tight">Upcoming Free Demo Cohort</p>
                    <p className="text-[11px] text-ink-soft leading-tight mt-0.5">
                      Limited to 25 interactive seats per batch
                    </p>
                  </div>
                </div>
                <span className="shrink-0 px-2.5 py-1 rounded-full text-[10px] font-bold
                                 bg-accent-soft text-accent border border-accent/30">
                  Seats Filling Fast
                </span>
              </div>

              <button
                onClick={() => openEnrollModal('')}
                className="btn-gradient btn-shine group w-full sm:w-auto mt-6 px-7 py-3.5 rounded-xl
                           text-[13px] font-bold text-[#04101F] shadow-glow-cyan hover:shadow-glow-mixed
                           hover:-translate-y-0.5 active:translate-y-0 active:scale-[0.98]
                           transition-[transform,box-shadow,background-position] duration-300 ease-out-expo
                           cursor-pointer inline-flex items-center justify-center gap-2"
              >
                <Sparkles className="w-4 h-4" />
                <span>Book My Free 3-Day Demo</span>
                <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
              </button>
            </div>

            {/* ---------- 3D stage ---------- */}
            <div ref={stageRef} data-reveal="scale" className="relative">
              <div className="relative rounded-2xl overflow-hidden border border-line shadow-elev-2">
                <img
                  src="https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=900&auto=format&fit=crop&q=80"
                  alt="Mentor teaching a live online class"
                  loading="lazy"
                  decoding="async"
                  className="w-full h-[300px] sm:h-[380px] object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#050A18]/85 via-[#050A18]/15 to-transparent" />

                <div className="absolute top-3.5 left-3.5 inline-flex items-center gap-2 px-2.5 py-1.5 rounded-lg bg-[#070C1B]/80 border border-white/15 backdrop-blur-sm">
                  <span className="w-1.5 h-1.5 rounded-full bg-rose-400" />
                  <span className="text-[11px] font-semibold text-white">Live Session</span>
                </div>

                <div className="absolute bottom-3.5 inset-x-3.5 flex items-center justify-between gap-2">
                  <div>
                    <p className="text-[15px] font-bold text-white leading-none">3 Days Free</p>
                    <p className="text-[11px] text-white/70 mt-1 leading-none">Full access, no card required</p>
                  </div>
                  <span className="px-2.5 py-1 rounded-md text-[10px] font-bold bg-[#5FE9FF]/15 text-[#5FE9FF] border border-[#5FE9FF]/35">
                    25 SEATS
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
