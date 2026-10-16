import { BlogCard } from "@/components/blog/BlogCard";
import { Reveal } from "@/components/motion/Reveal";
import { ButtonLink } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Icon } from "@/components/ui/Icon";
import { SectionHeading } from "@/components/ui/SectionHeading";
import type { BlogPost } from "@/types/blog";

export function LatestPosts({ posts }: { posts: BlogPost[] }) {
  return (
    <section className="bg-ink-50/70 py-20 sm:py-28">
      <Container>
        <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
          <SectionHeading
            align="left"
            eyebrow="From our Blog"
            title="SAP career guides & insights"
            description="Practical advice from our SAP consultants on choosing a module, building skills and landing your first SAP role."
          />
          <Reveal variant="right">
            <ButtonLink href="/blog" variant="outline">
              View all articles
              <Icon name="arrowRight" className="size-4 transition-transform group-hover/btn:translate-x-1" />
            </ButtonLink>
          </Reveal>
        </div>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {posts.map((post, i) => (
            <Reveal key={post.slug} delay={(i % 3) * 120} className="h-full">
              <BlogCard post={post} />
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
