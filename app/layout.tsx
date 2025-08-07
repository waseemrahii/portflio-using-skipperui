import type { Metadata } from "next"
import { Inter } from 'next/font/google'
import "./globals.css"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Wasim - MERN Stack Developer & Web Expert",
  description: "Professional MERN Stack Developer specializing in React, Node.js, Next.js, and WordPress development. Creating exceptional digital experiences that drive business growth.",
  keywords: "MERN Stack Developer, React Developer, Node.js, Next.js, WordPress, Full Stack Developer, Web Development",
  authors: [{ name: "Wasim" }],
  creator: "Wasim",
  publisher: "Wasim",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://wasimdev.com",
    title: "Wasim - MERN Stack Developer & Web Expert",
    description: "Professional MERN Stack Developer specializing in React, Node.js, Next.js, and WordPress development.",
    siteName: "Wasim Portfolio",
    images: [
      {
        url: "/images/wasim-profile.jpeg",
        width: 1200,
        height: 630,
        alt: "Wasim - MERN Stack Developer",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Wasim - MERN Stack Developer & Web Expert",
    description: "Professional MERN Stack Developer specializing in React, Node.js, Next.js, and WordPress development.",
    images: ["/images/wasim-profile.jpeg"],
    creator: "@wasimdev",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: "your-google-verification-code",
  },
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="manifest" href="/site.webmanifest" />
        <meta name="theme-color" content="#fbbf24" />
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=5" />
      </head>
      <body className={`${inter.className} antialiased`}>
        <div id="root">{children}</div>
      </body>
    </html>
  )
}
