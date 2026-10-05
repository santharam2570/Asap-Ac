import { categories } from "@/data/categories";
import { courses } from "@/data/courses";
import type { Category, CategoryId, Course } from "@/types/course";

// Pages read catalogue data only through these functions. When the Python
// backend is ready, swap the bodies for `apiGet(...)` calls from `@/lib/api`.

export async function getCategories(): Promise<Category[]> {
  return categories;
}

export async function getCategory(id: CategoryId): Promise<Category | undefined> {
  return categories.find((c) => c.id === id);
}

export async function getCourses(): Promise<Course[]> {
  return courses;
}

export async function getFeaturedCourses(): Promise<Course[]> {
  return courses.filter((c) => c.featured);
}

export async function getCourseBySlug(slug: string): Promise<Course | undefined> {
  return courses.find((c) => c.slug === slug);
}

export async function getRelatedCourses(course: Course, limit = 3): Promise<Course[]> {
  return courses
    .filter((c) => c.category === course.category && c.slug !== course.slug)
    .slice(0, limit);
}

export function countCoursesByCategory(list: Course[]): Record<CategoryId, number> {
  return list.reduce(
    (acc, c) => {
      acc[c.category] = (acc[c.category] ?? 0) + 1;
      return acc;
    },
    {} as Record<CategoryId, number>,
  );
}
