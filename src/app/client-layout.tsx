"use client"

import { Toaster } from "@/ui/toaster"
import { SessionProvider } from "next-auth/react"
import { ThemeProvider } from "next-themes"
import { Provider as WrapBalancerProvider } from "react-wrap-balancer"
import { SWRConfig } from "swr"

import { AnalyticsWrapper } from "@/components/Analytics"
import Header from "@/components/Header"
import { Footer } from "@/components/footer"

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
        <body className="bg-white font-sans text-zinc-900 antialiased dark:bg-zinc-900 dark:text-zinc-50">
          <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
            <WrapBalancerProvider>
              <div className="flex flex-col min-h-[125vh]">
                <Header />
                {children}
                <Footer />
              </div>
              <Toaster />
            </WrapBalancerProvider>
            <AnalyticsWrapper />
          </ThemeProvider>
        </body>
      </SWRConfig>
    </SessionProvider>
  )
}

export default ClientLayout
