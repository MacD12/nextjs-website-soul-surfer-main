/** @type {import('tailwindcss').Config} */
// CommonJS config — loaded natively by Tailwind without the TS loader. The
// previous tailwind.config.ts was not being picked up, so Tailwind ran with an
// empty content list and generated no utilities (every `bg-ss-*` / `flex` class
// silently did nothing). This restores the palette + Onest font for all Tailwind
// components (BookingCTA, TrustStrip, Breadcrumbs, the blog page).
module.exports = {
  // NOTE: brace-expansion globs ("*.{ts,tsx}") matched zero files in this
  // environment, so Tailwind generated no utilities. Use explicit per-extension
  // globs, which scan reliably.
  content: [
    "./app/**/*.tsx",
    "./app/**/*.ts",
    "./app/**/*.jsx",
    "./app/**/*.js",
    "./components/**/*.tsx",
    "./components/**/*.ts",
    "./lib/**/*.ts",
  ],
  // Preflight (Tailwind's reset) stays OFF so the ported Elementor design is
  // untouched; utilities remain available.
  corePlugins: {
    preflight: false,
  },
  theme: {
    extend: {
      fontFamily: {
        onest: ['"Onest"', "sans-serif"],
      },
      colors: {
        "ss-taupe": "#D7D2C4",
        "ss-cream": "#ECE8DD",
        "ss-white": "#FFFFFF",
        "ss-espresso": "#2B2722",
        "ss-cocoa": "#3A362E",
        "ss-sage": "#7E9A82",
        "ss-body": "#6E6A61",
        // The ported booking engine is themed in cyan/sky. The marketing site
        // uses Elementor CSS + ss-* classes (never cyan/sky), so remapping these
        // scales to the Soul Surfer palette recolours ONLY the booking flow.
        cyan: {
          50: "#f4f2ec",
          100: "#ece8dd",
          200: "#d7d2c4",
          300: "#b9bca7",
          400: "#9aad9d",
          500: "#7e9a82", // sage — primary accent
          600: "#5f7a63", // deep sage
          700: "#2b2722", // espresso — dark/primary
          800: "#24211c",
          900: "#1c1915",
        },
        sky: {
          50: "#f4f2ec",
          100: "#ece8dd",
          200: "#d7d2c4",
          300: "#b9bca7",
          400: "#9aad9d",
          500: "#7e9a82",
          600: "#5f7a63",
          700: "#2b2722",
          800: "#24211c",
          900: "#1c1915",
        },
      },
    },
  },
  plugins: [],
};
