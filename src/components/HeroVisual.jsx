import React, { memo, useState, useEffect, useCallback } from 'react';
import { ShieldCheck, Users, Video } from 'lucide-react';

/**
 * Hero visual — auto-transitioning student photo carousel.
 *
 * Shows B.Tech-age students in a classroom/study setting.
 * Images crossfade automatically every 2.5 seconds with a smooth CSS transition.
 */

const STUDENT_IMAGES = [
  {
    src: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=1200&auto=format&fit=crop&q=80',
    alt: 'Group of young engineering students collaborating on a project',
  },
  {
    src: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=1200&auto=format&fit=crop&q=80',
    alt: 'Students learning together in a modern technology classroom',
  },
  {
    src: 'https://images.unsplash.com/photo-1531482615713-2afd69097998?w=1200&auto=format&fit=crop&q=80',
    alt: 'Young tech students working on laptops during a workshop',
  },
  {
    src: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=1200&auto=format&fit=crop&q=80',
    alt: 'College students in a coding bootcamp session',
  },
  {
    src: 'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=1200&auto=format&fit=crop&q=80',
    alt: 'Students attending a live lecture in a modern classroom',
  },
  {
    src: 'https://images.unsplash.com/photo-1515378960530-7c0da6231fb1?w=1200&auto=format&fit=crop&q=80',
    alt: 'Young developer working on code at a laptop',
  },
  {
    src: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=1200&auto=format&fit=crop&q=80',
    alt: 'Student coding on a laptop with multiple monitors',
  },
  {
    src: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=1200&auto=format&fit=crop&q=80',
    alt: 'Team of young professionals brainstorming in a meeting',
  },
];

const INTERVAL_MS = 50; // ultra-fast auto-transition every 50ms

export const HeroVisual = memo(function HeroVisual() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const nextSlide = useCallback(() => {
    setActiveIndex((prev) => (prev + 1) % STUDENT_IMAGES.length);
  }, []);

  useEffect(() => {
    if (isPaused) return;
    const timer = setInterval(nextSlide, INTERVAL_MS);
    return () => clearInterval(timer);
  }, [nextSlide, isPaused]);

  return (
    <div
      className="relative w-full"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* Soft colour wash behind the photo */}
      <div
        aria-hidden
        className="absolute -inset-6 rounded-[2rem] blur-3xl opacity-60 pointer-events-none
                   bg-[radial-gradient(circle_at_50%_40%,var(--spot),transparent_70%)]"
      />

      <div className="relative rounded-2xl overflow-hidden border border-line shadow-elev-3">
        {/* Image stack — all images rendered, only active one is visible */}
        <div className="relative w-full h-[300px] sm:h-[380px] lg:h-[460px]">
          {STUDENT_IMAGES.map((img, i) => (
            <img
              key={i}
              src={img.src}
              alt={img.alt}
              width={1200}
              height={800}
              loading={i === 0 ? 'eager' : 'lazy'}
              fetchPriority={i === 0 ? 'high' : 'auto'}
              decoding="async"
              className="absolute inset-0 w-full h-full object-cover transition-opacity duration-[50ms] ease-linear"
              style={{
                opacity: i === activeIndex ? 1 : 0,
                zIndex: i === activeIndex ? 2 : 1,
              }}
            />
          ))}
        </div>

        {/* Readability scrim for the overlaid chips */}
        <div
          aria-hidden
          className="absolute inset-0 bg-gradient-to-t from-[#050A18]/85 via-[#050A18]/20 to-[#050A18]/25 z-[3]"
        />

        {/* Live badge */}
        <div className="absolute top-3.5 left-3.5 z-[4] inline-flex items-center gap-2 px-2.5 py-1.5
                        rounded-lg bg-[#070C1B]/80 border border-white/15 backdrop-blur-sm">
          <span className="relative flex w-1.5 h-1.5">
            <span className="absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75 animate-ping" />
            <span className="relative inline-flex rounded-full w-1.5 h-1.5 bg-emerald-400" />
          </span>
          <span className="text-[11px] font-semibold text-white">Live Interactive Classes</span>
        </div>

        {/* Progress dots */}
        <div className="absolute top-3.5 right-3.5 z-[4] flex items-center gap-1.5">
          {STUDENT_IMAGES.map((_, i) => (
            <button
              key={i}
              onClick={() => setActiveIndex(i)}
              aria-label={`Show image ${i + 1}`}
              className={`rounded-full transition-all duration-300 cursor-pointer
                ${i === activeIndex
                  ? 'w-5 h-1.5 bg-[#5FE9FF]'
                  : 'w-1.5 h-1.5 bg-white/40 hover:bg-white/70'
                }`}
            />
          ))}
        </div>

        {/* Stat chips along the bottom */}
        <div className="absolute bottom-3.5 inset-x-3.5 z-[4] grid grid-cols-3 gap-2">
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
