import React, { memo } from 'react';
import { useTheme } from '../../context/ThemeContext';

/**
 * Sun/moon toggle. The icon morphs by sliding a "shadow" disc across the sun
 * to carve out a crescent — one transform per element, no icon swap, so the
 * change reads as a single continuous motion rather than a flash.
 */
export const ThemeToggle = memo(function ThemeToggle({ className = '' }) {
  const { isDark, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      role="switch"
      aria-checked={isDark}
      aria-label={`Switch to ${isDark ? 'light' : 'dark'} mode`}
      title={`Switch to ${isDark ? 'light' : 'dark'} mode`}
      className={`theme-toggle relative w-9 h-9 rounded-xl grid place-items-center
                  border border-line-strong bg-[var(--surface-100)]
                  hover:border-accent/50 active:scale-90
                  transition-[transform,border-color,background-color] duration-200
                  cursor-pointer overflow-hidden ${className}`}
      data-dark={isDark}
    >
      {/* Rays — retract in dark mode */}
      <span className="theme-rays absolute inset-0 grid place-items-center">
        {Array.from({ length: 8 }).map((_, i) => (
          <span
            key={i}
            className="absolute w-[1.5px] h-[3.5px] rounded-full bg-amber-500"
            style={{ transform: `rotate(${i * 45}deg) translateY(-9px)` }}
          />
        ))}
      </span>

      {/* Disc */}
      <span className="theme-disc relative w-[15px] h-[15px] rounded-full" />
    </button>
  );
});
