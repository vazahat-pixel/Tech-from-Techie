import React, { useEffect, memo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Clock, Video, ShieldCheck, Check, FolderGit2, Sparkles, BookOpen, Award, ArrowRight, Target } from 'lucide-react';
import { useModal } from '../context/ModalContext';
import { instructors } from '../data/instructors';
import { lockScroll } from '../lib/smoothScroll';

export const CourseDetailModal = () => {
  const { isCourseDetailOpen, activeDetailCourse, closeCourseDetail, openEnrollModal } = useModal();

  useEffect(() => {
    if (!isCourseDetailOpen) return;

    lockScroll(true);
    document.body.style.overflow = 'hidden';

    const onKeyDown = (e) => {
      if (e.key === 'Escape') closeCourseDetail();
    };
    window.addEventListener('keydown', onKeyDown);

    return () => {
      lockScroll(false);
      document.body.style.overflow = '';
      window.removeEventListener('keydown', onKeyDown);
    };
  }, [isCourseDetailOpen, closeCourseDetail]);

  const course = activeDetailCourse;
  const instructor = course
    ? instructors.find((i) => i.id === course.instructorId) || instructors[0]
    : null;

  return (
    <AnimatePresence>
      {isCourseDetailOpen && course && (
        <div
          className="fixed inset-0 z-[70] flex items-end sm:items-center justify-center sm:p-5"
          role="dialog"
          aria-modal="true"
          aria-labelledby="course-detail-title"
        >
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.26 }}
            onClick={closeCourseDetail}
            className="absolute inset-0 bg-[#04070F]/70 backdrop-blur-md"
          />

          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.97, y: 12 }}
            transition={{ duration: 0.42, ease: [0.16, 1, 0.3, 1] }}
            className="relative w-full sm:max-w-3xl flex flex-col
                       max-h-[92dvh] sm:max-h-[88dvh]
                       rounded-t-3xl sm:rounded-2xl overflow-hidden
                       glass-panel-glow shadow-elev-3"
          >
            {/* ---------- Header ---------- */}
            <header className="shrink-0 px-5 sm:px-6 pt-5 pb-4 border-b border-line relative">
              <button
                onClick={closeCourseDetail}
                aria-label="Close"
                className="absolute top-4 right-4 p-1.5 rounded-lg text-ink-muted hover:text-ink
                           hover:bg-accent-soft active:scale-90 transition-all duration-200 cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>

              <div className="flex flex-wrap items-center gap-1.5 pr-8">
                <Pill tone="accent">{course.category}</Pill>
                <Pill tone="purple">{course.level}</Pill>
                <Pill tone="emerald">
                  <Sparkles className="w-2.5 h-2.5" />
                  Free 3-Day Demo Included
                </Pill>
              </div>

              <h2 id="course-detail-title" className="font-display text-display-sm text-ink mt-2.5 leading-tight pr-8">
                {course.title}
              </h2>

              <p className="text-body-sm text-ink-muted mt-2 leading-relaxed">
                {course.description}
              </p>
            </header>

            {/* ---------- Scrollable body ---------- */}
            <div className="flex-1 min-h-0 overflow-y-auto custom-modal-scroll px-5 sm:px-6 py-5 space-y-6">
              {/* Metrics */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                <Metric icon={Clock} tone="text-accent" label="Duration" value={course.duration} />
                <Metric icon={Video} tone="text-brand-purple" label="Format" value="Live + Recordings" />
                <Metric icon={ShieldCheck} tone="text-emerald-500" label="Mentor" value={instructor.companyBadge} />
                <Metric icon={Award} tone="text-amber-500" label="Certificate" value="Verified Credential" />
              </div>

              {/* Curriculum */}
              <section>
                <SubHeading icon={BookOpen} tone="text-accent">Course Syllabus</SubHeading>
                <div className="grid sm:grid-cols-2 gap-2.5 mt-3">
                  {course.curriculum.map((module) => (
                    <div
                      key={module.week}
                      className="p-3.5 rounded-xl bg-[var(--surface-200)] border border-line
                                 hover:border-accent/35 transition-colors duration-300"
                    >
                      <span className="font-mono text-[10px] font-bold uppercase tracking-[0.08em] text-accent">
                        {module.week}
                      </span>
                      <h4 className="text-[13px] font-semibold text-ink mt-1 leading-snug">{module.title}</h4>
                      <ul className="space-y-1 mt-2">
                        {module.topics.map((topic) => (
                          <li key={topic} className="flex items-start gap-1.5 text-[11.5px] text-ink-muted leading-snug">
                            <Check className="w-3 h-3 text-brand-purple shrink-0 mt-0.5" strokeWidth={3} />
                            <span>{topic}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </section>

              {/* Projects */}
              <section>
                <SubHeading icon={FolderGit2} tone="text-brand-purple">Capstone Industry Projects</SubHeading>
                <div className="grid sm:grid-cols-3 gap-2.5 mt-3">
                  {course.projects.map((proj, i) => (
                    <div key={proj} className="p-3 rounded-xl bg-[var(--surface-200)] border border-line flex items-start gap-2.5">
                      <span className="shrink-0 font-mono text-[11px] font-bold text-brand-purple
                                       bg-brand-purple/12 px-1.5 py-1 rounded-md leading-none">
                        {String(i + 1).padStart(2, '0')}
                      </span>
                      <p className="text-[11.5px] text-ink-muted leading-snug">{proj}</p>
                    </div>
                  ))}
                </div>
              </section>

              {/* Outcomes */}
              {course.outcomes?.length > 0 && (
                <section>
                  <SubHeading icon={Target} tone="text-emerald-500">What You'll Be Able To Do</SubHeading>
                  <ul className="space-y-1.5 mt-3">
                    {course.outcomes.map((o) => (
                      <li key={o} className="flex items-start gap-2 text-[12.5px] text-ink-muted leading-snug">
                        <Check className="w-3.5 h-3.5 text-emerald-500 shrink-0 mt-0.5" strokeWidth={3} />
                        <span>{o}</span>
                      </li>
                    ))}
                  </ul>
                </section>
              )}

              {/* Instructor */}
              <section className="p-4 rounded-xl bg-[var(--surface-200)] border border-accent/25 flex flex-col sm:flex-row gap-4">
                <img
                  src={instructor.avatar}
                  alt=""
                  aria-hidden
                  loading="lazy"
                  className="w-14 h-14 rounded-xl object-cover object-top ring-2 ring-accent/35 shrink-0 mx-auto sm:mx-0"
                />
                <div className="text-center sm:text-left">
                  <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2">
                    <h4 className="text-[13.5px] font-bold text-ink">{instructor.name}</h4>
                    <span className="px-1.5 py-0.5 rounded text-[10px] font-bold text-accent bg-accent-soft border border-accent/30">
                      {instructor.companyBadge}
                    </span>
                    <span className="text-[11px] text-ink-soft">{instructor.experience}</span>
                  </div>
                  <p className="text-[12px] text-ink-muted leading-relaxed mt-1.5">{instructor.bio}</p>
                </div>
              </section>
            </div>

            {/* ---------- Footer ---------- */}
            <footer className="shrink-0 px-5 sm:px-6 py-3.5 border-t border-line bg-[var(--glass-glow-bg)]
                               flex flex-col sm:flex-row items-center justify-between gap-3">
              <div className="text-center sm:text-left">
                <p className="text-[11px] text-ink-soft">Zero risk · Free 3-day live trial</p>
                <p className="text-[12px] font-bold text-emerald-500 dark:text-emerald-400">No credit card required</p>
              </div>

              <div className="flex items-center gap-2 w-full sm:w-auto">
                <button
                  onClick={closeCourseDetail}
                  className="flex-1 sm:flex-none px-4 py-2.5 rounded-xl text-[12px] font-semibold
                             border border-line-strong text-ink-muted hover:text-ink hover:border-accent/45
                             active:scale-95 transition-all duration-200 cursor-pointer"
                >
                  Close
                </button>

                <button
                  onClick={() => openEnrollModal(course.title)}
                  className="btn-gradient btn-shine group flex-1 sm:flex-none px-5 py-2.5 rounded-xl
                             text-[12px] font-bold text-[#04101F] shadow-glow-cyan hover:shadow-glow-mixed
                             active:scale-[0.97] transition-transform duration-200 cursor-pointer
                             inline-flex items-center justify-center gap-1.5 whitespace-nowrap"
                >
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Claim Free Demo</span>
                  <ArrowRight className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-1" />
                </button>
              </div>
            </footer>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

const TONE_CLASSES = {
  accent: 'bg-accent-soft text-accent border-accent/30',
  purple: 'bg-brand-purple/12 text-brand-purple border-brand-purple/30',
  emerald: 'bg-emerald-500/12 text-emerald-600 dark:text-emerald-400 border-emerald-500/30',
};

const Pill = memo(function Pill({ tone = 'accent', children }) {
  return (
    <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[10px] font-bold border ${TONE_CLASSES[tone]}`}>
      {children}
    </span>
  );
});

const Metric = memo(function Metric({ icon: Icon, tone, label, value }) {
  return (
    <div className="p-2.5 rounded-xl bg-[var(--surface-200)] border border-line">
      <p className="text-[9.5px] uppercase tracking-[0.06em] text-ink-soft">{label}</p>
      <p className="flex items-center gap-1.5 text-[11.5px] font-semibold text-ink mt-1 leading-tight">
        <Icon className={`w-3.5 h-3.5 shrink-0 ${tone}`} />
        <span className="truncate">{value}</span>
      </p>
    </div>
  );
});

const SubHeading = memo(function SubHeading({ icon: Icon, tone, children }) {
  return (
    <h3 className="flex items-center gap-2 font-display text-[15px] font-semibold text-ink">
      <Icon className={`w-4 h-4 ${tone}`} />
      {children}
    </h3>
  );
});
