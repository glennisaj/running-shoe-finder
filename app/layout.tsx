import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { cn } from "@/lib/utils"
import { AuthProvider } from './providers'

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Running Shoe Finder",
  description: "Find your perfect running shoe",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={cn(inter.className, "min-h-screen")}>
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  )
}

