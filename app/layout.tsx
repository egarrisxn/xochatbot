import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Analytics } from "@vercel/analytics/react";
import { Toaster as SonnerToaster } from "sonner";
import { siteConfig } from "@/lib/config";
import { ThemeProvider } from "@/components/providers";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: siteConfig.name,
  description: siteConfig.description,
  applicationName: siteConfig.name,
  creator: siteConfig.website,
  referrer: "origin-when-cross-origin",
  keywords: [
    "typesctipt",
    "javascript",
    "nextjs",
    "next15",
    "react",
    "tailwindcss",
    "shadcnui",
    "grok",
    "ai",
    "vercel",
  ],
  icons: {
    icon: {
      url: "/icons/icon.png",
      sizes: "192x192",
      type: "image/png",
    },
    apple: {
      url: "/icons/apple-icon.png",
      sizes: "180x180",
      type: "image/png",
    },
    other: {
      rel: "icon",
      url: "/icons/icon.svg",
      type: "image/svg+xml",
    },
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    title: siteConfig.name,
    description: siteConfig.description,
    url: siteConfig.url,
    siteName: siteConfig.name,
  },
  twitter: {
    card: "summary_large_image",
    title: siteConfig.name,
    description: siteConfig.description,
    creator: siteConfig.socialHandle,
    site: siteConfig.socialHandle,
  },
  verification: {},
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#0c0a09" },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html suppressHydrationWarning lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} font-sans antialiased`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
          <SonnerToaster richColors closeButton position="bottom-right" />
        </ThemeProvider>
        <Analytics />
      </body>
    </html>
  );
}
