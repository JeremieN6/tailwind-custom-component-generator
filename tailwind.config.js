/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    "./index.html",
  "./src/**/*.{vue,ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'sans': ['Inter', 'ui-sans-serif', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'Helvetica Neue', 'Arial', 'Noto Sans', 'sans-serif'],
      },
      colors: {
        // Map semantic tokens to CSS variables (no opacity variants for now)
        primary: 'var(--twb-color-primary)',
        secondary: 'var(--twb-color-secondary)',
        accent: 'var(--twb-color-accent)',
        success: 'var(--twb-color-success)',
        warning: 'var(--twb-color-warning)',
        error: 'var(--twb-color-error)',
        info: 'var(--twb-color-info)',
        bg: 'var(--twb-color-bg)',
        surface: {
          DEFAULT: 'var(--twb-color-surface)',
          soft: 'var(--twb-color-surface-soft)',
          softer: 'var(--twb-color-surface-softer)'
        },
        text: 'var(--twb-color-text)',
        muted: 'var(--twb-color-muted)'
      },
      borderRadius: {
        none: '0px',
        sm: 'var(--twb-radius-sm)',
        DEFAULT: 'var(--twb-radius-md)',
        md: 'var(--twb-radius-md)',
        lg: 'var(--twb-radius-lg)',
        xl: 'var(--twb-radius-xl)',
        full: 'var(--twb-radius-full)'
      }
    },
  },
  plugins: [],
}
