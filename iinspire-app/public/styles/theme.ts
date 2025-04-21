// styles/theme.ts
import { createSystem, defaultConfig } from "@chakra-ui/react"

export const system = createSystem(defaultConfig, {
  theme: {
    tokens: {
      colors: {
        primary_blue: { value: "#2b6cb0" },
      },
      fonts: {
        heading: { value: "var(--font-geist-sans)" },
        body: { value: "var(--font-geist-sans)" },
        mono: { value: "var(--font-geist-mono)" },
      },
    },
  },
})