import Link from "next/link";
import { Icon } from "@/components/ui/Icon";
import { formatPostDate } from "@/lib/blog";
import type { BlogPost } from "@/types/blog";

export function BlogCard({ post }: { post: BlogPost }) {
  return (
    <Link
      href={`/blog/${post.slug}`}
      className="group relative flex h-full flex-col overflow-hidden rounded-3xl border border-ink-100 bg-white p-6 transition-all duration-300 hover:-translate-y-1 hover:border-brand-200 hover:shadow-2xl hover:shadow-brand-900/10"
    >
      <div className="absolute inset-x-0 top-0 h-1 origin-left scale-x-0 bg-gradient-to-r from-brand-600 to-brand-400 transition-transform duration-300 group-hover:scale-x-100" />

      <span className="self-start rounded-full bg-brand-50 px-3 py-1 text-[11px] font-semibold text-brand-700 ring-1 ring-brand-600/15 ring-inset">
        {post.category}
      </span>
      <h3 className="mt-4 text-lg leading-snug font-bold text-ink-950 group-hover:text-brand-700">{post.title}</h3>
      <p className="mt-2 line-clamp-3 text-sm leading-relaxed text-ink-500">{post.excerpt}</p>

      <div className="flex-1" />
      <div className="mt-6 flex items-center justify-between border-t border-ink-100 pt-5">
        <div className="flex items-center gap-4 text-xs font-medium text-ink-500">
          <span className="flex items-center gap-1.5">
            <Icon name="calendar" className="size-4 text-brand-500" />
            <time dateTime={post.publishedAt}>{formatPostDate(post.publishedAt)}</time>
          </span>
          <span className="flex items-center gap-1.5">
            <Icon name="clock" className="size-4 text-brand-500" />
            {post.readMinutes} min read
          </span>
        </div>
        <span className="flex size-9 items-center justify-center rounded-full bg-ink-50 text-ink-700 transition-all duration-300 group-hover:bg-brand-600 group-hover:text-white">
          <Icon name="arrowRight" className="size-4 transition-transform duration-300 group-hover:-rotate-45" />
        </span>
      </div>
    </Link>
  );
}
