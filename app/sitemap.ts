import type { MetadataRoute } from "next";
import { siteUrl } from "@/lib/env";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  return [
    {
      url: siteUrl,
      lastModified: new Date(),
    },
     {
      url: `${siteUrl}/xo`,
      lastModified: new Date(),
    },
    {
      url: `${siteUrl}/privacy`,
      lastModified: new Date(),
    },
    {
      url: `${siteUrl}/terms`,
      lastModified: new Date(),
    },
  ];
}
