import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        // Calm teal / sage primary, warm sand neutrals, coral accent
        brand: {
          50: "#eef7f6", 100: "#d5ebe9", 200: "#aed7d3", 300: "#7dbcb7",
          400: "#4f9e9a", 500: "#2f8481", 600: "#226a69", 700: "#1d5555",
          800: "#1a4444", 900: "#153838",
        },
        sage: { 50: "#f4f7f2", 100: "#e5ece0", 200: "#cddbc4", 300: "#a9c19b", 600: "#5b7a4b" },
        sand: { 50: "#fbf8f3", 100: "#f5efe5", 200: "#ebe1cf", 300: "#dccdb2" },
        coral: { 50: "#fff1ec", 100: "#ffddd2", 500: "#e2674a", 600: "#c9502f", 700: "#a53f24" },
        ink: { 900: "#1c2b2d", 700: "#3b4d4f", 600: "#4f6264", 500: "#667a7c" },
      },
      fontFamily: {
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
        serif: ["var(--font-serif)", "Georgia", "serif"],
      },
      boxShadow: {
        card: "0 1px 2px rgba(28,43,45,.05), 0 8px 24px -12px rgba(28,43,45,.15)",
        lift: "0 2px 4px rgba(28,43,45,.06), 0 16px 32px -12px rgba(28,43,45,.22)",
      },
      borderRadius: { xl2: "1.25rem" },
    },
  },
  plugins: [],
};
export default config;
