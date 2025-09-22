'use client'

import { ThemeProvider as NextThemesProvider, ThemeProviderProps } from 'next-themes'

export function ThemeProvider({ children, ...props }: ThemeProviderProps) {
    // @ts-ignore
    return <NextThemesProvider {...props}>{children}</NextThemesProvider>
}