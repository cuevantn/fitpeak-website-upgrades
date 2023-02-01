"use client"

import { Inter as FontSans } from "@next/font/google"

import "@/styles/globals.css"
import { ThemeProvider } from "next-themes"
import MainNavbar from "@/components/MainNavbar"

const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
})

interface MainLayoutProps {
  children: React.ReactNode
}

const MainLayout: React.FunctionComponent<MainLayoutProps> = ({ children }) => {
  return (
    <html lang="en" className={fontSans.className}>
      <body className="min-h-screen bg-white font-sans text-slate-900 antialiased dark:bg-slate-900 dark:text-slate-50">
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <MainNavbar />
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}

export default MainLayout
