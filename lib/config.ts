import { siteUrl } from "@/lib/env";

export interface SiteConfig {
  name: string;
  description: string;
  url: string;
  ogImage: string;
  twitterImage: string;
  socialHandle: string;
  website: string;
}

export const siteConfig: SiteConfig = {
  name: "XO Chatbot",
  description: "A Grok powered chatbot by your side!",
  url: siteUrl,
  ogImage: `${siteUrl}/opengraph-image.png`,
  twitterImage: `${siteUrl}/twitter-image.png`,
  socialHandle: "@eg__xo",
  website: "https://egxo.dev",
};
