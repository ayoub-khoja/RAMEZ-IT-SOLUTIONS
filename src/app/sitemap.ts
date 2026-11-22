import type { MetadataRoute } from "next";
import { siteConfig } from "@/config/site";

// Pensez à mettre à jour cette date quand vous modifiez le contenu du site.
const LAST_UPDATE = "2026-11-22";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: siteConfig.url,
      lastModified: LAST_UPDATE,
      changeFrequency: "monthly",
      priority: 1,
      images: [`${siteConfig.url}/opengraph-image.png`],
    },
  ];
}
