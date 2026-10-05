import type { MetadataRoute } from "next";
import { siteConfig } from "@/config/site";
import { getCourses } from "@/lib/courses";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const courses = await getCourses();
  const staticRoutes = ["", "/courses", "/about", "/corporate-training", "/contact"];

  return [
    ...staticRoutes.map((path) => ({ url: `${siteConfig.url}${path}` })),
    ...courses.map((c) => ({ url: `${siteConfig.url}/courses/${c.slug}` })),
  ];
}
