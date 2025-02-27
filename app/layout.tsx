import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { cn } from "@/lib/utils"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Running Shoe Finder",
  description: "Find the perfect running shoes based on your preferences and needs",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={cn(inter.className, "min-h-screen bg-background")}>
        <header className="border-b">
          <div className="container mx-auto px-4 py-4 flex items-center justify-between">
            <div className="font-bold text-xl">RunFinder</div>
            <nav className="hidden md:flex gap-6">
              <a href="/" className="hover:text-primary">
                Home
              </a>
              <a href="#" className="hover:text-primary">
                Contact
              </a>
            </nav>
          </div>
        </header>
        {children}
        <footer className="bg-muted py-8 border-t">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div>
                <h3 className="font-bold text-lg mb-4">RunFinder</h3>
                <p className="text-muted-foreground">Helping runners find their perfect shoes since 2023.</p>
              </div>
              <div>
                <h3 className="font-bold text-lg mb-4">Quick Links</h3>
                <ul className="space-y-2">
                  <li>
                    <a href="#" className="text-muted-foreground hover:text-primary">
                      About Us
                    </a>
                  </li>
                  <li>
                    <a href="#" className="text-muted-foreground hover:text-primary">
                      Shoe Brands
                    </a>
                  </li>
                  <li>
                    <a href="#" className="text-muted-foreground hover:text-primary">
                      Running Tips
                    </a>
                  </li>
                  <li>
                    <a href="#" className="text-muted-foreground hover:text-primary">
                      Contact
                    </a>
                  </li>
                </ul>
              </div>
              <div>
                <h3 className="font-bold text-lg mb-4">Newsletter</h3>
                <p className="text-muted-foreground mb-4">Subscribe for running tips and product updates.</p>
                <div className="flex gap-2">
                  <input type="email" placeholder="Your email" className="px-3 py-2 rounded-md border text-sm flex-1" />
                  <button className="bg-primary text-primary-foreground px-3 py-2 rounded-md text-sm">Subscribe</button>
                </div>
              </div>
            </div>
            <div className="mt-8 pt-4 border-t border-border text-center text-sm text-muted-foreground">
              © {new Date().getFullYear()} RunFinder. All rights reserved.
            </div>
          </div>
        </footer>
      </body>
    </html>
  )
}

