import type { Metadata } from "next";
import { Suspense } from "react";
import { CourseCard } from "@/components/courses/CourseCard";
import { CourseExplorer } from "@/components/courses/CourseExplorer";
import { CtaBanner } from "@/components/home/CtaBanner";
import { Container } from "@/components/ui/Container";
import { PageHeader } from "@/components/ui/PageHeader";
import { getCategories, getCourses } from "@/lib/courses";

export const metadata: Metadata = {
  title: "All SAP Courses",
  description:
    "Browse every SAP course at ASAP Academy: S/4HANA, FICO, MM, SD, PP, ABAP, Fiori, Basis, SuccessFactors, BTP, Integration Suite, BW/4HANA, SAC and more.",
};

export default async function CoursesPage() {
  const [courses, categories] = await Promise.all([getCourses(), getCategories()]);

  return (
    <>
      <PageHeader
        breadcrumbs={[{ label: "Courses" }]}
        title={
          <>
            Explore all <span className="text-brand-400">SAP courses</span>
          </>
        }
        description={`${courses.length} industry-aligned programs across ${categories.length} tracks. Filter by module or level, or search for any topic.`}
      />

      <section className="py-14 sm:py-20">
        <Container>
          <Suspense
            fallback={
              <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
                {courses.map((course) => (
                  <CourseCard key={course.slug} course={course} />
                ))}
              </div>
            }
          >
            <CourseExplorer courses={courses} categories={categories} />
          </Suspense>
        </Container>
      </section>

      <CtaBanner
        title="Not sure which SAP module is right for you?"
        description="Get free one-on-one career counselling from our SAP mentors."
      />
    </>
  );
}
