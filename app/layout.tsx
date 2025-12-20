import type React from "react"
import type { Metadata } from "next"
import { DM_Sans, Playfair_Display } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import "./globals.css"

const dmSans = DM_Sans({ subsets: ["latin"] })
const playfair = Playfair_Display({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Prestige Windows Solution | Premium uPVC Windows & Doors",
  description:
    "High-quality, durable, energy-efficient uPVC window and door installations for homes and commercial spaces. Experience premium craftsmanship with Prestige Windows Solution.",
  keywords:
    "uPVC windows, uPVC doors, sliding windows, casement windows, energy efficient windows, window installation",
  generator: "",
  authors: [{ name: "Prestige Windows Solution", url: "https://www.prestigeupvc.in" }],
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`font-sans antialiased`}>
        {children}
        <Analytics />
      </body>
    </html>
  )
}
