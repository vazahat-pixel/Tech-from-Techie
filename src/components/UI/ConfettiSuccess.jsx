import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { Check, ArrowRight, Calendar, Video, Clock } from 'lucide-react';

export const ConfettiSuccess = ({ studentName = 'Learner', courseName = '', onClose }) => {
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    let cancelled = false;
    // Loaded on demand: confetti is celebration-only and shouldn't sit in the
    // main bundle for every visitor.
    import('canvas-confetti').then(({ default: confetti }) => {
      if (cancelled) return;
      const defaults = { origin: { y: 0.62 }, zIndex: 9999, disableForReducedMotion: true };
      confetti({ ...defaults, particleCount: 45, spread: 62, startVelocity: 42, colors: ['#00E5FF', '#3B82F6', '#8B5CF6'] });
      window.setTimeout(() => {
        if (!cancelled) {
          confetti({ ...defaults, particleCount: 30, spread: 96, decay: 0.91, scalar: 0.85, colors: ['#A855F7', '#EC4899', '#38BDF8'] });
        }
      }, 130);
    });

    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.96 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
      className="text-center px-5 py-7"
    >
      {/* Success mark */}
      <motion.div
        initial={{ scale: 0.4, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.08, type: 'spring', damping: 14, stiffness: 260 }}
        className="relative w-16 h-16 mx-auto"
      >
        <div className="absolute inset-0 rounded-full bg-emerald-500/15 border-2 border-emerald-500/40 flex items-center justify-center">
          <motion.svg viewBox="0 0 24 24" className="w-8 h-8" fill="none" aria-hidden>
            <motion.path
              d="M4.5 12.5 10 18 19.5 7"
              stroke="rgb(16 185 129)"
              strokeWidth="2.6"
              strokeLinecap="round"
              strokeLinejoin="round"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ delay: 0.24, duration: 0.42, ease: 'easeOut' }}
            />
          </motion.svg>
        </div>
      </motion.div>

      <span className="inline-block mt-4 text-[10px] font-bold uppercase tracking-[0.08em] text-emerald-500 dark:text-emerald-400 px-2.5 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/30">
        Booking Confirmed
      </span>

      <h3 className="font-display text-[21px] font-bold text-ink mt-2.5 leading-tight">
        You're registered, {studentName.split(' ')[0]}!
      </h3>

      <p className="text-[12.5px] text-ink-muted mt-1.5 leading-relaxed max-w-sm mx-auto">
        Your free 3-day live demo pass is reserved{courseName ? ` for ${courseName}` : ''}. Our
        advisor will email your classroom credentials shortly.
      </p>

      <div className="grid grid-cols-3 gap-2 mt-5 text-left">
        {[
          { icon: Calendar, label: 'Demo Type', value: '1-on-1 Free', tone: 'text-brand-blue' },
          { icon: Video, label: 'Format', value: 'Live & Interactive', tone: 'text-brand-indigo' },
          { icon: Clock, label: 'Schedule', value: 'Flexible Timing', tone: 'text-emerald-500' },
        ].map(({ icon: Icon, label, value, tone }) => (
          <div key={label} className="p-2.5 rounded-lg bg-[var(--surface-200)] border border-line">
            <Icon className={`w-3.5 h-3.5 ${tone}`} />
            <p className="text-[9.5px] text-ink-soft mt-1.5">{label}</p>
            <p className="text-[10.5px] font-semibold text-ink leading-tight">{value}</p>
          </div>
        ))}
      </div>

      <button
        onClick={onClose}
        className="btn-gradient btn-shine group w-full mt-5 py-2.5 rounded-xl text-[12.5px] font-bold
                   text-white shadow-glow-blue hover:shadow-glow-mixed
                   active:scale-[0.985] transition-transform duration-200 cursor-pointer
                   flex items-center justify-center gap-2"
      >
        <span>Explore More Programs</span>
        <ArrowRight className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-1" />
      </button>
    </motion.div>
  );
};
