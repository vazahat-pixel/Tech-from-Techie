import React, { memo } from 'react';
import { Star, BadgeCheck, GraduationCap, Sparkles, CheckCircle2, Code2 } from 'lucide-react';

/**
 * Redesigned Instructor card — photo-free, ultra-clean executive engineer design.
 * Features monogram initials badge, verification status, qualifications,
 * rich bio, specialties tags, and rating metrics.
 */
export const InstructorCard = memo(function InstructorCard({ instructor }) {
  const initials = instructor.name
    .split(' ')
    .map((n) => n[0])
    .join('')
    .slice(0, 2);

  return (
    <article
      className="group/i relative h-full flex flex-col rounded-2xl overflow-hidden
                 bg-[var(--surface-100)] border border-line
                 hover:border-accent/50 hover:shadow-elev-3 hover:-translate-y-1
                 transition-all duration-300 ease-out-expo"
    >
      {/* Top subtle accent gradient header line */}
      <div className="h-1.5 w-full bg-gradient-to-r from-brand-blue via-accent to-brand-indigo shrink-0" />

      {/* Card Content Container */}
      <div className="flex-1 flex flex-col p-5 sm:p-6">
        {/* ---------- Header Row: Monogram + Experience Badge ---------- */}
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-center gap-3">
            {/* Elegant Initials Avatar with ambient ring */}
            <div className="relative shrink-0">
              <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-gradient-to-tr from-brand-blue to-accent p-[2px] shadow-glow-blue">
                <div className="w-full h-full rounded-[14px] bg-[var(--surface-200)] flex items-center justify-center">
                  <span className="font-display font-black text-[16px] sm:text-[18px] text-accent tracking-wider">
                    {initials}
                  </span>
                </div>
              </div>
              <span className="absolute -bottom-1 -right-1 p-0.5 rounded-full bg-[var(--surface-100)] ring-1 ring-line">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 fill-emerald-500/20" />
              </span>
            </div>

            <div>
              <div className="flex items-center gap-1.5">
                <h3 className="font-display text-[16px] sm:text-[18px] font-bold text-ink leading-tight">
                  {instructor.name}
                </h3>
                <BadgeCheck className="w-4 h-4 text-blue-400 shrink-0" />
              </div>
              <p className="text-[12px] sm:text-[13px] font-semibold text-accent leading-snug mt-0.5">
                {instructor.role}
              </p>
            </div>
          </div>

          {/* Experience Badge */}
          <span className="hidden sm:inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10.5px] font-bold
                           bg-accent-soft text-accent border border-accent/25 shrink-0">
            <Sparkles className="w-3 h-3" />
            {instructor.companyBadge}
          </span>
        </div>

        {/* Qualification */}
        {instructor.qualification && (
          <div className="inline-flex self-start items-center gap-1.5 px-2.5 py-1 rounded-lg mt-3.5
                          text-[11px] font-medium bg-[var(--surface-200)] text-ink-muted
                          border border-line">
            <GraduationCap className="w-3.5 h-3.5 text-accent shrink-0" />
            <span>{instructor.qualification}</span>
          </div>
        )}

        {/* Bio */}
        <p className="text-[12px] sm:text-[12.5px] text-ink-muted leading-relaxed mt-3.5">
          {instructor.bio}
        </p>

        {/* Specialties Tags */}
        <div className="mt-4 pt-3.5 border-t border-line/60">
          <p className="text-[10px] font-bold uppercase tracking-wider text-ink-soft mb-2 flex items-center gap-1">
            <Code2 className="w-3 h-3 text-accent" />
            <span>Expertise &amp; Domains</span>
          </p>
          <div className="flex flex-wrap gap-1.5">
            {instructor.specialties.map((spec) => (
              <span
                key={spec}
                className="px-2 py-0.5 rounded-md text-[10.5px] font-medium
                           bg-[var(--surface-200)] text-ink-muted border border-line
                           group-hover/i:border-accent/30 transition-colors"
              >
                {spec}
              </span>
            ))}
          </div>
        </div>

        <div className="flex-1" />

        {/* ---------- Footer: Rating & 1-on-1 Sessions ---------- */}
        <div className="flex items-center justify-between mt-5 pt-3.5 border-t border-line">
          <div className="flex items-center gap-1.5">
            <div className="flex items-center text-amber-400">
              {[...Array(5)].map((_, idx) => (
                <Star key={idx} className="w-3 h-3 fill-amber-400 text-amber-400" />
              ))}
            </div>
            <span className="font-bold text-[12px] text-ink ml-1">{instructor.rating}</span>
            <span className="text-ink-soft text-[10.5px] hidden sm:inline">(Mentor Rating)</span>
          </div>

          <span className="inline-flex items-center gap-1.5 text-[10.5px] sm:text-[11px] font-semibold text-emerald-600 dark:text-emerald-400
                           bg-emerald-500/10 px-2 sm:px-2.5 py-1 rounded-lg border border-emerald-500/25">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
            1-on-1 Mentorship
          </span>
        </div>
      </div>
    </article>
  );
});
