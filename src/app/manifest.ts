import type { MetadataRoute } from "next";
import { siteConfig } from "@/config/site";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: siteConfig.name,
    short_name: "RAMEZ IT",
    description: siteConfig.description,
    start_url: "/",
    display: "standalone",
    background_color: "#ffffff",
    theme_color: "#021737",
    lang: "fr",
    icons: [{ src: "/icon.png", sizes: "any", type: "image/png" }],
  };
}
