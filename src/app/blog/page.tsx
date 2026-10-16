import type { Metadata } from "next";
import { BlogCard } from "@/components/blog/BlogCard";
import { CtaBanner } from "@/components/home/CtaBanner";
import { Reveal } from "@/components/motion/Reveal";
import { Container } from "@/components/ui/Container";
import { PageHeader } from "@/components/ui/PageHeader";
import { getPosts } from "@/lib/blog";

export const metadata: Metadata = {
  title: "SAP Career Blog",
  description:
    "SAP career guides, module comparisons and training tips from ASAP Academy's SAP consultants in Coimbatore and Trichy.",
};

export default async function BlogPage() {
  const posts = await getPosts();

  return (
    <>
      <PageHeader
        breadcrumbs={[{ label: "Blog" }]}
        title={
          <>
            SAP Career Guides &amp; <span className="text-brand-400">Insights</span>
          </>
        }
        description="Practical advice from working SAP consultants: choosing the right module, building job-ready skills and preparing for your first SAP role in Coimbatore, Trichy and beyond."
      />

      <section className="py-14 sm:py-20">
        <Container>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {posts.map((post, i) => (
              <Reveal key={post.slug} delay={(i % 3) * 120} className="h-full">
                <BlogCard post={post} />
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      <CtaBanner />
    </>
  );
}
