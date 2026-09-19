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
        // --- DYNAMIC THEME SUPPORT ---
        slate: {
          50:  'var(--slate-50)',
          100: 'var(--slate-100)',
          200: 'var(--slate-200)',
          300: 'var(--slate-300)',
          400: 'var(--slate-400)',
          500: 'var(--slate-500)',
          600: 'var(--slate-600)',
          700: 'var(--slate-700)',
          800: 'var(--slate-800)',
          900: 'var(--slate-900)',
          950: 'var(--slate-950)',
        },
        
        white: 'var(--theme-white)',
        black: 'var(--theme-black)',

        // Custom Variables
        base:     "var(--color-base)",
        surface:  "var(--color-surface)",
        elevated: "var(--color-elevated)",
        overlay:  "var(--color-overlay)",

        accent:   "var(--accent)",
        success:  "var(--color-success)",
        warning:  "var(--color-warning)",
        danger:   "var(--color-danger)",
        info:     "var(--color-info)",
      },
      fontFamily: {
        sans: ['Inter', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
        mono: ['JetBrains Mono', 'Fira Code', 'Consolas', 'monospace'],
      },
      boxShadow: {
        'elevation-sm': 'var(--shadow-sm)',
        'elevation-md': 'var(--shadow-md)',
        'elevation-lg': 'var(--shadow-lg)',
        'focus':        '0 0 0 3px var(--accent-muted)',
      },
      animation: {
        'pulse-subtle':   'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'spin-slow':      'spin 3s linear infinite',
        'fade-in':        'fadeIn 0.15s ease-out',
        'slide-in-right': 'slideInRight 0.22s cubic-bezier(0.16, 1, 0.3, 1)',
        'slide-up':       'slideUp 0.2s cubic-bezier(0.16, 1, 0.3, 1)',
      },
      keyframes: {
        fadeIn:        { '0%': { opacity: '0' },   '100%': { opacity: '1' } },
        slideInRight:  { '0%': { transform: 'translateX(100%)' }, '100%': { transform: 'translateX(0)' } },
        slideUp:       { '0%': { transform: 'translateY(8px)', opacity: '0' }, '100%': { transform: 'translateY(0)', opacity: '1' } },
      },
    },
  },
  plugins: [],
}
