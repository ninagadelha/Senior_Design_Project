// components/ui/provider.tsx
'use client'

import { ChakraProvider } from '@chakra-ui/react'
import { ThemeProvider } from 'next-themes'
import { system } from '../../../public/styles/theme'

export function Provider({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider attribute="class" enableSystem={false}>
      <ChakraProvider value={system}>
        {children}
      </ChakraProvider>
    </ThemeProvider>
  )
}