import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/config";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  return [
    {
      url: SITE_URL,
      lastModified: new Date(),
    },
    {
      url: `${SITE_URL}/privacy`,
      lastModified: new Date(),
    },
    {
      url: `${SITE_URL}/terms`,
      lastModified: new Date(),
    },
  ];
}
