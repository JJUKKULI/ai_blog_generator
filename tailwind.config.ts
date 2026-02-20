import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // Dark theme colors
        dark: {
          bg: '#0f0f13',
          surface: '#1a1a1f',
          border: 'rgba(255,255,255,0.08)',
          text: '#e4e4e7',
          muted: '#71717a',
        },
        // Editorial/Light theme colors
        editorial: {
          bg: '#f9f7f4',
          surface: '#ffffff',
          text: '#1c1917',
          muted: '#78716c',
          border: '#e7e5e4',
        },
        // Accent colors
        accent: {
          DEFAULT: '#6366f1',
          hover: '#5558e6',
          light: '#818cf8',
          subtle: 'rgba(99,102,241,0.1)',
        },
      },
      fontFamily: {
        serif: ['"Source Serif 4"', 'Georgia', 'Cambria', 'serif'],
        sans: ['Inter', '-apple-system', 'BlinkMacSystemFont', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'monospace'],
      },
      boxShadow: {
        'dark': '0 4px 24px rgba(0,0,0,0.4)',
        'dark-lg': '0 8px 32px rgba(0,0,0,0.5)',
        'editorial': '0 2px 8px rgba(28,25,23,0.06)',
        'editorial-lg': '0 8px 24px rgba(28,25,23,0.1)',
      },
      borderRadius: {
        'xl': '12px',
        '2xl': '16px',
        '3xl': '24px',
      },
    },
  },
  plugins: [],
};

export default config;
