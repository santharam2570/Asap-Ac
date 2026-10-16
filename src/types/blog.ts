export interface BlogSection {
  heading: string;
  paragraphs: string[];
  bullets?: string[];
}

export interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  /** ISO date, e.g. "2026-10-10". */
  publishedAt: string;
  readMinutes: number;
  author: string;
  /** Slug of the course this article promotes. */
  relatedCourse?: string;
  sections: BlogSection[];
}
