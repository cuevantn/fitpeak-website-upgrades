"use client"

import { Inter as FontSans } from "@next/font/google"

import "@/styles/globals.css"
import MainNavbar from "@/components/MainNavbar"
import NextThemeProvider from "@/components/NextThemeProvider"

const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
})

interface MainLayoutProps {
  children: React.ReactNode
}

const MainLayout: React.FunctionComponent<MainLayoutProps> = ({ children }) => {
  return (
    <html lang="es" className={fontSans.className}>
      <NextThemeProvider>
        <MainNavbar />
        {children}
      </NextThemeProvider>
    </html>
  )
}

export default MainLayout
