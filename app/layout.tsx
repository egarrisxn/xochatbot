import "./globals.css";
import type { ReactNode } from "react";
import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Analytics } from "@vercel/analytics/react";
import { SITE_DATA } from "@/lib/config";
import Providers from "./providers";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_DATA.url),
  title: SITE_DATA.name,
  description: SITE_DATA.description,
  applicationName: SITE_DATA.name,
  creator: SITE_DATA.website,
  referrer: "origin-when-cross-origin",
  keywords: [
    "typesctipt",
    "javascript",
    "nextjs",
    "react",
    "tailwindcss",
    "shadcnui",
    "prisma",
    "neon",
    "upstash",
    "redis",
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
    title: SITE_DATA.name,
    description: SITE_DATA.description,
    siteName: SITE_DATA.name,
    url: SITE_DATA.url,
    images: SITE_DATA.ogImage,
  },
  twitter: {
    card: "summary_large_image",
    title: SITE_DATA.name,
    description: SITE_DATA.description,
    creator: SITE_DATA.socialHandle,
    site: SITE_DATA.socialHandle,
    images: SITE_DATA.ogImage,
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
  children: ReactNode;
}>) {
  return (
    <html suppressHydrationWarning lang='en'>
      <head>
        <meta name='apple-mobile-web-app-title' content={SITE_DATA.name} />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} font-sans antialiased`}
      >
        <Providers>{children}</Providers>
        <Analytics />
      </body>
    </html>
  );
}
