import React, { memo } from 'react';
import { Clock, BarChart3, Star, ArrowRight, BookOpen, CheckCircle2, Sparkles, Code2, BrainCircuit, Briefcase, Layers, GraduationCap } from 'lucide-react';
import { instructors } from '../data/instructors';
import { useModal } from '../context/ModalContext';

const CATEGORY_ICONS = {
  'Technology': Code2,
  'AI & Data': BrainCircuit,
  'Career': Briefcase,
};

/**
 * Enhanced, modern, high-tier course card with interactive depth,
 * frosted glass overlays, and clear information hierarchy.
 */
export const CourseCard = memo(function CourseCard({ course }) {
  const { openEnrollModal, openCourseDetail } = useModal();
  const instructor = instructors.find((i) => i.id === course.instructorId) || instructors[0];
  const CategoryIcon = CATEGORY_ICONS[course.category] || Layers;

  // Pick top 2 module highlights from curriculum if available
  const topModules = course.curriculum?.slice(0, 2).map((m) => m.title) || [];

  return (
    <article
      className="group/card relative h-full flex flex-col rounded-2xl overflow-hidden
                 bg-[var(--surface-100)] border border-line
                 hover:border-accent/50 hover:shadow-elev-3 hover:-translate-y-1.5
                 transition-all duration-300 ease-out flex flex-col justify-between"
    >
      {/* Top Accent Gradient Bar on Hover */}
      <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-blue-500 via-indigo-500 to-blue-600 opacity-0 group-hover/card:opacity-100 transition-opacity duration-300 z-10" />

      <div>
        {/* ---------- Media Container ---------- */}
        <div className="relative h-[160px] sm:h-[170px] w-full overflow-hidden bg-[var(--surface-200)]">
          <img
            src={course.image}
            alt={course.title}
            loading="lazy"
            decoding="async"
            className="w-full h-full object-cover group-hover/card:scale-108 transition-transform duration-700 ease-out"
          />

          {/* Smooth Dark Gradient Overlays for readable tags */}
          <div className="absolute inset-0 bg-gradient-to-t from-[var(--surface-100)] via-transparent to-black/30" />

          {/* Top Left: Category Badge */}
          <div className="absolute top-3 left-3 flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-[10.5px] font-bold uppercase tracking-wider
                          bg-[#0B0F1A]/85 text-blue-300 border border-blue-400/25 backdrop-blur-md shadow-sm">
            <CategoryIcon className="w-3 h-3 text-blue-400" />
            <span>{course.category}</span>
          </div>

          {/* Top Right: Flagship / Special Badge */}
          {course.badge && (
            <div className="absolute top-3 right-3 flex items-center gap-1 px-2.5 py-1 rounded-lg text-[10.5px] font-bold
                            bg-gradient-to-r from-indigo-900/90 to-blue-900/90 text-indigo-200
                            border border-indigo-400/35 backdrop-blur-md shadow-sm">
              <Sparkles className="w-2.5 h-2.5 text-amber-300" />
              <span>{course.badge}</span>
            </div>
          )}

          {/* Bottom Right Floating Badge: Mode */}
          <div className="absolute bottom-2.5 right-3 px-2 py-0.5 rounded-md text-[10px] font-semibold
                          bg-[#0B0F1A]/80 text-white/90 border border-white/15 backdrop-blur-md">
            {course.mode || 'Offline & Online'}
          </div>
        </div>

        {/* ---------- Body Content ---------- */}
        <div className="p-4 sm:p-5 flex flex-col">
          {/* Level & Duration Chips */}
          <div className="flex items-center gap-2 mb-2.5">
            <span className="inline-flex items-center gap-1 text-[11px] font-medium text-ink-muted bg-[var(--surface-200)] px-2 py-0.5 rounded-md border border-line">
              <BarChart3 className="w-3 h-3 text-accent" />
              {shortLevel(course.level)}
            </span>
            <span className="inline-flex items-center gap-1 text-[11px] font-medium text-ink-muted bg-[var(--surface-200)] px-2 py-0.5 rounded-md border border-line">
              <Clock className="w-3 h-3 text-accent" />
              {course.duration.includes('•') ? course.duration.split('•')[0].trim() : course.duration}
            </span>
          </div>

          {/* Title */}
          <h3 className="font-display text-[15.5px] sm:text-[16.5px] font-bold text-ink leading-snug group-hover/card:text-accent transition-colors duration-200 line-clamp-2 min-h-[44px]">
            {course.title}
          </h3>

          {/* Description snippet */}
          <p className="text-[12px] sm:text-[12.5px] text-ink-muted leading-relaxed mt-2 line-clamp-2">
            {course.shortDescription || course.description}
          </p>

          {/* Key Syllabus Bullet Highlights */}
          {topModules.length > 0 && (
            <div className="mt-3.5 pt-3 border-t border-line/70 space-y-1.5">
              {topModules.map((mod, idx) => (
                <div key={idx} className="flex items-start gap-1.5 text-[11.5px] text-ink-muted leading-tight">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0 mt-0.5" />
                  <span className="truncate">{mod}</span>
                </div>
              ))}
            </div>
          )}

          {/* Technology Badges */}
          <div className="flex flex-wrap gap-1.5 mt-3.5">
            {course.technologies.slice(0, 3).map((tech) => (
              <span
                key={tech}
                className="px-2 py-0.5 rounded-md text-[10.5px] font-medium
                           bg-[var(--surface-200)] text-ink-muted border border-line"
              >
                {tech}
              </span>
            ))}
            {course.technologies.length > 3 && (
              <span className="px-1.5 py-0.5 rounded-md text-[10.5px] font-semibold text-accent bg-accent-soft border border-accent/20">
                +{course.technologies.length - 3} more
              </span>
            )}
          </div>
        </div>
      </div>

      {/* ---------- Footer with Mentor & Actions ---------- */}
      <div className="p-4 sm:p-5 pt-0">
        {/* Mentor Info Row */}
        <div className="flex items-center justify-between gap-2.5 pt-3 border-t border-line">
          <div className="flex items-center gap-2 min-w-0">
            <div className="relative">
              <img
                src={instructor.avatar}
                alt={instructor.name}
                loading="lazy"
                decoding="async"
                className="w-7 h-7 rounded-full object-cover ring-1.5 ring-accent/40"
              />
              <span className="absolute bottom-0 right-0 w-2 h-2 rounded-full bg-emerald-500 ring-1 ring-white dark:ring-black" />
            </div>
            <div className="min-w-0">
              <p className="text-[11.5px] font-bold text-ink leading-none truncate">
                {instructor.name}
              </p>
              <p className="text-[10px] text-accent font-medium mt-0.5 leading-none truncate">
                {instructor.experience}
              </p>
            </div>
          </div>

          <span className="text-[9.5px] font-bold tracking-wide uppercase text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 px-2 py-1 rounded-md border border-emerald-500/25 shrink-0">
            1-on-1 Demo
          </span>
        </div>

        {/* Buttons */}
        <div className="grid grid-cols-[auto_1fr] gap-2 mt-3.5">
          <button
            onClick={() => openCourseDetail(course)}
            aria-label={`View syllabus for ${course.title}`}
            title="View Full Curriculum"
            className="px-3 py-2.5 rounded-xl border border-line-strong text-ink-muted
                       hover:text-ink hover:border-accent/50 hover:bg-accent-soft active:scale-95
                       transition-all duration-200 cursor-pointer flex items-center justify-center gap-1.5 text-[12px] font-semibold"
          >
            <BookOpen className="w-4 h-4 text-accent" />
            <span className="hidden sm:inline">Syllabus</span>
          </button>

          <button
            onClick={() => openEnrollModal(course.title)}
            className="btn-gradient btn-shine group py-2.5 px-4 rounded-xl text-[12px] font-bold text-white
                       shadow-glow-blue hover:shadow-glow-mixed active:scale-[0.98]
                       transition-all duration-200 cursor-pointer flex items-center justify-center gap-2"
          >
            <span>Book Free Demo</span>
            <ArrowRight className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-1" />
          </button>
        </div>
      </div>
    </article>
  );
});

/** Condense verbose level strings into a scannable chip label. */
function shortLevel(level = '') {
  if (/beginner to advanced/i.test(level)) return 'All Levels';
  if (/intermediate to advanced/i.test(level)) return 'Intermediate+';
  if (/advanced/i.test(level)) return 'Advanced';
  if (/intermediate/i.test(level)) return 'Intermediate';
  if (/beginner/i.test(level)) return 'Beginner';
  return level;
}
