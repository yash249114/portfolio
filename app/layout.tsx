import type { Metadata, Viewport } from "next"
import { Outfit, Fraunces } from "next/font/google"
import "./globals.css"

const outfit = Outfit({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800", "900"],
  variable: "--font-outfit",
})

const fraunces = Fraunces({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "900"],
  variable: "--font-fraunces",
})

export const metadata: Metadata = {
  title: "Sana Yaswanth Raj Mouli — AI Engineer",
  description:
    "A cinematic interactive journey through the work of Yaswanth — AI Engineer, Software Engineer, and AI Product Engineer building intelligent systems.",
  keywords: [
    "Yaswanth",
    "Sana Yaswanth Raj Mouli",
    "AI Engineer",
    "Backend Engineer",
    "FinFlow AI",
    "Portfolio",
  ],
  authors: [{ name: "Sana Yaswanth Raj Mouli" }],
  openGraph: {
    title: "Sana Yaswanth Raj Mouli — AI Engineer",
    description:
      "A cinematic interactive journey through the work of Yaswanth, AI Engineer.",
    type: "website",
  },
}

export const viewport: Viewport = {
  themeColor: "#060709",
  colorScheme: "dark",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${outfit.variable} ${fraunces.variable} bg-background`}>
      <body className="bg-background font-sans antialiased">{children}</body>
    </html>
  )
}
