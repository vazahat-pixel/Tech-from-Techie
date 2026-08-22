import React, { useState, useEffect, useRef, useCallback, memo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Menu, X, ArrowRight } from 'lucide-react';
import { siteConfig } from '../data/siteConfig';
import { useModal } from '../context/ModalContext';
import { ThemeToggle } from './UI/ThemeToggle';
import { onFrame, scrollToTarget, lockScroll } from '../lib/smoothScroll';
import logoUrl from '../Tech Logo.svg';

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
              {/* The supplied mark is a white wordmark, so it sits on a dark
                  plate that stays constant across both themes — this keeps the
                  brand legible without ever recolouring or distorting the art. */}
              <span
                className="logo-plate relative flex items-center rounded-xl px-3 py-2
                           transition-[transform,box-shadow,border-color] duration-300 ease-out-expo
                           group-hover:-translate-y-px group-hover:shadow-glow-cyan"
              >
                <img
                  src={logoUrl}
                  alt={siteConfig.brand.name}
                  width={200}
                  height={40}
                  className="h-[26px] sm:h-[30px] w-auto object-contain"
                />
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
            <div className="flex items-center gap-2 shrink-0">
              <ThemeToggle />

              <button
                onClick={() => openEnrollModal('')}
                className="btn-gradient btn-shine group inline-flex items-center gap-2
                           px-3 sm:px-4 py-2 sm:py-2.5 rounded-xl text-[11.5px] sm:text-[12.5px] font-bold text-[#04101F]
                           shadow-glow-cyan hover:shadow-glow-mixed
                           hover:-translate-y-0.5 active:translate-y-0 active:scale-[0.97]
                           transition-[transform,box-shadow,background-position] duration-300 ease-out-expo
                           cursor-pointer"
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span className="hidden md:inline">Get 3 Days Free Demo</span>
                <span className="md:hidden">Free Demo</span>
                <ArrowRight className="hidden sm:block w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-1" />
              </button>

              <button
                onClick={() => setMobileOpen((v) => !v)}
                aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
                aria-expanded={mobileOpen}
                className="lg:hidden p-2 rounded-xl border border-line-strong bg-[var(--surface-100)]
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
            className="h-full origin-left bg-gradient-to-r from-brand-cyan via-brand-blue to-brand-purple"
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
              className="fixed inset-0 z-40 bg-[#04070F]/60 backdrop-blur-sm lg:hidden"
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

              <button
                onClick={() => {
                  setMobileOpen(false);
                  openEnrollModal('');
                }}
                className="btn-gradient btn-shine w-full mt-3 py-3 rounded-xl text-[13px] font-bold
                           text-[#04101F] shadow-glow-cyan active:scale-[0.98]
                           transition-transform duration-200 cursor-pointer
                           inline-flex items-center justify-center gap-2"
              >
                <Sparkles className="w-4 h-4" />
                Book Free 3-Day Demo
              </button>
            </motion.nav>
          </>
        )}
      </AnimatePresence>
    </>
  );
};
