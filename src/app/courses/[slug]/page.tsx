import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { CourseCard } from "@/components/courses/CourseCard";
import { EnquiryForm } from "@/components/forms/EnquiryForm";
import { Reveal } from "@/components/motion/Reveal";
import { CtaBanner } from "@/components/home/CtaBanner";
import { Container } from "@/components/ui/Container";
import { Icon, type IconKey } from "@/components/ui/Icon";
import { PageHeader } from "@/components/ui/PageHeader";
import { getCategory, getCourseBySlug, getCourses, getRelatedCourses } from "@/lib/courses";

export async function generateStaticParams() {
  const courses = await getCourses();
  return courses.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({ params }: PageProps<"/courses/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const course = await getCourseBySlug(slug);
  if (!course) return {};
  return {
    title: `${course.title} Training`,
    description: course.summary,
  };
}

export default async function CourseDetailPage({ params }: PageProps<"/courses/[slug]">) {
  const { slug } = await params;
  const course = await getCourseBySlug(slug);
  if (!course) notFound();

  const [category, related, allCourses] = await Promise.all([
    getCategory(course.category),
    getRelatedCourses(course),
    getCourses(),
  ]);
  const topicCount = course.modules.reduce((n, m) => n + m.topics.length, 0);

  const facts: { icon: IconKey; label: string; value: string }[] = [
    { icon: "calendar", label: "Duration", value: `${course.durationWeeks} weeks` },
    { icon: "clock", label: "Training hours", value: `${course.hours} hours` },
    { icon: "signal", label: "Level", value: course.level },
    { icon: "monitor", label: "Mode", value: "Online & Classroom" },
  ];

  return (
    <>
      <PageHeader
        breadcrumbs={[
          { label: "Courses", href: "/courses" },
          ...(category ? [{ label: category.name, href: `/courses?category=${category.id}` }] : []),
          { label: course.title },
        ]}
        title={course.title}
        description={course.summary}
      >
        <div className="mt-8 flex flex-wrap gap-3">
          {facts.map((f) => (
            <span
              key={f.label}
              className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-ink-200"
            >
              <Icon name={f.icon} className="size-4 text-brand-400" />
              {f.value}
            </span>
          ))}
        </div>
      </PageHeader>

      <section className="py-14 sm:py-20">
        <Container className="grid gap-12 lg:grid-cols-[1fr_380px]">
          <div className="min-w-0 space-y-14">
            <Reveal>
              <h2 className="text-2xl font-extrabold">Course overview</h2>
              <p className="mt-4 text-lg leading-relaxed text-ink-600">{course.description}</p>
              <ul className="mt-8 grid gap-3 sm:grid-cols-2">
                {course.highlights.map((h, i) => (
                  <Reveal
                    as="li"
                    key={h}
                    delay={150 + i * 90}
                    className="group flex items-start gap-3 rounded-2xl border border-ink-100 bg-ink-50/50 p-4 hover:border-brand-200 hover:bg-white hover:shadow-md"
                  >
                    <span className="mt-0.5 flex size-6 shrink-0 items-center justify-center rounded-full bg-brand-600 text-white transition-transform duration-300 group-hover:scale-110">
                      <Icon name="check" className="size-3.5" strokeWidth={3} />
                    </span>
                    <span className="text-sm font-medium text-ink-800">{h}</span>
                  </Reveal>
                ))}
              </ul>
            </Reveal>

            <Reveal>
              <div className="flex flex-wrap items-end justify-between gap-3">
                <h2 className="text-2xl font-extrabold">Syllabus</h2>
                <p className="text-sm text-ink-500">
                  {course.modules.length} modules · {topicCount} topics
                </p>
              </div>
              <div className="mt-6 space-y-3">
                {course.modules.map((m, i) => (
                  <Reveal key={m.title} variant="left" delay={i * 80}>
                  <details
                    open={i === 0}
                    className="group overflow-hidden rounded-2xl border border-ink-100 bg-white transition-all duration-300 open:border-brand-200 open:shadow-lg open:shadow-brand-900/5 hover:border-brand-200"
                  >
                    <summary className="flex cursor-pointer list-none items-center gap-4 p-5 [&::-webkit-details-marker]:hidden">
                      <span className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-ink-950 font-display text-sm font-bold text-white transition-all duration-300 group-hover:scale-105 group-open:bg-brand-600">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <span className="flex-1">
                        <span className="block font-bold text-ink-950">{m.title}</span>
                        <span className="text-xs text-ink-500">{m.topics.length} topics</span>
                      </span>
                      <Icon name="plus" className="size-5 text-ink-400 transition-transform duration-300 group-open:rotate-45 group-open:text-brand-600" />
                    </summary>
                    <ul className="grid gap-2 border-t border-ink-100 bg-ink-50/40 px-5 py-5 sm:grid-cols-2 sm:pl-19">
                      {m.topics.map((t, ti) => (
                        <li
                          key={t}
                          className="flex animate-fade-up items-start gap-2 text-sm text-ink-700 [animation-duration:450ms]"
                          style={{ animationDelay: `${ti * 50}ms` }}
                        >
                          <Icon name="check" className="mt-0.5 size-4 shrink-0 text-brand-600" />
                          {t}
                        </li>
                      ))}
                    </ul>
                  </details>
                  </Reveal>
                ))}
              </div>
            </Reveal>

            <div className="grid gap-6 sm:grid-cols-2">
              <Reveal variant="left" className="rounded-3xl bg-ink-950 p-7 text-white">
                <span className="flex size-11 items-center justify-center rounded-xl bg-brand-600">
                  <Icon name="briefcase" className="size-5" />
                </span>
                <h3 className="mt-5 text-lg font-bold text-white">Career opportunities</h3>
                <ul className="mt-4 space-y-2.5">
                  {course.careerRoles.map((r) => (
                    <li key={r} className="flex items-center gap-2 text-sm text-ink-300">
                      <span className="size-1.5 rounded-full bg-brand-400" />
                      {r}
                    </li>
                  ))}
                </ul>
              </Reveal>
              <Reveal variant="right" delay={120} className="rounded-3xl border border-ink-100 bg-brand-50/50 p-7">
                <span className="flex size-11 items-center justify-center rounded-xl bg-white text-brand-600 shadow-sm">
                  <Icon name="target" className="size-5" />
                </span>
                <h3 className="mt-5 text-lg font-bold">Who should join</h3>
                <ul className="mt-4 space-y-2.5">
                  {course.prerequisites.map((p) => (
                    <li key={p} className="flex items-center gap-2 text-sm text-ink-600">
                      <span className="size-1.5 rounded-full bg-brand-600" />
                      {p}
                    </li>
                  ))}
                </ul>
              </Reveal>
            </div>
          </div>

          <aside className="lg:sticky lg:top-28 lg:self-start">
            <Reveal variant="right" className="rounded-3xl border border-ink-100 bg-white p-6 shadow-xl shadow-ink-900/5">
              <p className="text-xs font-bold tracking-widest text-brand-600 uppercase">{course.code}</p>
              <h2 className="mt-1 text-xl font-extrabold">Enquire about this course</h2>
              <dl className="mt-5 grid grid-cols-2 gap-3">
                {facts.map((f) => (
                  <div key={f.label} className="rounded-xl bg-ink-50 p-3">
                    <dt className="text-[11px] font-medium text-ink-500">{f.label}</dt>
                    <dd className="mt-0.5 text-sm font-bold text-ink-900">{f.value}</dd>
                  </div>
                ))}
              </dl>
              <div className="mt-6 border-t border-ink-100 pt-6">
                <EnquiryForm
                  compact
                  source="course"
                  defaultCourse={course.slug}
                  courseOptions={allCourses.map(({ slug, title }) => ({ slug, title }))}
                />
              </div>
            </Reveal>
          </aside>
        </Container>
      </section>

      {related.length > 0 && (
        <section className="bg-ink-50/70 py-16 sm:py-20">
          <Container>
            <h2 className="text-2xl font-extrabold">Related courses in {category?.name}</h2>
            <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {related.map((c, i) => (
                <Reveal key={c.slug} delay={i * 120} className="h-full">
                  <CourseCard course={c} />
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
