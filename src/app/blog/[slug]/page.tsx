import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { ReactNode } from "react";
import { BlogCard } from "@/components/blog/BlogCard";
import { CourseCard } from "@/components/courses/CourseCard";
import { CtaBanner } from "@/components/home/CtaBanner";
import { Reveal } from "@/components/motion/Reveal";
import { Container } from "@/components/ui/Container";
import { Icon } from "@/components/ui/Icon";
import { PageHeader } from "@/components/ui/PageHeader";
import { formatPostDate, getPostBySlug, getPosts } from "@/lib/blog";
import { getCourseBySlug } from "@/lib/courses";
import type { BlogPost, BlogSection } from "@/types/blog";

const INLINE_LINK = /\[([^\]]+)\]\(([^)\s]+)\)/g;

function plainText(text: string) {
  return text.replace(INLINE_LINK, "$1");
}

function RichText({ text }: { text: string }) {
  const parts: ReactNode[] = [];
  let last = 0;
  for (const m of text.matchAll(INLINE_LINK)) {
    if (m.index > last) parts.push(text.slice(last, m.index));
    parts.push(
      <Link
        key={m.index}
        href={m[2]}
        className="font-semibold text-brand-600 underline decoration-brand-600/30 underline-offset-4 transition-colors hover:text-brand-700 hover:decoration-brand-600"
      >
        {m[1]}
      </Link>,
    );
    last = m.index + m[0].length;
  }
  if (last < text.length) parts.push(text.slice(last));
  return <>{parts}</>;
}

function CheckList({ items }: { items: string[] }) {
  return (
    <ul className="mt-5 space-y-3">
      {items.map((b) => (
        <li key={b} className="flex items-start gap-3 text-ink-700">
          <span className="mt-1 flex size-5 shrink-0 items-center justify-center rounded-full bg-brand-600 text-white">
            <Icon name="check" className="size-3" strokeWidth={3} />
          </span>
          <span>
            <RichText text={b} />
          </span>
        </li>
      ))}
    </ul>
  );
}

function PostSection({ section: s }: { section: BlogSection }) {
  return (
    <Reveal>
      <h2 className="text-2xl font-extrabold">{s.heading}</h2>
      <div className="mt-4 space-y-4 text-lg leading-relaxed text-ink-600">
        {s.paragraphs.map((p) => (
          <p key={p}>
            <RichText text={p} />
          </p>
        ))}
      </div>
      {s.bullets && <CheckList items={s.bullets} />}
      {s.groups?.map((g) => (
        <div key={g.heading} className="mt-6">
          <h3 className="text-lg font-bold text-ink-900">{g.heading}</h3>
          <CheckList items={g.bullets} />
        </div>
      ))}
      {s.steps && (
        <ol className="mt-5 space-y-3">
          {s.steps.map((step, i) => (
            <li key={step} className="flex items-start gap-3 text-ink-700">
              <span className="mt-0.5 flex size-6 shrink-0 items-center justify-center rounded-full bg-brand-600 text-xs font-bold text-white">
                {i + 1}
              </span>
              <span>
                <RichText text={step} />
              </span>
            </li>
          ))}
        </ol>
      )}
      {s.closing && (
        <div className="mt-5 space-y-4 text-lg leading-relaxed text-ink-600">
          {s.closing.map((p) => (
            <p key={p}>
              <RichText text={p} />
            </p>
          ))}
        </div>
      )}
    </Reveal>
  );
}

function faqJsonLd(faqs: NonNullable<BlogPost["faqs"]>) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: plainText([f.a, ...(f.bullets ?? [])].join(" ")) },
    })),
  };
}

export async function generateStaticParams() {
  const posts = await getPosts();
  return posts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: PageProps<"/blog/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  if (!post) return {};
  return {
    title: post.title,
    description: post.excerpt,
    openGraph: { type: "article", publishedTime: post.publishedAt },
  };
}

export default async function BlogPostPage({ params }: PageProps<"/blog/[slug]">) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  if (!post) notFound();

  const [course, allPosts] = await Promise.all([
    post.relatedCourse ? getCourseBySlug(post.relatedCourse) : undefined,
    getPosts(),
  ]);
  const morePosts = allPosts.filter((p) => p.slug !== post.slug).slice(0, 3);

  return (
    <>
      {post.faqs && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd(post.faqs)).replace(/</g, "\\u003c") }}
        />
      )}

      <PageHeader
        breadcrumbs={[{ label: "Blog", href: "/blog" }, { label: post.category }]}
        title={post.title}
        description={post.excerpt}
      >
        <div className="mt-8 flex flex-wrap gap-3 text-sm text-ink-200">
          <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2">
            <Icon name="users" className="size-4 text-brand-400" />
            {post.author}
          </span>
          <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2">
            <Icon name="calendar" className="size-4 text-brand-400" />
            <time dateTime={post.publishedAt}>{formatPostDate(post.publishedAt)}</time>
          </span>
          <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2">
            <Icon name="clock" className="size-4 text-brand-400" />
            {post.readMinutes} min read
          </span>
        </div>
      </PageHeader>

      <section className="py-14 sm:py-20">
        <Container className="grid gap-12 lg:grid-cols-[1fr_340px]">
          <article className="min-w-0 max-w-3xl space-y-10">
            {post.intro && (
              <Reveal className="space-y-4 text-lg leading-relaxed text-ink-600">
                {post.intro.map((p) => (
                  <p key={p}>
                    <RichText text={p} />
                  </p>
                ))}
              </Reveal>
            )}
            {post.sections.map((s) => (
              <PostSection key={s.heading} section={s} />
            ))}
            {post.faqs && (
              <Reveal>
                <h2 className="text-2xl font-extrabold">Frequently Asked Questions (FAQs)</h2>
                <div className="mt-6 space-y-3">
                  {post.faqs.map((f) => (
                    <details
                      key={f.q}
                      className="group rounded-2xl border border-ink-100 bg-white px-6 transition-all duration-300 open:border-brand-200 open:bg-brand-50/40 open:shadow-lg open:shadow-brand-900/5 hover:border-brand-200"
                    >
                      <summary className="flex cursor-pointer list-none items-center justify-between gap-4 py-5 font-semibold text-ink-900 [&::-webkit-details-marker]:hidden">
                        {f.q}
                        <span className="flex size-8 shrink-0 items-center justify-center rounded-full bg-ink-50 text-ink-600 transition-all duration-300 group-open:rotate-45 group-open:bg-brand-600 group-open:text-white">
                          <Icon name="plus" className="size-4" />
                        </span>
                      </summary>
                      <div className="animate-fade-up pb-6 leading-relaxed text-ink-500 [animation-duration:400ms]">
                        <p>
                          <RichText text={f.a} />
                        </p>
                        {f.bullets && <CheckList items={f.bullets} />}
                      </div>
                    </details>
                  ))}
                </div>
              </Reveal>
            )}
            {post.outro && <PostSection section={post.outro} />}
          </article>

          {course && (
            <aside className="lg:sticky lg:top-28 lg:self-start">
              <Reveal variant="right">
                <p className="mb-4 text-xs font-bold tracking-widest text-brand-600 uppercase">Related course</p>
                <CourseCard course={course} />
              </Reveal>
            </aside>
          )}
        </Container>
      </section>

      {morePosts.length > 0 && (
        <section className="bg-ink-50/70 py-16 sm:py-20">
          <Container>
            <h2 className="text-2xl font-extrabold">More articles</h2>
            <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {morePosts.map((p, i) => (
                <Reveal key={p.slug} delay={i * 120} className="h-full">
                  <BlogCard post={p} />
                </Reveal>
              ))}
            </div>
          </Container>
        </section>
      )}

      <div className="pt-20 sm:pt-28">
        <CtaBanner />
      </div>
    </>
  );
}
