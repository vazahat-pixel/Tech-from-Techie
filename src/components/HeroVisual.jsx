import React, { memo } from 'react';
import { ShieldCheck, Users, Video } from 'lucide-react';

/**
 * Hero visual — a real photograph instead of a WebGL scene.
 *
 * Deliberately static: no canvas, no render loop, no per-frame JavaScript.
 * The only motion is a CSS opacity/transform fade that runs once on load and
 * then stops, so the hero costs nothing while the user scrolls.
 */
export const HeroVisual = memo(function HeroVisual() {
  return (
    <div className="relative w-full">
      {/* Soft colour wash behind the photo */}
      <div
        aria-hidden
        className="absolute -inset-6 rounded-[2rem] blur-3xl opacity-60 pointer-events-none
                   bg-[radial-gradient(circle_at_50%_40%,var(--spot),transparent_70%)]"
      />

      <div className="relative rounded-2xl overflow-hidden border border-line shadow-elev-3">
        <img
          src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=1200&auto=format&fit=crop&q=80"
          alt="Students learning together in a modern technology classroom"
          width={1200}
          height={800}
          fetchPriority="high"
          decoding="async"
          className="w-full h-[300px] sm:h-[380px] lg:h-[460px] object-cover"
        />

        {/* Readability scrim for the overlaid chips */}
        <div
          aria-hidden
          className="absolute inset-0 bg-gradient-to-t from-[#050A18]/85 via-[#050A18]/20 to-[#050A18]/25"
        />

        {/* Live badge */}
        <div className="absolute top-3.5 left-3.5 inline-flex items-center gap-2 px-2.5 py-1.5
                        rounded-lg bg-[#070C1B]/80 border border-white/15 backdrop-blur-sm">
          <span className="relative flex w-1.5 h-1.5">
            <span className="absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
            <span className="relative inline-flex rounded-full w-1.5 h-1.5 bg-emerald-400" />
          </span>
          <span className="text-[11px] font-semibold text-white">Live Interactive Classes</span>
        </div>

        {/* Stat chips along the bottom */}
        <div className="absolute bottom-3.5 inset-x-3.5 grid grid-cols-3 gap-2">
          {[
            { Icon: Users, value: '10,000+', label: 'Learners' },
            { Icon: Video, value: '100%', label: 'Live Classes' },
            { Icon: ShieldCheck, value: '15+ Yrs', label: 'Mentors' },
          ].map(({ Icon, value, label }) => (
            <div
              key={label}
              className="rounded-lg bg-[#070C1B]/75 border border-white/12 backdrop-blur-sm px-2.5 py-2"
            >
              <Icon className="w-3.5 h-3.5 text-[#5FE9FF]" />
              <p className="text-[13px] font-bold text-white leading-none mt-1.5">{value}</p>
              <p className="text-[10px] text-white/65 leading-none mt-1">{label}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
});
