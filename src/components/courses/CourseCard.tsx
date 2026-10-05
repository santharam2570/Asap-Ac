import Link from "next/link";
import { categories } from "@/data/categories";
import { Icon } from "@/components/ui/Icon";
import type { Course } from "@/types/course";

const levelStyles: Record<Course["level"], string> = {
  Beginner: "bg-emerald-50 text-emerald-700 ring-emerald-600/15",
  Intermediate: "bg-brand-50 text-brand-700 ring-brand-600/15",
  Advanced: "bg-ink-900 text-white ring-ink-900",
};

export function CourseCard({ course }: { course: Course }) {
  const category = categories.find((c) => c.id === course.category);

  return (
    <Link
      href={`/courses/${course.slug}`}
      className="group relative flex h-full flex-col overflow-hidden rounded-3xl border border-ink-100 bg-white p-6 transition-all duration-300 hover:-translate-y-1 hover:border-brand-200 hover:shadow-2xl hover:shadow-brand-900/10"
    >
      <div className="absolute inset-x-0 top-0 h-1 origin-left scale-x-0 bg-gradient-to-r from-brand-600 to-brand-400 transition-transform duration-300 group-hover:scale-x-100" />

      <div className="flex items-start justify-between gap-3">
        <div className="flex size-12 items-center justify-center rounded-2xl bg-brand-50 text-brand-600 transition-all duration-300 group-hover:scale-110 group-hover:-rotate-6 group-hover:bg-brand-600 group-hover:text-white group-hover:shadow-lg group-hover:shadow-brand-600/30">
          {category && <Icon name={category.icon} className="size-6" />}
        </div>
        <span className={`rounded-full px-2.5 py-1 text-[11px] font-semibold ring-1 ring-inset ${levelStyles[course.level]}`}>
          {course.level}
        </span>
      </div>

      <p className="mt-5 text-xs font-semibold tracking-wider text-ink-400 uppercase">
        {course.code} · {category?.name}
      </p>
      <h3 className="mt-1.5 text-lg leading-snug font-bold text-ink-950 group-hover:text-brand-700">{course.title}</h3>
      <p className="mt-2 line-clamp-3 text-sm leading-relaxed text-ink-500">{course.summary}</p>

      <div className="flex-1" />
      <div className="mt-6 flex items-center justify-between border-t border-ink-100 pt-5">
        <div className="flex items-center gap-4 text-xs font-medium text-ink-500">
          <span className="flex items-center gap-1.5">
            <Icon name="calendar" className="size-4 text-brand-500" />
            {course.durationWeeks} weeks
          </span>
          <span className="flex items-center gap-1.5">
            <Icon name="clock" className="size-4 text-brand-500" />
            {course.hours} hrs
          </span>
        </div>
        <span className="flex size-9 items-center justify-center rounded-full bg-ink-50 text-ink-700 transition-all duration-300 group-hover:bg-brand-600 group-hover:text-white">
          <Icon name="arrowRight" className="size-4 transition-transform duration-300 group-hover:-rotate-45" />
        </span>
      </div>
    </Link>
  );
}
