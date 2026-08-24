/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        background: 'var(--bg-main)',
        surface: {
          50: 'var(--surface-50)',
          100: 'var(--surface-100)',
          200: 'var(--surface-200)',
          300: 'var(--surface-300)',
          400: 'var(--surface-400)',
        },
        // Semantic, theme-aware tokens. Prefer these over dark:/light: pairs.
        ink: {
          DEFAULT: 'var(--text-main)',
          muted: 'var(--text-muted)',
          soft: 'var(--text-soft)',
        },
        line: {
          DEFAULT: 'var(--border-main)',
          strong: 'var(--border-strong)',
        },
        accent: {
          DEFAULT: 'var(--accent)',
          soft: 'var(--accent-soft)',
          contrast: 'var(--accent-contrast)',
        },
        // Professional 2-tone brand palette: Blue + Indigo
        brand: {
          blue: '#2563EB',
          indigo: '#4338CA',
          purple: '#6D28D9',
          cyan: '#60A5FA',
        },
      },
      fontFamily: {
        sans: ['"Plus Jakarta Sans"', 'Inter', 'system-ui', '-apple-system', 'sans-serif'],
        display: ['"Sora"', '"Plus Jakarta Sans"', 'system-ui', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'ui-monospace', 'monospace'],
      },
      fontSize: {
        // Tuned pairs: size + line-height + tracking
        'display-xl': ['clamp(2.5rem, 5.2vw, 4.5rem)', { lineHeight: '1.04', letterSpacing: '-0.035em', fontWeight: '700' }],
        'display-lg': ['clamp(2rem, 4vw, 3.25rem)', { lineHeight: '1.08', letterSpacing: '-0.03em', fontWeight: '700' }],
        'display-md': ['clamp(1.6rem, 2.8vw, 2.35rem)', { lineHeight: '1.15', letterSpacing: '-0.024em', fontWeight: '700' }],
        'display-sm': ['clamp(1.25rem, 2vw, 1.6rem)', { lineHeight: '1.2', letterSpacing: '-0.018em', fontWeight: '600' }],
        'body-lg': ['1.0625rem', { lineHeight: '1.65', letterSpacing: '-0.005em' }],
        'body': ['0.9375rem', { lineHeight: '1.65' }],
        'body-sm': ['0.8125rem', { lineHeight: '1.6' }],
        'meta': ['0.6875rem', { lineHeight: '1.45', letterSpacing: '0.02em' }],
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'blue-indigo': 'linear-gradient(135deg, #2563EB 0%, #4338CA 100%)',
      },
      boxShadow: {
        'glow-blue': '0 0 28px -6px rgba(37, 99, 235, 0.32)',
        'glow-indigo': '0 0 28px -6px rgba(67, 56, 202, 0.32)',
        'glow-mixed': '0 0 36px -10px rgba(37, 99, 235, 0.28), 0 0 56px -16px rgba(67, 56, 202, 0.22)',
        'glow-cyan': '0 0 28px -6px rgba(96, 165, 250, 0.32)',
        'elev-1': 'var(--shadow-1)',
        'elev-2': 'var(--shadow-2)',
        'elev-3': 'var(--shadow-3)',
      },
      transitionTimingFunction: {
        'out-expo': 'cubic-bezier(0.16, 1, 0.3, 1)',
        'spring': 'cubic-bezier(0.34, 1.56, 0.64, 1)',
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'float-delayed': 'float 6s ease-in-out 3s infinite',
        'shimmer': 'shimmer 2.5s infinite',
        'spin-slow': 'spin 22s linear infinite',
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translate3d(0, 0, 0)' },
          '50%': { transform: 'translate3d(0, -10px, 0)' },
        },
        shimmer: {
          '100%': { transform: 'translateX(100%)' },
        },
      },
    },
  },
  plugins: [],
}
