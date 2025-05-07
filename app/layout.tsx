import type React from "react"
import type { Metadata } from "next"
import { Inter, Open_Sans } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import Header from "@/components/header"
import Footer from "@/components/footer"

const openSans = Open_Sans({
  subsets: ["latin"],
  variable: "--font-open-sans",
})

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter", // Using Inter as a fallback for Mont
})

export const metadata: Metadata = {
  title: "Systems Thinking Hackathon - Air vs Rail Travel",
  description: "Educational project on the boom in domestic air travel and bust in rail travel for Tier 2-3 cities",
  icons: {
    icon: "/logo.png"
  }
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${openSans.variable} ${inter.variable} font-sans`}>
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem disableTransitionOnChange>
          <div className="flex min-h-screen flex-col">
            <Header />
            <main className="flex-1">{children}</main>
            <Footer />
          </div>
        </ThemeProvider>
      </body>
    </html>
  )
}
