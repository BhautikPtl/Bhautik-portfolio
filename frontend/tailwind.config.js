/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx}",
  ],
  theme: {
    extend: {
      colors: {
        'primary': 'var(--primary)',
        'accent': 'var(--accent)',
        'background': 'var(--background)',
        'card': 'var(--card)',
        'border': 'var(--border)',
        'space-darker': '#020617',
        'space-dark': '#0F172A',
        'electric-blue': '#3B82F6',
        'neon-purple': '#8B5CF6',
      },
      backgroundImage: {
        'gradient-glow': 'linear-gradient(135deg, #3B82F6 0%, #8B5CF6 100%)',
      },
      boxShadow: {
        'glow-blue': '0 0 20px rgba(59, 130, 246, 0.5)',
        'glow-purple': '0 0 20px rgba(139, 92, 246, 0.5)',
      },
      backdropBlur: {
        'sm': '4px',
        'md': '12px',
        'lg': '16px',
      },
    },
  },
  plugins: [],
}
