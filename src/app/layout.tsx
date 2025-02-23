import type React from "react"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import "./globals.css"

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="zh">
      <body className="min-h-screen bg-gradient-to-br from-rose-100 via-violet-200 to-teal-100 animate-gradient-xy">
        <SiteHeader />
        {children}
        <SiteFooter />
      </body>
    </html>
  )
}
