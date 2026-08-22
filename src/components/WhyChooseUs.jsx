import React, { memo } from 'react';
import { Award, Video, FolderGit2, Film, BookOpen, Briefcase, Check } from 'lucide-react';
import { whyChooseUsFeatures } from '../data/features';
import { GlassCard } from './UI/GlassCard';
import { SectionHeading } from './UI/SectionHeading';
import { useReveal } from '../lib/useReveal';

const ICONS = { Award, Video, FolderGit2, Film, BookOpen, Briefcase };

const TONES = {
  cyan: { icon: 'text-brand-cyan', ring: 'border-brand-cyan/25', bg: 'from-brand-cyan/15 to-brand-blue/10' },
  purple: { icon: 'text-brand-purple', ring: 'border-brand-purple/25', bg: 'from-brand-purple/15 to-brand-pink/10' },
  blue: { icon: 'text-brand-blue', ring: 'border-brand-blue/25', bg: 'from-brand-blue/15 to-brand-indigo/10' },
};

export const WhyChooseUs = () => (
  <section id="why-us" className="relative py-20 sm:py-28 overflow-hidden bg-grid-pattern">
    <div className="absolute top-1/3 -left-32 w-80 h-80 rounded-full bg-brand-cyan/[0.07] blur-[110px] pointer-events-none" />
    <div className="absolute bottom-0 -right-32 w-80 h-80 rounded-full bg-brand-purple/[0.07] blur-[110px] pointer-events-none" />

    <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <SectionHeading
        eyebrow="The LearnPro Advantage"
        eyebrowIcon={Award}
        title={<>Why Learn <span className="gradient-text-cyan-purple">With Us?</span></>}
        subtitle="Live mentoring from senior MNC veterans, real enterprise architectures, and continuous 1-on-1 code reviews — not a generic course marketplace."
      />

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 mt-14">
        {whyChooseUsFeatures.map((feature, i) => (
          <FeatureCard key={feature.id} feature={feature} index={i} />
        ))}
      </div>
    </div>
  </section>
);

const FeatureCard = memo(function FeatureCard({ feature, index }) {
  const ref = useReveal({ delay: (index % 3) * 45 });
  const Icon = ICONS[feature.icon] || Award;
  const tone = TONES[feature.glowColor] || TONES.cyan;

  return (
    <div ref={ref} data-reveal className="h-full">
      <GlassCard glow={feature.glowColor || 'cyan'} max={5.5} lift={6} className="group/f">
        <div className="p-5 flex flex-col h-full">
          <div className="flex items-start justify-between gap-3">
            <span
              className={`p-2.5 rounded-xl border bg-gradient-to-br ${tone.bg} ${tone.ring}
                          transition-transform duration-500 ease-out-expo group-hover/f:scale-110`}
              style={{ transform: 'translateZ(24px)' }}
            >
              <Icon className={`w-5 h-5 ${tone.icon}`} />
            </span>

            <span className="shrink-0 px-2 py-0.5 rounded-full text-[9.5px] font-bold uppercase tracking-[0.06em]
                             bg-[var(--surface-200)] border border-line text-ink-soft">
              {feature.badge}
            </span>
          </div>

          <h3 className="font-display text-[15.5px] font-semibold text-ink mt-4 leading-snug
                         group-hover/f:text-accent transition-colors duration-300">
            {feature.title}
          </h3>

          <p className="text-body-sm text-ink-muted mt-2 leading-relaxed flex-1">
            {feature.description}
          </p>

          <div className="flex items-center gap-1.5 mt-4 pt-3 border-t border-line">
            <Check className="w-3 h-3 text-emerald-500 dark:text-emerald-400" strokeWidth={3} />
            <span className="text-[11px] font-medium text-ink-soft">Included in all programs</span>
          </div>
        </div>
      </GlassCard>
    </div>
  );
});
