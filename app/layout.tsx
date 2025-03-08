import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
// import { Analytics } from "@vercel/analytics/react";
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
  // metadataBase: new URL("https://xochatbot.vercel.app"),
  title: "XOChatbot",
  description: "A Grok powered chatbot by your side!",
  applicationName: "XOChatbot",
  creator: "https://egxo.dev",
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
  openGraph: {
    title: "XOChatbot",
    description: "A Grok powered chatbot by your side!",
    // url: "https://xochatbot.vercel.app",
    siteName: "XOChatbot",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "XOChatbot",
    description: "A Grok powered chatbot by your side!",
    creator: "@eg__xo",
    site: "@eg__xo",
  },
  appleWebApp: {
    capable: true,
    title: "XOChatbot",
    // startupImage: "/opengraph-image.png",
    statusBarStyle: "black-translucent",
  },
  formatDetection: {
    telephone: true,
    date: true,
    address: true,
    email: true,
    url: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html suppressHydrationWarning lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        {children}
        {/* <Analytics /> */}
      </body>
    </html>
  );
}
