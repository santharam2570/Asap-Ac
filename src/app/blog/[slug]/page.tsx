import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { BlogCard } from "@/components/blog/BlogCard";
import { CourseCard } from "@/components/courses/CourseCard";
import { CtaBanner } from "@/components/home/CtaBanner";
import { Reveal } from "@/components/motion/Reveal";
import { Container } from "@/components/ui/Container";
import { Icon } from "@/components/ui/Icon";
import { PageHeader } from "@/components/ui/PageHeader";
import { formatPostDate, getPostBySlug, getPosts } from "@/lib/blog";
import { getCourseBySlug } from "@/lib/courses";

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
            {post.sections.map((s) => (
              <Reveal key={s.heading}>
                <h2 className="text-2xl font-extrabold">{s.heading}</h2>
                <div className="mt-4 space-y-4 text-lg leading-relaxed text-ink-600">
                  {s.paragraphs.map((p) => (
                    <p key={p}>{p}</p>
                  ))}
                </div>
                {s.bullets && (
                  <ul className="mt-5 space-y-3">
                    {s.bullets.map((b) => (
                      <li key={b} className="flex items-start gap-3 text-ink-700">
                        <span className="mt-1 flex size-5 shrink-0 items-center justify-center rounded-full bg-brand-600 text-white">
                          <Icon name="check" className="size-3" strokeWidth={3} />
                        </span>
                        {b}
                      </li>
                    ))}
                  </ul>
                )}
              </Reveal>
            ))}
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
