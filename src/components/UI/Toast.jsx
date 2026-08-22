import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle2, AlertCircle, Info, X } from 'lucide-react';
import { useModal } from '../../context/ModalContext';

const TONES = {
  success: {
    Icon: CheckCircle2,
    icon: 'text-emerald-400',
    ring: 'border-emerald-500/35',
    glow: '0 0 28px -8px rgba(16,185,129,0.45)',
  },
  error: {
    Icon: AlertCircle,
    icon: 'text-rose-400',
    ring: 'border-rose-500/35',
    glow: '0 0 28px -8px rgba(244,63,94,0.45)',
  },
  info: {
    Icon: Info,
    icon: 'text-accent',
    ring: 'border-accent/35',
    glow: '0 0 28px -8px rgba(0,229,255,0.45)',
  },
};

export const Toast = () => {
  const { toast, dismissToast } = useModal();
  const tone = TONES[toast?.type] || TONES.info;
  const { Icon } = tone;

  return (
    <div className="fixed bottom-5 right-5 left-5 sm:left-auto z-[80] flex justify-end pointer-events-none">
      <AnimatePresence>
        {toast && (
          <motion.div
            key={toast.id}
            initial={{ opacity: 0, y: 16, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.96 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            role="status"
            aria-live="polite"
            className={`pointer-events-auto flex items-start gap-3 max-w-sm w-full sm:w-auto
                        px-4 py-3 rounded-xl glass-panel-glow ${tone.ring}`}
            style={{ boxShadow: `var(--shadow-2), ${tone.glow}` }}
          >
            <Icon className={`w-4.5 h-4.5 w-[18px] h-[18px] shrink-0 mt-px ${tone.icon}`} />
            <p className="flex-1 text-[12.5px] font-medium text-ink leading-snug">{toast.message}</p>
            <button
              onClick={dismissToast}
              aria-label="Dismiss notification"
              className="shrink-0 p-0.5 rounded text-ink-soft hover:text-ink transition-colors cursor-pointer"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
