/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['app/**/*.{tsx,ts}', 'components/**/*.{tsx,ts}'],
  theme: {
    extend: {
      colors: {
        primary: '#2563eb',
        muted: '#64748b',
        surface: '#0f172a',
      },
    },
  },
  plugins: [],
};
