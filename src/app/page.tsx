import { CategoryGrid } from "@/components/home/CategoryGrid";
import { CtaBanner } from "@/components/home/CtaBanner";
import { Faq } from "@/components/home/Faq";
import { FeaturedCourses } from "@/components/home/FeaturedCourses";
import { Hero } from "@/components/home/Hero";
import { Journey } from "@/components/home/Journey";
import { LatestPosts } from "@/components/home/LatestPosts";
import { ModuleMarquee } from "@/components/home/ModuleMarquee";
import { Testimonials } from "@/components/home/Testimonials";
import { WhyUs } from "@/components/home/WhyUs";
import { getLatestPosts } from "@/lib/blog";
import { countCoursesByCategory, getCategories, getCourses, getFeaturedCourses } from "@/lib/courses";

export default async function HomePage() {
  const [categories, courses, featured, latestPosts] = await Promise.all([
    getCategories(),
    getCourses(),
    getFeaturedCourses(),
    getLatestPosts(),
  ]);

  return (
    <>
      <Hero />
      <ModuleMarquee />
      <CategoryGrid categories={categories} counts={countCoursesByCategory(courses)} />
      <FeaturedCourses courses={featured} total={courses.length} />
      <WhyUs />
      <Journey />
      <Testimonials />
      <Faq />
      <LatestPosts posts={latestPosts} />
      <div className="pt-20 sm:pt-28">
        <CtaBanner />
      </div>
    </>
  );
}
