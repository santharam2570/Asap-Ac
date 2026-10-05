import { CourseCard } from "@/components/courses/CourseCard";
import { Reveal } from "@/components/motion/Reveal";
import { ButtonLink } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Icon } from "@/components/ui/Icon";
import { SectionHeading } from "@/components/ui/SectionHeading";
import type { Course } from "@/types/course";

export function FeaturedCourses({ courses, total }: { courses: Course[]; total: number }) {
  return (
    <section className="bg-ink-50/70 py-20 sm:py-28">
      <Container>
        <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
          <SectionHeading
            align="left"
            eyebrow="Popular Programs"
            title="Most in-demand SAP courses"
            description="Our learners' top picks, designed around what employers are hiring for right now."
          />
          <Reveal variant="right">
            <ButtonLink href="/courses" variant="outline">
              View all {total} courses
              <Icon name="arrowRight" className="size-4 transition-transform group-hover/btn:translate-x-1" />
            </ButtonLink>
          </Reveal>
        </div>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {courses.map((course, i) => (
            <Reveal key={course.slug} delay={(i % 3) * 120} className="h-full">
              <CourseCard course={course} />
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
