"use client"

import { ThemeProvider } from "next-themes"

interface NextThemeProviderProps {
  children: React.ReactNode
}

const NextThemeProvider: React.FunctionComponent<
  NextThemeProviderProps
> = ({children}) => {
  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      <body>{children}</body>
    </ThemeProvider>
  )
}

export default NextThemeProvider
