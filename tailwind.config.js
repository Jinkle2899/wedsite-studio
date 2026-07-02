/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        'rose-gold': '#c9956b',
        'rose-gold-light': '#e8c4a8',
        charcoal: '#1a1a1a',
        blush: '#fdf5f0',
        muted: '#6b6b6b',
        'blush-dark': '#f5e6dc',
      },
      fontFamily: {
        display: ['"Playfair Display"', 'serif'],
        body: ['Inter', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
