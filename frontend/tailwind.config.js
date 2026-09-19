/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class', // Disable auto dark mode
  theme: {
    extend: {
      colors: {
        // --- LIGHT MODE THEME INVERSION ---
        // By inverting 'slate', all existing dark mode text classes (like text-slate-100)
        // automatically become dark charcoal text, creating a perfect light mode 
        // without rewriting 200+ class names across components!
        slate: {
          50: '#0f172a',  // Inverted: Was slate-950, now slate-100
          100: '#1e293b', // Primary Text (was white, now slate-800)
          200: '#334155', // Secondary Text
          300: '#475569', 
          400: '#64748b', // Muted Text
          500: '#94a3b8',
          600: '#cbd5e1',
          700: '#e2e8f0',
          800: '#f1f5f9',
          900: '#f8fafc',
          950: '#ffffff',
        },
        
        // Invert white/black so borders/hovers (bg-white/5) become subtle black overlays (bg-black/5)
        white: '#000000', 
        black: '#ffffff',

        // ── Bright Aesthetic Theme (Sky Blue / Cyan) ──
        base:     "#F8FAFC",   // Bright slate-50 background
        surface:  "#FFFFFF",   // Pure white cards
        elevated: "#FFFFFF",   // Pure white elevated cards
        overlay:  "#F1F5F9",   // Hover overlay (slate-100)

        // Vibrant Sky Blue accent!
        accent: "#0ea5e9",     // sky-500
        
        success: "#10b981",    // emerald-500
        warning: "#f59e0b",    // amber-500
        danger:  "#ef4444",    // red-500
        info:    "#3b82f6",    // blue-500
      },
      fontFamily: {
        sans: ['Inter', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
        mono: ['JetBrains Mono', 'Fira Code', 'Consolas', 'monospace'],
      },
      boxShadow: {
        'elevation-sm': '0 1px 2px rgba(0,0,0,0.05)',
        'elevation-md': '0 4px 6px -1px rgba(0,0,0,0.08), 0 2px 4px -1px rgba(0,0,0,0.04)',
        'elevation-lg': '0 10px 15px -3px rgba(0,0,0,0.08), 0 4px 6px -2px rgba(0,0,0,0.04)',
        'focus':        '0 0 0 3px rgba(14,165,233,0.3)',
        // Neutralised glow aliases (backward compat)
        'glow-primary': '0 4px 16px rgba(0,0,0,0.05)',
        'glow-cyan':    '0 4px 16px rgba(0,0,0,0.05)',
        'glow-emerald': '0 4px 16px rgba(0,0,0,0.05)',
        'glow-rose':    '0 4px 16px rgba(0,0,0,0.05)',
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
