import React, { memo } from 'react';
import { Clock, BarChart3, Star, ArrowRight, BookOpen } from 'lucide-react';
import { instructors } from '../data/instructors';
import { useModal } from '../context/ModalContext';

/**
 * Compact course card.
 *
 * Static by design: no tilt, no cursor tracking, no image zoom. Hover changes
 * only border and shadow, which the compositor handles on its own — scrolling
 * past a grid of these costs no JavaScript at all.
 */
export const CourseCard = memo(function CourseCard({ course }) {
  const { openEnrollModal, openCourseDetail } = useModal();
  const instructor = instructors.find((i) => i.id === course.instructorId) || instructors[0];

  return (
    <article
      className="group/card h-full flex flex-col rounded-2xl overflow-hidden solid-card
                 hover:border-accent/40 hover:shadow-elev-2
                 transition-[box-shadow,border-color] duration-200"
    >
      {/* ---------- Media ---------- */}
      <div className="relative h-[150px] shrink-0 overflow-hidden bg-[var(--surface-200)]">
        <img
          src={course.image}
          alt=""
          aria-hidden
          loading="lazy"
          decoding="async"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[var(--surface-100)] via-transparent to-transparent" />

        <span
          className="absolute top-2.5 left-2.5 px-2 py-0.5 rounded-md text-[10px] font-bold uppercase
                     tracking-[0.06em] bg-[#070C1B]/80 text-[#5FE9FF]
                     border border-[#5FE9FF]/35 backdrop-blur-sm"
        >
          {course.category}
        </span>

        {course.badge && (
          <span
            className="absolute top-2.5 right-2.5 px-2 py-0.5 rounded-md text-[10px] font-bold
                       bg-[#1B1140]/85 text-[#C9A6FF] border border-[#C9A6FF]/35 backdrop-blur-sm"
          >
            {course.badge}
          </span>
        )}
      </div>

      {/* ---------- Body ---------- */}
      <div className="flex-1 flex flex-col p-3.5">
        <h3 className="font-display text-[14px] font-semibold leading-[1.3] text-ink line-clamp-2 min-h-[36px]">
          {course.title}
        </h3>

        {/* Metadata chips */}
        <div className="flex flex-wrap items-center gap-1.5 mt-2.5">
          <Chip icon={Clock}>{course.duration.split('•')[0].trim()}</Chip>
          <Chip icon={BarChart3}>{shortLevel(course.level)}</Chip>
          <Chip icon={Star} accent>
            {course.rating}
          </Chip>
        </div>

        {/* Tech stack */}
        <div className="flex flex-wrap gap-1 mt-2">
          {course.technologies.slice(0, 3).map((tech) => (
            <span
              key={tech}
              className="px-1.5 py-0.5 rounded text-[10px] font-medium
                         bg-[var(--surface-200)] text-ink-muted border border-line"
            >
              {tech}
            </span>
          ))}
          {course.technologies.length > 3 && (
            <span className="px-1.5 py-0.5 rounded text-[10px] font-semibold text-accent bg-accent-soft">
              +{course.technologies.length - 3}
            </span>
          )}
        </div>

        <div className="flex-1" />

        {/* Instructor */}
        <div className="flex items-center gap-2 mt-3 pt-2.5 border-t border-line">
          <img
            src={instructor.avatar}
            alt=""
            aria-hidden
            loading="lazy"
            decoding="async"
            className="w-7 h-7 rounded-full object-cover object-[50%_20%] ring-1 ring-accent/35"
          />
          <div className="min-w-0 flex-1">
            <p className="text-[11px] font-semibold text-ink leading-tight truncate">
              {instructor.name}
            </p>
            <p className="text-[10px] text-accent font-medium leading-tight truncate">
              {instructor.companyBadge}
            </p>
          </div>
          <span className="text-[9px] font-bold text-emerald-500 dark:text-emerald-400 bg-emerald-500/10 px-1.5 py-0.5 rounded border border-emerald-500/25 shrink-0">
            FREE DEMO
          </span>
        </div>

        {/* Actions */}
        <div className="grid grid-cols-[auto_1fr] gap-1.5 mt-2.5">
          <button
            onClick={() => openCourseDetail(course)}
            aria-label={`View syllabus for ${course.title}`}
            className="px-2.5 py-2 rounded-lg border border-line-strong text-ink-muted
                       hover:text-ink hover:border-accent/45 transition-colors duration-150
                       cursor-pointer flex items-center justify-center"
          >
            <BookOpen className="w-3.5 h-3.5" />
          </button>

          <button
            onClick={() => openEnrollModal(course.title)}
            className="py-2 px-3 rounded-lg text-[11px] font-bold text-[#04101F]
                       bg-gradient-to-r from-[#00E5FF] to-[#6C8BFF]
                       hover:brightness-110 transition-[filter] duration-150
                       cursor-pointer flex items-center justify-center gap-1.5"
          >
            <span>Enroll Now</span>
            <ArrowRight className="w-3 h-3" />
          </button>
        </div>
      </div>
    </article>
  );
});

const Chip = memo(function Chip({ icon: Icon, children, accent }) {
  return (
    <span
      className={`inline-flex items-center gap-1 px-1.5 py-0.5 rounded-md text-[10px] font-medium
                  border border-line ${accent ? 'text-amber-500 dark:text-amber-400' : 'text-ink-muted'}
                  bg-[var(--surface-200)]`}
    >
      <Icon className={`w-2.5 h-2.5 ${accent ? 'fill-amber-400 text-amber-400' : 'text-accent'}`} />
      {children}
    </span>
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
