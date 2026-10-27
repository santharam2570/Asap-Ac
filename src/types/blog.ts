export interface BlogBulletGroup {
  heading: string;
  bullets: string[];
}

export interface BlogSection {
  heading: string;
  paragraphs: string[];
  bullets?: string[];
  /** Titled bullet lists rendered after `bullets`. */
  groups?: BlogBulletGroup[];
  /** Numbered list rendered after `groups`. */
  steps?: string[];
  /** Paragraphs rendered after all lists. */
  closing?: string[];
}

export interface BlogFaq {
  q: string;
  a: string;
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
  /** Lead paragraphs shown before the first section. */
  intro?: string[];
  sections: BlogSection[];
  faqs?: BlogFaq[];
  /** Section shown after the FAQs. */
  outro?: BlogSection;
}
