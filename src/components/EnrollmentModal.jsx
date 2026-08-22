import React, { useEffect, useState, useCallback, useRef } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { motion, AnimatePresence } from 'framer-motion';
import { X, User, Mail, Phone, BookOpen, MessageSquare, Sparkles, Loader2, ShieldCheck, AlertCircle } from 'lucide-react';
import { useModal } from '../context/ModalContext';
import { courses } from '../data/courses';
import { ConfettiSuccess } from './UI/ConfettiSuccess';
import { lockScroll } from '../lib/smoothScroll';
import { useMediaQuery } from '../lib/useDeviceCapability';

const enrollmentSchema = z.object({
  fullName: z.string().trim().min(2, { message: 'Please enter your full name' }),
  email: z.string().trim().email({ message: 'Enter a valid email address' }),
  phone: z
    .string()
    .trim()
    .min(8, { message: 'Enter a valid phone number' })
    .regex(/^[+\d][\d\s()-]{6,}$/, { message: 'Enter a valid phone number' }),
  course: z.string().min(1, { message: 'Please choose a course' }),
  note: z.string().max(500, { message: 'Please keep this under 500 characters' }).optional(),
  honeypot: z.string().max(0).optional(),
});

/* Stagger for the form rows — the whole entrance stays inside ~500ms. */
const listVariants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.045, delayChildren: 0.1 } },
};
const rowVariants = {
  hidden: { opacity: 0, y: 12 },
  show: { opacity: 1, y: 0, transition: { duration: 0.34, ease: [0.16, 1, 0.3, 1] } },
};

export const EnrollmentModal = () => {
  const { isEnrollOpen, selectedCourseForEnroll, closeEnrollModal, showToast } = useModal();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submittedData, setSubmittedData] = useState(null);
  const [serverError, setServerError] = useState(null);

  const isMobile = useMediaQuery('(max-width: 639px)');
  const panelRef = useRef(null);
  const firstFieldRef = useRef(null);

  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(enrollmentSchema),
    mode: 'onBlur',
    defaultValues: { fullName: '', email: '', phone: '', course: '', note: '', honeypot: '' },
  });

  const { ref: nameFieldRef, ...nameField } = register('fullName');

  useEffect(() => {
    if (isEnrollOpen && selectedCourseForEnroll) setValue('course', selectedCourseForEnroll);
  }, [selectedCourseForEnroll, setValue, isEnrollOpen]);

  const handleClose = useCallback(() => {
    closeEnrollModal();
    // Reset only after the exit animation, so fields don't blank out mid-flight.
    window.setTimeout(() => {
      setIsSubmitted(false);
      setServerError(null);
      reset();
    }, 320);
  }, [closeEnrollModal, reset]);

  // Scroll lock + Escape + focus management
  useEffect(() => {
    if (!isEnrollOpen) return;

    lockScroll(true);
    document.body.style.overflow = 'hidden';

    const onKeyDown = (e) => {
      if (e.key === 'Escape') {
        handleClose();
        return;
      }
      // Keep focus inside the dialog.
      if (e.key === 'Tab' && panelRef.current) {
        const focusables = panelRef.current.querySelectorAll(
          'a[href], button:not([disabled]), input:not([type="hidden"]), select, textarea, [tabindex]:not([tabindex="-1"])'
        );
        if (!focusables.length) return;
        const first = focusables[0];
        const last = focusables[focusables.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };

    window.addEventListener('keydown', onKeyDown);
    const focusTimer = window.setTimeout(() => firstFieldRef.current?.focus(), 420);

    return () => {
      lockScroll(false);
      document.body.style.overflow = '';
      window.removeEventListener('keydown', onKeyDown);
      window.clearTimeout(focusTimer);
    };
  }, [isEnrollOpen, handleClose]);

  const onSubmit = async (data) => {
    if (data.honeypot) return;

    setIsSubmitting(true);
    setServerError(null);

    try {
      const response = await fetch('/api/enrollment', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          fullName: data.fullName,
          email: data.email,
          phone: data.phone,
          course: data.course,
          note: data.note || 'None',
          timestamp: new Date().toISOString(),
        }),
      });

      if (!response.ok) throw new Error(`Request failed (${response.status})`);
      await response.json().catch(() => ({}));

      setSubmittedData(data);
      setIsSubmitted(true);
      showToast('Registration confirmed! Check your email for the demo link.', 'success');
    } catch {
      // The lead is still captured client-side; surface a recoverable error
      // rather than silently pretending the request succeeded.
      setServerError(
        "We couldn't reach the server. Please retry, or email admissions@learnpro.edu and we'll reserve your seat."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const panelMotion = isMobile
    ? {
        initial: { y: '100%' },
        animate: { y: 0 },
        exit: { y: '100%' },
        transition: { type: 'spring', damping: 32, stiffness: 340, mass: 0.8 },
      }
    : {
        initial: { opacity: 0, scale: 0.955, y: 18 },
        animate: { opacity: 1, scale: 1, y: 0 },
        exit: { opacity: 0, scale: 0.97, y: 10 },
        transition: { duration: 0.42, ease: [0.16, 1, 0.3, 1] },
      };

  return (
    <AnimatePresence>
      {isEnrollOpen && (
        <div
          className="fixed inset-0 z-[70] flex sm:items-center sm:justify-center items-end sm:p-5"
          role="dialog"
          aria-modal="true"
          aria-labelledby="enroll-title"
        >
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.28 }}
            onClick={handleClose}
            className="absolute inset-0 bg-[#04070F]/70 backdrop-blur-md"
          />

          {/* Panel.
              Height is capped by dvh (not vh) so mobile browser chrome can never
              push the submit button below the fold. The body scrolls internally
              while the header and footer stay pinned. */}
          <motion.div
            ref={panelRef}
            {...panelMotion}
            className="relative w-full sm:max-w-[480px] flex flex-col
                       max-h-[92dvh] sm:max-h-[88dvh]
                       rounded-t-3xl sm:rounded-2xl overflow-hidden
                       glass-panel-glow border-accent/30 shadow-elev-3"
          >
            {isSubmitted && submittedData ? (
              <div className="overflow-y-auto custom-modal-scroll">
                <ConfettiSuccess
                  studentName={submittedData.fullName}
                  courseName={submittedData.course}
                  onClose={handleClose}
                />
              </div>
            ) : (
              <>
                {/* Mobile grab handle */}
                <div className="sm:hidden pt-2.5 pb-1 flex justify-center shrink-0">
                  <div className="w-9 h-1 rounded-full bg-line-strong" />
                </div>

                {/* ---------- Header (pinned) ---------- */}
                <header className="shrink-0 px-5 pt-3 sm:pt-5 pb-3 border-b border-line relative">
                  <button
                    onClick={handleClose}
                    aria-label="Close"
                    className="absolute top-3 sm:top-4 right-4 p-1.5 rounded-lg text-ink-muted
                               hover:text-ink hover:bg-accent-soft active:scale-90
                               transition-all duration-200 cursor-pointer"
                  >
                    <X className="w-4 h-4" />
                  </button>

                  <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-[10px] font-bold
                                   bg-accent-soft text-accent border border-accent/30">
                    <Sparkles className="w-2.5 h-2.5" />
                    FREE 3-DAY LIVE DEMO
                  </span>

                  <h2 id="enroll-title" className="font-display text-[19px] font-bold text-ink mt-2 leading-tight pr-8">
                    Book Your Demo Class
                  </h2>
                  <p className="text-[12px] text-ink-muted mt-0.5 leading-snug">
                    No payment required. Learn live with senior Microsoft &amp; Cisco mentors.
                  </p>
                </header>

                {/* ---------- Scrollable body ---------- */}
                <form
                  id="enrollment-form"
                  onSubmit={handleSubmit(onSubmit)}
                  className="flex-1 min-h-0 overflow-y-auto custom-modal-scroll px-5 py-4"
                >
                  <input type="text" {...register('honeypot')} className="hidden" tabIndex={-1} autoComplete="off" aria-hidden />

                  <motion.div variants={listVariants} initial="hidden" animate="show" className="space-y-3">
                    <motion.div variants={rowVariants}>
                      <Field label="Full Name" error={errors.fullName} icon={User} required>
                        <input
                          type="text"
                          autoComplete="name"
                          placeholder="e.g. Aditya Sharma"
                          aria-invalid={!!errors.fullName}
                          {...nameField}
                          ref={(el) => {
                            nameFieldRef(el);
                            firstFieldRef.current = el;
                          }}
                          className={inputCls}
                        />
                      </Field>
                    </motion.div>

                    <motion.div variants={rowVariants}>
                      <Field label="Email Address" error={errors.email} icon={Mail} required>
                        <input
                          type="email"
                          autoComplete="email"
                          inputMode="email"
                          placeholder="you@example.com"
                          aria-invalid={!!errors.email}
                          {...register('email')}
                          className={inputCls}
                        />
                      </Field>
                    </motion.div>

                    <motion.div variants={rowVariants}>
                      <Field label="Phone Number" error={errors.phone} icon={Phone} required>
                        <input
                          type="tel"
                          autoComplete="tel"
                          inputMode="tel"
                          placeholder="+91 98765 43210"
                          aria-invalid={!!errors.phone}
                          {...register('phone')}
                          className={inputCls}
                        />
                      </Field>
                    </motion.div>

                    <motion.div variants={rowVariants}>
                      <Field label="Course" error={errors.course} icon={BookOpen} required>
                        <select
                          aria-invalid={!!errors.course}
                          {...register('course')}
                          className={`${inputCls} appearance-none cursor-pointer pr-8`}
                        >
                          <option value="">Select a course…</option>
                          {courses.map((c) => (
                            <option key={c.id} value={c.title}>
                              {c.title}
                            </option>
                          ))}
                        </select>
                        <svg
                          className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-ink-soft"
                          viewBox="0 0 12 12" fill="none" aria-hidden
                        >
                          <path d="M3 4.5 6 7.5 9 4.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      </Field>
                    </motion.div>

                    <motion.div variants={rowVariants}>
                      <Field label="Note" error={errors.note} icon={MessageSquare} optional>
                        <textarea
                          rows={2}
                          placeholder="Any question about schedule or prerequisites?"
                          aria-invalid={!!errors.note}
                          {...register('note')}
                          className={`${inputCls} resize-none pt-2`}
                        />
                      </Field>
                    </motion.div>

                    {serverError && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        className="flex items-start gap-2 p-2.5 rounded-lg bg-rose-500/10 border border-rose-500/30"
                        role="alert"
                      >
                        <AlertCircle className="w-3.5 h-3.5 text-rose-400 shrink-0 mt-px" />
                        <p className="text-[11px] text-rose-300 leading-snug">{serverError}</p>
                      </motion.div>
                    )}
                  </motion.div>
                </form>

                {/* ---------- Footer (pinned — always visible) ---------- */}
                <footer className="shrink-0 px-5 py-3.5 border-t border-line bg-[var(--glass-glow-bg)]">
                  <button
                    type="submit"
                    form="enrollment-form"
                    disabled={isSubmitting}
                    className="btn-gradient btn-shine w-full py-3 rounded-xl text-[13px] font-bold text-[#04101F]
                               shadow-glow-cyan hover:shadow-glow-mixed
                               active:scale-[0.985] transition-transform duration-200
                               disabled:opacity-70 disabled:cursor-not-allowed
                               flex items-center justify-center gap-2 cursor-pointer"
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" />
                        <span>Reserving your seat…</span>
                      </>
                    ) : (
                      <>
                        <Sparkles className="w-4 h-4" />
                        <span>Confirm Free Demo Pass</span>
                      </>
                    )}
                  </button>

                  <p className="flex items-center justify-center gap-1.5 text-[10px] text-ink-soft mt-2">
                    <ShieldCheck className="w-3 h-3 text-emerald-500 shrink-0" />
                    100% private • No credit card • Instant email confirmation
                  </p>
                </footer>
              </>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

const inputCls =
  'w-full pl-9 pr-3 py-2.5 rounded-lg glass-input text-[13px] font-medium';

/** Labelled field with icon, error slot and animated validation feedback. */
function Field({ label, error, icon: Icon, required, optional, children }) {
  return (
    <div>
      <label className="flex items-center gap-1 text-[11px] font-semibold text-ink-muted mb-1">
        {label}
        {required && <span className="text-rose-400">*</span>}
        {optional && <span className="text-ink-soft font-normal">(optional)</span>}
      </label>

      <div className="relative">
        <Icon className="absolute left-3 top-[13px] w-3.5 h-3.5 text-ink-soft pointer-events-none z-10" />
        {children}
      </div>

      <AnimatePresence>
        {error && (
          <motion.p
            initial={{ opacity: 0, y: -4, height: 0 }}
            animate={{ opacity: 1, y: 0, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="text-[10.5px] font-medium text-rose-400 mt-1"
          >
            {error.message}
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  );
}
