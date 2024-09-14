import { MetadataRoute } from "next";
import { WEBSITE_URL } from "~/util/consts";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: `${WEBSITE_URL}/`,
      lastModified: new Date(),
      priority: 1,
    },
    {
      url: `${WEBSITE_URL}/about`,
      lastModified: new Date(),
      priority: 0.9,
    },
    {
      url: `${WEBSITE_URL}/menu`,
      lastModified: new Date(),
      priority: 0.95,
    },
    {
      url: `${WEBSITE_URL}/order`,
      lastModified: new Date(),
      priority: 0.85,
    },
    {
      url: `${WEBSITE_URL}/contact`,
      lastModified: new Date(),
      priority: 0.5,
    },
  ];
}
