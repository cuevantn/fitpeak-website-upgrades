"use client"

import { ThemeProvider } from "next-themes"

interface NextThemeProviderProps {
  children: React.ReactNode
}

const NextThemeProvider: React.FunctionComponent<NextThemeProviderProps> = ({
  children,
}) => {
  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      <body className="min-h-screen bg-white font-sans text-slate-900 antialiased dark:bg-slate-900 dark:text-slate-50">
        {children}
      </body>
    </ThemeProvider>
  )
}

export default NextThemeProvider
