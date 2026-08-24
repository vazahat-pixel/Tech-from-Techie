import React, { useState, useMemo, useDeferredValue, memo } from 'react';
import { Search, BookOpen, X } from 'lucide-react';
import { courses, courseCategories } from '../data/courses';
import { CourseCard } from './CourseCard';
import { SectionHeading } from './UI/SectionHeading';
import { useReveal } from '../lib/useReveal';

export const CourseSection = () => {
  const [selectedCategory, setSelectedCategory] = useState('All Courses');
  const [searchQuery, setSearchQuery] = useState('');

  // Keeps typing responsive: filtering runs at a lower priority than the input.
  const deferredQuery = useDeferredValue(searchQuery);

  const filteredCourses = useMemo(() => {
    const q = deferredQuery.trim().toLowerCase();
    return courses.filter((course) => {
      const matchesCategory =
        selectedCategory === 'All Courses' || course.category === selectedCategory;
      if (!matchesCategory) return false;
      if (!q) return true;
      return (
        course.title.toLowerCase().includes(q) ||
        course.description.toLowerCase().includes(q) ||
        course.technologies.some((t) => t.toLowerCase().includes(q))
      );
    });
  }, [selectedCategory, deferredQuery]);

  return (
    <section id="courses" className="relative py-20 sm:py-28 overflow-hidden bg-radial-atmosphere">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Industry-Oriented Programs"
          eyebrowIcon={BookOpen}
          title={<>Explore Our <span className="gradient-text-cyan-purple">Programs</span></>}
          subtitle="Practical, career-focused technology training across Java, Full Stack, AI, Cloud & DevOps, and professional development."
        />

        {/* ---------- Filters ---------- */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 mt-12">
          <div className="flex items-center gap-1 p-1 rounded-xl border border-line bg-[var(--surface-200)]
                          overflow-x-auto no-scrollbar max-w-full">
            {courseCategories.map((category) => {
              const active = selectedCategory === category;
              return (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  aria-pressed={active}
                  className={`relative shrink-0 px-3.5 py-1.5 rounded-lg text-[12.5px] font-medium whitespace-nowrap
                              transition-[color,background-color,box-shadow] duration-300 cursor-pointer
                              ${active
                                ? 'text-white font-bold shadow-glow-blue'
                                : 'text-ink-muted hover:text-ink hover:bg-accent-soft'}`}
                  style={active ? { background: 'linear-gradient(135deg,#2563EB,#4338CA)' } : undefined}
                >
                  {category}
                </button>
              );
            })}
          </div>

          <div className="relative w-full md:w-64 shrink-0">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-ink-soft pointer-events-none" />
            <input
              type="search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search courses, skills…"
              aria-label="Search courses"
              className="w-full pl-9 pr-8 py-2 rounded-xl glass-input text-[12.5px]"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                aria-label="Clear search"
                className="absolute right-2.5 top-1/2 -translate-y-1/2 p-0.5 rounded text-ink-soft
                           hover:text-ink transition-colors cursor-pointer"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        </div>

        {/* ---------- Grid ---------- */}
        {filteredCourses.length > 0 ? (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 mt-7">
            {filteredCourses.map((course, i) => (
              <CourseCardSlot key={course.id} course={course} index={i} />
            ))}
          </div>
        ) : (
          <div className="mt-10 mx-auto max-w-sm text-center solid-card rounded-2xl p-8">
            <span className="inline-grid place-items-center w-11 h-11 rounded-full bg-[var(--surface-200)] text-ink-soft">
              <Search className="w-5 h-5" />
            </span>
            <h3 className="font-display text-[15px] font-semibold text-ink mt-3">No courses found</h3>
            <p className="text-body-sm text-ink-muted mt-1.5">
              Nothing matches {searchQuery ? `"${searchQuery}"` : 'this filter'}. Try another category
              or clear your search.
            </p>
            <button
              onClick={() => {
                setSelectedCategory('All Courses');
                setSearchQuery('');
              }}
              className="mt-4 px-4 py-2 rounded-lg text-[12px] font-semibold text-accent
                         bg-accent-soft border border-accent/30 hover:bg-accent/15
                         active:scale-95 transition-all duration-200 cursor-pointer"
            >
              Reset filters
            </button>
          </div>
        )}
      </div>
    </section>
  );
};

/**
 * Reveal wrapper. Kept separate so a filter change doesn't re-run the reveal
 * observer for cards that were already on screen.
 */
const CourseCardSlot = memo(function CourseCardSlot({ course, index }) {
  const ref = useReveal({ delay: Math.min(index, 3) * 45 });
  return (
    <div ref={ref} data-reveal className="h-full">
      <CourseCard course={course} />
    </div>
  );
});
