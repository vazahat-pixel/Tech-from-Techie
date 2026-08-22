import React, { memo } from 'react';
import { Star, Users, BadgeCheck } from 'lucide-react';

/**
 * Instructor card.
 *
 * The portrait uses a 4:5 frame (not a short letterbox) and sits above the
 * text rather than behind it, so the face is never cropped at the chin or
 * covered by an overlay. No tilt, no cursor tracking, no per-frame work.
 */
export const InstructorCard = memo(function InstructorCard({ instructor }) {
  return (
    <article
      className="group/i h-full flex flex-col rounded-2xl overflow-hidden solid-card
                 hover:border-brand-purple/40 hover:shadow-elev-2
                 transition-[box-shadow,border-color] duration-200"
    >
      {/* ---------- Portrait ---------- */}
      <div className="relative aspect-[4/5] overflow-hidden shrink-0 bg-[var(--surface-200)]">
        <img
          src={instructor.avatar}
          alt={instructor.name}
          loading="lazy"
          decoding="async"
          className="absolute inset-0 w-full h-full object-cover object-[50%_22%]"
        />

        {/* Company badge only — no scrim across the face */}
        <span
          className="absolute top-2.5 left-2.5 right-2.5 inline-flex items-center gap-1 px-2 py-0.5
                     rounded-md text-[9.5px] font-bold bg-[#070C1B]/80 text-[#5FE9FF]
                     border border-[#5FE9FF]/30 backdrop-blur-sm w-fit max-w-full"
        >
          <BadgeCheck className="w-2.5 h-2.5 shrink-0" />
          <span className="truncate">{instructor.companyBadge}</span>
        </span>
      </div>

      {/* ---------- Body ---------- */}
      <div className="flex-1 flex flex-col p-3.5">
        <h3 className="font-display text-[15px] font-bold text-ink leading-tight">
          {instructor.name}
        </h3>
        <p className="text-[11.5px] text-ink-muted leading-snug mt-0.5">{instructor.role}</p>

        <span className="inline-flex self-start items-center px-2 py-0.5 rounded-md mt-2
                         text-[10px] font-semibold bg-brand-purple/12 text-brand-purple
                         border border-brand-purple/25">
          {instructor.experience}
        </span>

        <p className="text-[11.5px] text-ink-muted leading-relaxed mt-2.5 line-clamp-3">
          {instructor.bio}
        </p>

        <div className="flex flex-wrap gap-1 mt-2.5">
          {instructor.specialties.slice(0, 3).map((spec) => (
            <span
              key={spec}
              className="px-1.5 py-0.5 rounded text-[9.5px] font-medium
                         bg-[var(--surface-200)] text-ink-muted border border-line"
            >
              {spec}
            </span>
          ))}
          {instructor.specialties.length > 3 && (
            <span className="px-1.5 py-0.5 rounded text-[9.5px] font-semibold text-brand-purple bg-brand-purple/10">
              +{instructor.specialties.length - 3}
            </span>
          )}
        </div>

        <div className="flex-1" />

        <div className="flex items-center justify-between mt-3 pt-2.5 border-t border-line">
          <span className="inline-flex items-center gap-1 text-[11px]">
            <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
            <span className="font-bold text-ink">{instructor.rating}</span>
            <span className="text-ink-soft text-[10px]">rating</span>
          </span>

          <span className="inline-flex items-center gap-1 text-[11px]">
            <Users className="w-3 h-3 text-accent" />
            <span className="font-semibold text-ink">{instructor.studentsTaught}</span>
            <span className="text-ink-soft text-[10px]">mentored</span>
          </span>
        </div>
      </div>
    </article>
  );
});
