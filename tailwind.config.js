/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      fontFamily: {
        sans: ["'Geist'", "'Inter'", "system-ui", "sans-serif"],
        mono: ["'Geist Mono'", "'JetBrains Mono'", "monospace"],
      },
      colors: {
        dark: {
          bg: "#000000",
          surface: "#0a0a0a",
          card: "#111111",
          border: "#1a1a1a",
          hover: "#1f1f1f",
          muted: "#888888",
          subtle: "#333333",
        },
        light: {
          bg: "#ffffff",
          surface: "#fafafa",
          card: "#f5f5f5",
          border: "#e5e5e5",
          hover: "#ebebeb",
          muted: "#737373",
          subtle: "#d4d4d4",
        },
        accent: {
          green: "#22c55e",
          red: "#ef4444",
          blue: "#3b82f6",
          amber: "#f59e0b",
          purple: "#a855f7",
          teal: "#14b8a6",
        },
      },
      animation: {
        "fade-in": "fadeIn 0.3s ease-out",
        "slide-up": "slideUp 0.4s ease-out",
        "slide-in-right": "slideInRight 0.3s ease-out",
        "pulse-slow": "pulse 3s infinite",
        shimmer: "shimmer 2s infinite linear",
      },
      keyframes: {
        fadeIn: { from: { opacity: 0 }, to: { opacity: 1 } },
        slideUp: { from: { opacity: 0, transform: "translateY(16px)" }, to: { opacity: 1, transform: "translateY(0)" } },
        slideInRight: { from: { opacity: 0, transform: "translateX(16px)" }, to: { opacity: 1, transform: "translateX(0)" } },
        shimmer: { "0%": { backgroundPosition: "-200% 0" }, "100%": { backgroundPosition: "200% 0" } },
      },
    },
  },
  plugins: [],
};
