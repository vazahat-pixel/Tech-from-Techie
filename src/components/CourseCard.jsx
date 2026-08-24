import React, { memo } from 'react';
import { Clock, BarChart3, Star, ArrowRight, BookOpen, Sparkles, Code2, BrainCircuit, Briefcase, Layers } from 'lucide-react';
import { instructors } from '../data/instructors';
import { useModal } from '../context/ModalContext';

const CATEGORY_ICONS = {
  'Technology': Code2,
  'AI & Data': BrainCircuit,
  'Career': Briefcase,
};

/**
 * Compact, modern, enhanced course card.
 * Tight vertical footprint, rich information density, crisp aesthetics.
 */
export const CourseCard = memo(function CourseCard({ course }) {
  const { openEnrollModal, openCourseDetail } = useModal();
  const instructor = instructors.find((i) => i.id === course.instructorId) || instructors[0];
  const CategoryIcon = CATEGORY_ICONS[course.category] || Layers;

  return (
    <article
      className="group/card relative h-full flex flex-col justify-between rounded-xl overflow-hidden
                 bg-[var(--surface-100)] border border-line
                 hover:border-accent/50 hover:shadow-elev-2 hover:-translate-y-1
                 transition-all duration-200"
    >
      {/* Top Accent Gradient Line on Hover */}
      <div className="absolute top-0 inset-x-0 h-0.5 bg-gradient-to-r from-blue-500 via-indigo-500 to-blue-600 opacity-0 group-hover/card:opacity-100 transition-opacity duration-200 z-10" />

      <div>
        {/* ---------- Media Header (Compact) ---------- */}
        <div className="relative h-[115px] sm:h-[120px] w-full overflow-hidden bg-[var(--surface-200)]">
          <img
            src={course.image}
            alt={course.title}
            loading="lazy"
            decoding="async"
            className="w-full h-full object-cover group-hover/card:scale-105 transition-transform duration-500 ease-out"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[var(--surface-100)] via-transparent to-black/35" />

          {/* Category Tag */}
          <div className="absolute top-2 left-2 flex items-center gap-1 px-2 py-0.5 rounded-md text-[9.5px] font-bold uppercase tracking-wider
                          bg-[#0B0F1A]/85 text-blue-300 border border-blue-400/25 backdrop-blur-md">
            <CategoryIcon className="w-2.5 h-2.5 text-blue-400" />
            <span>{course.category}</span>
          </div>

          {/* Special / Flagship Badge */}
          {course.badge && (
            <div className="absolute top-2 right-2 flex items-center gap-1 px-2 py-0.5 rounded-md text-[9.5px] font-bold
                            bg-indigo-950/85 text-indigo-300 border border-indigo-400/30 backdrop-blur-md">
              <Sparkles className="w-2.5 h-2.5 text-amber-400" />
              <span>{course.badge}</span>
            </div>
          )}

          {/* Mode Tag */}
          <span className="absolute bottom-1.5 right-2 px-1.5 py-0.5 rounded text-[9px] font-semibold
                           bg-[#0B0F1A]/80 text-white/90 border border-white/10 backdrop-blur-sm">
            {course.mode || 'Offline & Online'}
          </span>
        </div>

        {/* ---------- Compact Body ---------- */}
        <div className="p-3 sm:p-3.5 pb-2">
          {/* Metadata Row */}
          <div className="flex items-center gap-1.5 mb-1.5 text-[10.5px] text-ink-soft">
            <span className="inline-flex items-center gap-1 font-medium bg-[var(--surface-200)] px-1.5 py-0.5 rounded border border-line">
              <BarChart3 className="w-2.5 h-2.5 text-accent" />
              {shortLevel(course.level)}
            </span>
            <span className="inline-flex items-center gap-1 font-medium bg-[var(--surface-200)] px-1.5 py-0.5 rounded border border-line">
              <Clock className="w-2.5 h-2.5 text-accent" />
              {course.duration.includes('•') ? course.duration.split('•')[0].trim() : course.duration}
            </span>
          </div>

          {/* Title */}
          <h3 className="font-display text-[13px] sm:text-[13.5px] font-bold text-ink leading-snug group-hover/card:text-accent transition-colors duration-150 line-clamp-2 min-h-[34px]">
            {course.title}
          </h3>

          {/* Tech Badges */}
          <div className="flex flex-wrap gap-1 mt-2">
            {course.technologies.slice(0, 3).map((tech) => (
              <span
                key={tech}
                className="px-1.5 py-0.5 rounded text-[9.5px] font-medium
                           bg-[var(--surface-200)] text-ink-muted border border-line"
              >
                {tech}
              </span>
            ))}
            {course.technologies.length > 3 && (
              <span className="px-1 py-0.5 rounded text-[9px] font-semibold text-accent bg-accent-soft">
                +{course.technologies.length - 3}
              </span>
            )}
          </div>
        </div>
      </div>

      {/* ---------- Compact Footer ---------- */}
      <div className="px-3 sm:px-3.5 pb-3 pt-1">
        {/* Mentor Strip */}
        <div className="flex items-center justify-between gap-1.5 pt-2 border-t border-line">
          <div className="flex items-center gap-1.5 min-w-0">
            <img
              src={instructor.avatar}
              alt={instructor.name}
              loading="lazy"
              decoding="async"
              className="w-5 h-5 rounded-full object-cover ring-1 ring-accent/30 shrink-0"
            />
            <p className="text-[10px] font-semibold text-ink truncate leading-tight">
              {instructor.name}
            </p>
          </div>
          <span className="text-[8.5px] font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 px-1.5 py-0.5 rounded border border-emerald-500/25 shrink-0">
            1-on-1 Demo
          </span>
        </div>

        {/* Action Buttons */}
        <div className="grid grid-cols-[auto_1fr] gap-1.5 mt-2">
          <button
            onClick={() => openCourseDetail(course)}
            aria-label={`View syllabus for ${course.title}`}
            title="View Details & Syllabus"
            className="p-1.5 px-2 rounded-lg border border-line-strong text-ink-muted
                       hover:text-ink hover:border-accent/40 hover:bg-accent-soft
                       transition-colors duration-150 cursor-pointer flex items-center justify-center"
          >
            <BookOpen className="w-3.5 h-3.5 text-accent" />
          </button>

          <button
            onClick={() => openEnrollModal(course.title)}
            className="btn-gradient btn-shine group py-1.5 px-2.5 rounded-lg text-[11px] font-bold text-white
                       shadow-glow-blue hover:shadow-glow-mixed active:scale-[0.98]
                       transition-all duration-150 cursor-pointer flex items-center justify-center gap-1"
          >
            <span>Book Free Demo</span>
            <ArrowRight className="w-3 h-3 transition-transform duration-200 group-hover:translate-x-0.5" />
          </button>
        </div>
      </div>
    </article>
  );
});

function shortLevel(level = '') {
  if (/beginner to advanced/i.test(level)) return 'All Levels';
  if (/intermediate to advanced/i.test(level)) return 'Intermediate+';
  if (/advanced/i.test(level)) return 'Advanced';
  if (/intermediate/i.test(level)) return 'Intermediate';
  if (/beginner/i.test(level)) return 'Beginner';
  return level;
}
