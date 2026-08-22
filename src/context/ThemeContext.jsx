import React, { createContext, useContext, useState, useEffect, useCallback, useMemo, useRef } from 'react';

const ThemeContext = createContext(null);

function readInitialTheme() {
  try {
    const saved = localStorage.getItem('learnpro-theme');
    if (saved === 'dark' || saved === 'light') return saved;
    if (window.matchMedia('(prefers-color-scheme: light)').matches) return 'light';
  } catch {
    /* storage unavailable — fall through to default */
  }
  return 'dark';
}

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState(readInitialTheme);
  const isFirstRun = useRef(true);

  useEffect(() => {
    const root = document.documentElement;
    root.classList.remove('dark', 'light');
    root.classList.add(theme);
    root.style.colorScheme = theme;

    try {
      localStorage.setItem('learnpro-theme', theme);
    } catch {
      /* ignore */
    }

    // Only crossfade on an actual user toggle. Doing it on mount would animate
    // the whole page from the wrong colours on first paint.
    if (isFirstRun.current) {
      isFirstRun.current = false;
      return;
    }

    root.classList.add('theme-transition');
    const timer = window.setTimeout(() => root.classList.remove('theme-transition'), 340);
    return () => window.clearTimeout(timer);
  }, [theme]);

  // Follow the OS only while the user hasn't expressed a preference.
  useEffect(() => {
    const mq = window.matchMedia('(prefers-color-scheme: light)');
    const onChange = (e) => {
      try {
        if (localStorage.getItem('learnpro-theme')) return;
      } catch {
        /* ignore */
      }
      setTheme(e.matches ? 'light' : 'dark');
    };
    mq.addEventListener('change', onChange);
    return () => mq.removeEventListener('change', onChange);
  }, []);

  const toggleTheme = useCallback(() => {
    setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'));
  }, []);

  const value = useMemo(
    () => ({ theme, toggleTheme, isDark: theme === 'dark' }),
    [theme, toggleTheme]
  );

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) throw new Error('useTheme must be used within a ThemeProvider');
  return context;
};
