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
            Comprehensive <span className="text-brand-400">SAP Courses</span> &amp; Certification Training in
            Coimbatore &amp; Trichy
          </>
        }
        description="Master in-demand SAP enterprise modules—from FICO, MM, and SD to ABAP, SuccessFactors, and BTP. Taught by certified consultants with 100% live server access, hands-on project labs, and dedicated placement support at our Coimbatore and Trichy centers."
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
        title="Not sure which SAP module matches your career goals?"
        description="Visit our Coimbatore (Peelamedu) or Trichy (Cantonment) centers, or book a free 1-on-1 demo and career counselling session with an active SAP consultant."
      />
    </>
  );
}
