import Link from "next/link";
import { Reveal } from "@/components/motion/Reveal";
import { Container } from "@/components/ui/Container";
import { Icon } from "@/components/ui/Icon";
import { SectionHeading } from "@/components/ui/SectionHeading";
import type { Category, CategoryId } from "@/types/course";

interface CategoryGridProps {
  categories: Category[];
  counts: Record<CategoryId, number>;
}

export function CategoryGrid({ categories, counts }: CategoryGridProps) {
  return (
    <section className="py-20 sm:py-28">
      <Container>
        <SectionHeading
          eyebrow="SAP Modules"
          title={
            <>
              Every SAP track, <span className="text-brand-600">under one roof</span>
            </>
          }
          description="Functional, technical, cloud or analytics: choose the path that fits your background and career goals."
        />

        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {categories.map((cat, i) => {
            const featured = i === 0;
            return (
              <Reveal
                key={cat.id}
                variant={featured ? "left" : "up"}
                delay={i * 90}
                className={featured ? "sm:col-span-2 lg:col-span-1 lg:row-span-2" : ""}
              >
                <Link
                  href={`/courses?category=${cat.id}`}
                  className={`group relative block h-full overflow-hidden rounded-3xl border p-6 transition-all duration-300 hover:-translate-y-1.5 hover:shadow-xl ${
                    featured
                      ? "border-ink-950 bg-ink-950 text-white hover:shadow-ink-900/30"
                      : "border-ink-100 bg-white hover:border-brand-200 hover:shadow-brand-900/10"
                  }`}
                >
                  {featured ? (
                    <div className="absolute -right-10 -bottom-10 size-48 animate-blob rounded-full bg-brand-600/40 blur-2xl" aria-hidden />
                  ) : (
                    <div
                      className="absolute inset-0 -z-0 origin-bottom scale-y-0 bg-gradient-to-t from-brand-50 to-transparent transition-transform duration-500 group-hover:scale-y-100"
                      aria-hidden
                    />
                  )}
                  <div className="relative flex h-full flex-col">
                    <span
                      className={`flex size-12 items-center justify-center rounded-2xl transition-all duration-300 group-hover:scale-110 group-hover:-rotate-6 ${
                        featured
                          ? "bg-brand-600 text-white"
                          : "bg-brand-50 text-brand-600 group-hover:bg-brand-600 group-hover:text-white"
                      }`}
                    >
                      <Icon name={cat.icon} className="size-6" />
                    </span>
                    <h3 className={`mt-5 text-lg font-bold ${featured ? "text-white lg:text-2xl" : ""}`}>{cat.name}</h3>
                    <p className={`mt-2 text-sm leading-relaxed ${featured ? "text-ink-300" : "text-ink-500"}`}>
                      {cat.description}
                    </p>
                    {featured && (
                      <p className="mt-6 hidden w-fit rounded-full border border-brand-500/40 bg-brand-600/20 px-3 py-1 text-xs font-semibold text-brand-200 lg:block">
                        Recommended starting point
                      </p>
                    )}
                    <div className="flex-1" />
                    <p
                      className={`mt-6 flex items-center gap-2 text-sm font-semibold ${
                        featured ? "text-brand-300" : "text-brand-600"
                      }`}
                    >
                      {counts[cat.id] ?? 0} courses
                      <Icon name="arrowRight" className="size-4 transition-transform duration-300 group-hover:translate-x-1.5" />
                    </p>
                  </div>
                </Link>
              </Reveal>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
