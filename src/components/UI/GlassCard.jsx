import React, { memo } from 'react';

/**
 * Simple elevated card.
 *
 * The cursor-tilt version was removed: it ran a rAF loop and a
 * getBoundingClientRect per pointer move for every card on screen. Hover now
 * changes only border and shadow, which stays entirely on the compositor.
 */
export const GlassCard = memo(function GlassCard({
  children,
  className = '',
  glow = 'cyan',
  surface = 'solid',
  onClick,
  ...props
}) {
  const hoverBorder =
    glow === 'purple'
      ? 'hover:border-indigo-500/40'
      : glow === 'mixed'
        ? 'hover:border-brand-blue/40'
        : 'hover:border-accent/40';

  return (
    <div
      onClick={onClick}
      className={`relative h-full rounded-2xl overflow-hidden flex flex-col
                  ${surface === 'glass' ? 'glass-panel' : 'solid-card'}
                  ${hoverBorder} hover:shadow-elev-2
                  transition-[box-shadow,border-color] duration-200
                  ${className}`}
      {...props}
    >
      {children}
    </div>
  );
});
