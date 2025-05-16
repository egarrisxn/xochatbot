export const SITE_URL =
  process.env.NODE_ENV === "development"
    ? "http://localhost:3000"
    : (process?.env?.NEXT_PUBLIC_SITE_URL ??
      process?.env?.NEXT_PUBLIC_VERCEL_URL ??
      "https://xochatbot.vercel.app");

export const SITE_DATA: {
  name: string;
  description: string;
  url: string;
  ogImage: string;
  socialHandle: string;
  website: string;
} = {
  name: "XO Chatbot",
  description: "A Grok powered chatbot by your side!",
  url: SITE_URL,
  ogImage: `${SITE_URL}/images/opengraph-image.png`,
  socialHandle: "@eg__xo",
  website: "https://egxo.dev",
};
