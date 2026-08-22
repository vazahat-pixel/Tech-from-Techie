import React, { memo } from 'react';
import { Sparkles } from 'lucide-react';
import { useReveal } from '../../lib/useReveal';

/**
 * Consistent section header: eyebrow chip, display title, supporting line.
 * Reveals on scroll via the shared observer (no per-heading motion component).
 */
export const SectionHeading = memo(function SectionHeading({
  eyebrow,
  eyebrowIcon: Icon = Sparkles,
  title,
  subtitle,
  align = 'center',
  className = '',
}) {
  const ref = useReveal();
  const centered = align === 'center';

  return (
    <div
      ref={ref}
      data-reveal
      className={`${centered ? 'text-center mx-auto max-w-2xl' : 'max-w-2xl'} ${className}`}
    >
      {eyebrow && (
        <span
          className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full
                     text-[11px] font-semibold tracking-[0.02em]
                     bg-accent-soft text-accent border border-accent/25"
        >
          <Icon className="w-3 h-3" />
          {eyebrow}
        </span>
      )}

      <h2 className="font-display text-display-md text-ink mt-3.5 text-balance">
        {title}
      </h2>

      {subtitle && (
        <p className={`text-body text-ink-muted mt-3 text-pretty ${centered ? 'mx-auto' : ''} max-w-xl`}>
          {subtitle}
        </p>
      )}
    </div>
  );
});
