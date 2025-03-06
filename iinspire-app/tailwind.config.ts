import type { Config } from "tailwindcss";

module.exports = {
  // ... other config
  corePlugins: {
    preflight: false, // This disables all base styles
    // Or more selectively:
    buttonReset: false, // If this is available in your Tailwind version
  },
}

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
    },
  },
  plugins: [],
} satisfies Config;
