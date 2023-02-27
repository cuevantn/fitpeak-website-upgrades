"use client"

import { SessionProvider } from "next-auth/react"
import { ThemeProvider } from "next-themes"
import { Provider as WrapBalancerProvider } from "react-wrap-balancer"
import { SWRConfig } from "swr"

import { AnalyticsWrapper } from "@/components/Analytics"
import Header from "@/components/Header"

const ClientLayout = ({ children }) => {
  return (
    <SessionProvider>
      <SWRConfig
        value={{
          refreshInterval: 3000,
          fetcher: (resource, init) =>
            fetch(resource, init).then((res) => res.json()),
        }}
      >
        <body className="min-h-screen bg-white font-sans text-zinc-900 antialiased dark:bg-zinc-900 dark:text-zinc-50">
          <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
            <WrapBalancerProvider>
              <Header />
              {children}
            </WrapBalancerProvider>
            <AnalyticsWrapper />
          </ThemeProvider>
        </body>
      </SWRConfig>
    </SessionProvider>
  )
}

export default ClientLayout
