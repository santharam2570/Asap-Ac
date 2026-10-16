import type { MetadataRoute } from "next";
import { siteConfig } from "@/config/site";
import { getPosts } from "@/lib/blog";
import { getCourses } from "@/lib/courses";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [courses, posts] = await Promise.all([getCourses(), getPosts()]);
  const staticRoutes = ["", "/courses", "/about", "/corporate-training", "/blog", "/contact"];

  return [
    ...staticRoutes.map((path) => ({ url: `${siteConfig.url}${path}` })),
    ...courses.map((c) => ({ url: `${siteConfig.url}/courses/${c.slug}` })),
    ...posts.map((p) => ({ url: `${siteConfig.url}/blog/${p.slug}`, lastModified: p.publishedAt })),
  ];
}
