import { posts } from "@/data/blog";
import type { BlogPost } from "@/types/blog";

const newestFirst = (a: BlogPost, b: BlogPost) => b.publishedAt.localeCompare(a.publishedAt);

export async function getPosts(): Promise<BlogPost[]> {
  return [...posts].sort(newestFirst);
}

export async function getLatestPosts(limit = 3): Promise<BlogPost[]> {
  return (await getPosts()).slice(0, limit);
}

export async function getPostBySlug(slug: string): Promise<BlogPost | undefined> {
  return posts.find((p) => p.slug === slug);
}

export function formatPostDate(iso: string): string {
  return new Date(`${iso}T00:00:00`).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}
