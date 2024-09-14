import { MetadataRoute } from "next";
import { WEBSITE_URL } from "~/util/consts";
import { env } from "~/env";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: "/private/",
    },
    sitemap: `${env.NODE_ENV == "development" ? "localhost:3000" : WEBSITE_URL}/sitemap.xml`,
  };
}
