import React from 'react';
import { Sparkles, ArrowRight, ShieldCheck, Star, Video, ChevronDown } from 'lucide-react';
import { siteConfig } from '../data/siteConfig';
import { HeroVisual } from './HeroVisual';
import { useModal } from '../context/ModalContext';
import { scrollToTarget } from '../lib/smoothScroll';

const TRUST_TAGS = [
  { label: 'Microsoft Experienced Mentors', dot: 'bg-tech-microsoft' },
  { label: 'Cisco Certified Architects', dot: 'bg-tech-cisco' },
  { label: '12–15+ Years Experience', icon: ShieldCheck },
  { label: 'Live + Lifetime Recordings', icon: Video },
];

export const Hero = () => {
  const { openEnrollModal } = useModal();

  return (
    <section
      id="hero"
      className="relative min-h-[92vh] flex items-center pt-28 sm:pt-32 pb-16 overflow-hidden bg-grid-pattern"
    >
      {/* Atmosphere */}
      <div className="absolute inset-x-0 top-0 h-[620px] pointer-events-none bg-radial-atmosphere" />
      <div className="absolute top-1/4 -left-40 w-[420px] h-[420px] rounded-full bg-brand-cyan/[0.09] blur-[120px] pointer-events-none" />
      <div className="absolute top-1/3 -right-40 w-[420px] h-[420px] rounded-full bg-brand-purple/[0.09] blur-[120px] pointer-events-none" />

      <div className="relative w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-[1fr_minmax(340px,46%)] gap-10 lg:gap-8 items-center">
          {/* ---------------- Copy ---------------- */}
          <div className="text-center lg:text-left hero-enter">
            <span
              className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-semibold
                         bg-accent-soft text-accent border border-accent/25"
              style={{ '--i': 0 }}
            >
              <Sparkles className="w-3 h-3" />
              {siteConfig.brand.badge}
            </span>

            <h1
              className="font-display text-display-xl text-ink mt-5 text-balance"
              style={{ '--i': 1 }}
            >
              Learn From Industry Experts.{' '}
              <span className="gradient-text-cyan-purple">Build Your Future.</span>
            </h1>

            <p
              className="text-body-lg text-ink-muted mt-5 max-w-xl mx-auto lg:mx-0 text-pretty"
              style={{ '--i': 2 }}
            >
              {siteConfig.brand.subTagline} Live interactive classes, real-world projects, and
              personalized 1-on-1 career mentorship.
            </p>

            {/* Trust tags */}
            <ul
              className="flex flex-wrap justify-center lg:justify-start gap-2 mt-6"
              style={{ '--i': 3 }}
            >
              {TRUST_TAGS.map(({ label, dot, icon: Icon }) => (
                <li
                  key={label}
                  className="inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg
                             bg-[var(--surface-200)] border border-line
                             text-[11.5px] font-medium text-ink-muted"
                >
                  {dot ? (
                    <span className={`w-1.5 h-1.5 rounded-full ${dot}`} />
                  ) : (
                    <Icon className="w-3.5 h-3.5 text-accent" />
                  )}
                  {label}
                </li>
              ))}
            </ul>

            {/* CTAs */}
            <div
              className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3 mt-8"
              style={{ '--i': 4 }}
            >
              <button
                onClick={() => openEnrollModal('')}
                className="btn-gradient btn-shine group w-full sm:w-auto px-7 py-3.5 rounded-xl
                           text-[13px] font-bold text-[#04101F] shadow-glow-cyan hover:shadow-glow-mixed
                           hover:-translate-y-0.5 active:translate-y-0 active:scale-[0.98]
                           transition-[transform,box-shadow,background-position] duration-300 ease-out-expo
                           cursor-pointer inline-flex items-center justify-center gap-2"
              >
                <Sparkles className="w-4 h-4" />
                <span>Get 3 Days Free Demo</span>
                <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
              </button>

              <button
                onClick={() => scrollToTarget('#courses')}
                className="group w-full sm:w-auto px-7 py-3.5 rounded-xl text-[13px] font-semibold
                           text-ink border border-line-strong bg-[var(--surface-100)]
                           hover:border-accent/50 hover:bg-accent-soft hover:-translate-y-0.5
                           active:translate-y-0 active:scale-[0.98]
                           transition-[transform,border-color,background-color] duration-300 ease-out-expo
                           cursor-pointer inline-flex items-center justify-center gap-2"
              >
                <span>Explore Courses</span>
                <ChevronDown className="w-4 h-4 text-accent transition-transform duration-300 group-hover:translate-y-0.5" />
              </button>
            </div>

            {/* Social proof */}
            <div
              className="flex items-center justify-center lg:justify-start gap-3.5 mt-8 pt-6 border-t border-line"
              style={{ '--i': 5 }}
            >
              <div className="flex -space-x-2.5">
                {siteConfig.heroProof.avatars.map((src, i) => (
                  <img
                    key={i}
                    src={src}
                    alt=""
                    aria-hidden
                    loading="lazy"
                    decoding="async"
                    width={36}
                    height={36}
                    className="w-9 h-9 rounded-full object-cover ring-2 ring-[var(--bg-main)]"
                  />
                ))}
              </div>
              <div className="text-left">
                <div className="flex items-center gap-1">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                  ))}
                  <span className="ml-1.5 text-[12px] font-bold text-ink">
                    {siteConfig.heroProof.rating}
                  </span>
                </div>
                <p className="text-[11.5px] text-ink-soft mt-0.5">
                  Trusted by{' '}
                  <span className="font-semibold text-ink">{siteConfig.heroProof.studentCount}</span>{' '}
                  engineers
                </p>
              </div>
            </div>
          </div>

          {/* ---------------- Visual ---------------- */}
          <div className="relative hero-stage">
            <HeroVisual />
          </div>

        </div>
      </div>
    </section>
  );
};
