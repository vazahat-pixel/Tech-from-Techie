import React, { memo } from 'react';
import { Terminal, GitBranch, MessageSquareCode, Cpu, CheckCircle2, TrendingUp, Users2, GraduationCap, Layers } from 'lucide-react';
import { learningExperienceFeatures } from '../data/features';
import { SectionHeading } from './UI/SectionHeading';
import { useReveal } from '../lib/useReveal';

const ICONS = {
  Terminal, GitBranch, MessageSquareCode, Cpu,
  CheckCircle2, TrendingUp, Users2, GraduationCap,
};

export const LearningExperience = () => (
  <section id="learning" className="relative py-20 sm:py-28 overflow-hidden bg-grid-pattern">
    <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <SectionHeading
        eyebrow="End-to-End Learning Ecosystem"
        eyebrowIcon={Layers}
        title={<>Everything You Need <span className="gradient-text-cyan-purple">To Succeed</span></>}
        subtitle="Rigorous hands-on practice, industrial toolchains and real-time mentor feedback — so you graduate with production-ready confidence."
      />

      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3.5 sm:gap-4 mt-14">
        {learningExperienceFeatures.map((feat, i) => (
          <LearningTile key={feat.title} feat={feat} index={i} />
        ))}
      </div>
    </div>
  </section>
);

const LearningTile = memo(function LearningTile({ feat, index }) {
  const ref = useReveal({ delay: (index % 4) * 40 });
  const Icon = ICONS[feat.icon] || Terminal;

  return (
    <div
      ref={ref}
      data-reveal
      className="group/t solid-card rounded-2xl p-4 sm:p-5
                 hover:border-accent/45 hover:shadow-elev-2 hover:-translate-y-1
                 transition-[transform,box-shadow,border-color] duration-400 ease-out-expo"
    >
      <span
        className="inline-grid place-items-center w-10 h-10 rounded-xl mb-3
                   bg-gradient-to-br from-brand-blue/12 to-brand-indigo/12
                   border border-accent/22
                   transition-transform duration-500 ease-out-expo group-hover/t:scale-110"
      >
        <Icon className="w-4 h-4 text-accent" />
      </span>

      <h3 className="font-display text-[13.5px] font-semibold text-ink leading-snug
                     group-hover/t:text-accent transition-colors duration-300">
        {feat.title}
      </h3>

      <p className="text-[11.5px] text-ink-muted leading-relaxed mt-1.5">
        {feat.description}
      </p>
    </div>
  );
});
