import React, { useState, useEffect, useRef, useCallback, memo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Menu, X, ArrowRight, BookOpen } from 'lucide-react';
import { siteConfig } from '../data/siteConfig';
import { useModal } from '../context/ModalContext';
import { ThemeToggle } from './UI/ThemeToggle';
import { onFrame, scrollToTarget, lockScroll } from '../lib/smoothScroll';
import { TechLogo } from './TechLogo';

export const Navbar = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const { openEnrollModal } = useModal();

  const headerRef = useRef(null);
  const progressRef = useRef(null);
  const scrolledRef = useRef(false);

  /**
   * Scroll state and reading-progress are written straight to the DOM from the
   * shared frame loop. No scroll listener, and no setState — the navbar never
   * re-renders while the user scrolls the page.
   */
  useEffect(() => {
    return onFrame(() => {
      const y = window.scrollY;

      const isScrolled = y > 12;
      if (isScrolled !== scrolledRef.current) {
        scrolledRef.current = isScrolled;
        headerRef.current?.setAttribute('data-scrolled', String(isScrolled));
      }

      if (progressRef.current) {
        const max = document.documentElement.scrollHeight - window.innerHeight;
        const p = max > 0 ? Math.min(1, y / max) : 0;
        progressRef.current.style.transform = `scaleX(${p.toFixed(4)})`;
      }
    });
  }, []);

  useEffect(() => {
    lockScroll(mobileOpen);
    return () => lockScroll(false);
  }, [mobileOpen]);

  const handleNavClick = useCallback((e, href) => {
    e.preventDefault();
    setMobileOpen(false);
    scrollToTarget(href);
  }, []);

  return (
    <>
      <header
        ref={headerRef}
        data-scrolled="false"
        className="nav-shell fixed top-0 inset-x-0 z-50"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="nav-bar flex items-center justify-between gap-4">
            {/* ---------- Logo ---------- */}
            <a
              href="#hero"
              onClick={(e) => handleNavClick(e, '#hero')}
              aria-label={`${siteConfig.brand.name} — home`}
              className="group shrink-0 flex items-center rounded-xl focus-visible:outline-accent"
            >
              <span
                className="logo-plate relative flex items-center rounded-xl px-1.5 sm:px-2 py-1.5
                           transition-transform duration-300 ease-out-expo
                           group-hover:-translate-y-px"
              >
                <TechLogo className="h-[26px] sm:h-[30px] w-auto" />
              </span>
            </a>

            {/* ---------- Desktop nav ---------- */}
            <nav className="hidden lg:flex items-center gap-0.5 p-1 rounded-full glass-panel">
              {siteConfig.navigation.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  onClick={(e) => handleNavClick(e, item.href)}
                  className="relative px-3 py-1.5 rounded-full text-[12.5px] font-medium text-ink-muted
                             hover:text-ink transition-colors duration-200
                             after:absolute after:inset-0 after:rounded-full after:bg-accent-soft
                             after:opacity-0 hover:after:opacity-100 after:transition-opacity after:duration-200 after:-z-10"
                >
                  {item.name}
                </a>
              ))}
            </nav>

            {/* ---------- Actions ---------- */}
            <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
              <ThemeToggle />

              {/* Highlighted Explore Courses Button */}
              <a
                href="#courses"
                onClick={(e) => handleNavClick(e, '#courses')}
                className="btn-gradient btn-shine group hidden sm:inline-flex items-center gap-1.5
                           px-3.5 sm:px-4 py-1.5 sm:py-2 rounded-xl text-[11.5px] sm:text-[12px] font-bold text-white
                           shadow-glow-blue hover:shadow-glow-mixed
                           hover:-translate-y-0.5 active:translate-y-0 active:scale-[0.97]
                           transition-[transform,box-shadow,background-position] duration-300 ease-out-expo
                           cursor-pointer"
              >
                <BookOpen className="w-3.5 h-3.5" />
                <span>Explore Courses</span>
                <ArrowRight className="hidden md:inline w-3 h-3 transition-transform duration-300 group-hover:translate-x-0.5" />
              </a>

              {/* Compact / Chota Book Free Demo Button */}
              <button
                onClick={() => openEnrollModal('')}
                className="inline-flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 sm:py-2 rounded-xl
                           text-[11px] sm:text-[11.5px] font-semibold text-ink border border-line-strong
                           bg-[var(--surface-100)] hover:text-accent hover:border-accent/40 hover:bg-accent-soft
                           hover:-translate-y-0.5 active:translate-y-0 active:scale-[0.97]
                           transition-all duration-200 cursor-pointer"
              >
                <Sparkles className="w-3 h-3 text-accent" />
                <span className="hidden md:inline">Book Demo</span>
                <span className="md:hidden">Demo</span>
              </button>

              <button
                onClick={() => setMobileOpen((v) => !v)}
                aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
                aria-expanded={mobileOpen}
                className="lg:hidden p-1.5 sm:p-2 rounded-xl border border-line-strong bg-[var(--surface-100)]
                           text-ink hover:border-accent/50 active:scale-90
                           transition-all duration-200 cursor-pointer"
              >
                {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
          </div>
        </div>

        {/* Reading progress */}
        <div className="absolute bottom-0 inset-x-0 h-[2px] overflow-hidden pointer-events-none">
          <div
            ref={progressRef}
            className="h-full origin-left bg-gradient-to-r from-brand-blue to-brand-indigo"
            style={{ transform: 'scaleX(0)', willChange: 'transform' }}
          />
        </div>
      </header>

      {/* ---------- Mobile drawer ---------- */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.24 }}
              onClick={() => setMobileOpen(false)}
              className="fixed inset-0 z-40 bg-[#0B0F1A]/60 backdrop-blur-sm lg:hidden"
            />

            <motion.nav
              initial={{ opacity: 0, y: -12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
              className="fixed top-[72px] inset-x-4 z-50 lg:hidden
                         rounded-2xl glass-panel-glow p-4 shadow-elev-3"
            >
              <div className="grid grid-cols-2 gap-1.5">
                {siteConfig.navigation.map((item) => (
                  <a
                    key={item.name}
                    href={item.href}
                    onClick={(e) => handleNavClick(e, item.href)}
                    className="px-3 py-2.5 rounded-xl text-[13px] font-medium text-ink-muted
                               hover:text-ink hover:bg-accent-soft active:scale-[0.97]
                               transition-all duration-200"
                  >
                    {item.name}
                  </a>
                ))}
              </div>

              <div className="grid grid-cols-2 gap-2 mt-3">
                <a
                  href="#courses"
                  onClick={(e) => handleNavClick(e, '#courses')}
                  className="btn-gradient btn-shine py-2.5 rounded-xl text-[12px] font-bold
                             text-white shadow-glow-blue active:scale-[0.98]
                             transition-transform duration-200 cursor-pointer
                             inline-flex items-center justify-center gap-1.5"
                >
                  <BookOpen className="w-3.5 h-3.5" />
                  Explore Courses
                </a>

                <button
                  onClick={() => {
                    setMobileOpen(false);
                    openEnrollModal('');
                  }}
                  className="py-2.5 rounded-xl text-[12px] font-semibold text-ink
                             border border-line-strong bg-[var(--surface-100)]
                             active:scale-[0.98] transition-transform duration-200
                             inline-flex items-center justify-center gap-1.5"
                >
                  <Sparkles className="w-3 h-3 text-accent" />
                  Book Demo
                </button>
              </div>
            </motion.nav>
          </>
        )}
      </AnimatePresence>
    </>
  );
};
