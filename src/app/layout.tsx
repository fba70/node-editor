import type { Metadata } from "next"
import { TRPCReactProvider } from "@/trpc/client"
import { Geist, Geist_Mono } from "next/font/google"
import { Toaster } from "@/components/ui/sonner"
import { NuqsAdapter } from "nuqs/adapters/next/app"
import "./globals.css"

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
})

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
})

export const metadata: Metadata = {
  title: "Node Editor App",
  description: "A node editor app project",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <TRPCReactProvider>
          <NuqsAdapter>{children}</NuqsAdapter>
        </TRPCReactProvider>
        <Toaster />
      </body>
    </html>
  )
}
