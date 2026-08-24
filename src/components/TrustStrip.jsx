import React, { memo } from 'react';
import { ShieldCheck, Video, FolderGit2, Sparkles } from 'lucide-react';
import { siteConfig } from '../data/siteConfig';
import { useReveal } from '../lib/useReveal';

const ICONS = { ShieldCheck, Video, FolderGit2, Sparkles };

export const TrustStrip = () => (
  <section className="relative z-20 -mt-8 sm:-mt-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
      {siteConfig.trustStats.map((stat, i) => (
        <TrustStat key={stat.label} stat={stat} index={i} />
      ))}
    </div>
  </section>
);

const TrustStat = memo(function TrustStat({ stat, index }) {
  const ref = useReveal({ delay: index * 45 });
  const Icon = ICONS[stat.icon] || ShieldCheck;

  return (
    <div
      ref={ref}
      data-reveal
      className="group solid-card rounded-2xl p-4 sm:p-5 flex items-start gap-3
                 hover:border-accent/40 hover:shadow-elev-2 hover:-translate-y-0.5
                 transition-[transform,box-shadow,border-color] duration-300 ease-out-expo"
    >
      <span
        className="shrink-0 p-2.5 rounded-xl border border-accent/25
                   bg-gradient-to-br from-brand-blue/15 to-brand-indigo/15
                   transition-transform duration-300 ease-out-expo group-hover:scale-110"
      >
        <Icon className="w-4.5 h-4.5 w-[18px] h-[18px] text-accent" />
      </span>

      <div className="min-w-0">
        <p className="font-display text-[20px] sm:text-[23px] font-bold text-ink leading-none tracking-tight">
          {stat.value}
        </p>
        <p className="text-[12px] font-semibold text-ink mt-1.5 leading-tight">{stat.label}</p>
        <p className="text-[11px] text-ink-soft mt-0.5 leading-snug">{stat.subtext}</p>
      </div>
    </div>
  );
});
