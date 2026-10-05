"use client";

import { useSearchParams } from "next/navigation";
import { useMemo, useState } from "react";
import { CourseCard } from "@/components/courses/CourseCard";
import { Icon } from "@/components/ui/Icon";
import type { Category, CategoryId, Course, CourseLevel } from "@/types/course";

interface CourseExplorerProps {
  courses: Course[];
  categories: Category[];
}

const levels: CourseLevel[] = ["Beginner", "Intermediate", "Advanced"];

export function CourseExplorer({ courses, categories }: CourseExplorerProps) {
  const searchParams = useSearchParams();
  const initialCategory = searchParams.get("category");
  const [category, setCategory] = useState<CategoryId | "all">(
    categories.some((c) => c.id === initialCategory) ? (initialCategory as CategoryId) : "all",
  );
  const [level, setLevel] = useState<CourseLevel | "all">("all");
  const [query, setQuery] = useState("");

  const selectCategory = (id: CategoryId | "all") => {
    setCategory(id);
    const url = new URL(window.location.href);
    if (id === "all") url.searchParams.delete("category");
    else url.searchParams.set("category", id);
    window.history.replaceState(null, "", url);
  };

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return courses.filter((c) => {
      if (category !== "all" && c.category !== category) return false;
      if (level !== "all" && c.level !== level) return false;
      if (!q) return true;
      return [c.title, c.code, c.summary, ...c.modules.flatMap((m) => [m.title, ...m.topics])]
        .join(" ")
        .toLowerCase()
        .includes(q);
    });
  }, [courses, category, level, query]);

  const countFor = (id: CategoryId | "all") =>
    id === "all" ? courses.length : courses.filter((c) => c.category === id).length;

  return (
    <div className="grid gap-10 lg:grid-cols-[260px_1fr]">
      <aside className="lg:sticky lg:top-28 lg:self-start">
        <label className="relative block">
          <span className="sr-only">Search courses</span>
          <Icon name="search" className="pointer-events-none absolute top-1/2 left-4 size-5 -translate-y-1/2 text-ink-400" />
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search courses or topics…"
            className="h-12 w-full rounded-2xl border border-ink-200 bg-white pr-4 pl-12 text-sm text-ink-900 placeholder:text-ink-400 focus:border-brand-500 focus:ring-4 focus:ring-brand-500/15 focus:outline-none"
          />
        </label>

        <div className="mt-8">
          <h2 className="mb-3 text-xs font-bold tracking-widest text-ink-400 uppercase">Categories</h2>
          <ul className="-mx-1 flex gap-2 overflow-x-auto pb-2 lg:mx-0 lg:flex-col lg:gap-1 lg:overflow-visible lg:pb-0">
            {[{ id: "all" as const, name: "All Courses" }, ...categories].map((c) => {
              const active = category === c.id;
              return (
                <li key={c.id} className="shrink-0">
                  <button
                    type="button"
                    onClick={() => selectCategory(c.id)}
                    className={`flex w-full items-center justify-between gap-3 rounded-xl px-4 py-2.5 text-left text-sm font-semibold whitespace-nowrap transition-colors ${
                      active
                        ? "bg-brand-600 text-white shadow-md shadow-brand-600/20"
                        : "bg-ink-50 text-ink-700 hover:bg-brand-50 hover:text-brand-700 lg:bg-transparent"
                    }`}
                  >
                    {c.name}
                    <span
                      className={`rounded-full px-2 py-0.5 text-xs ${active ? "bg-white/20" : "bg-ink-100 text-ink-500"}`}
                    >
                      {countFor(c.id)}
                    </span>
                  </button>
                </li>
              );
            })}
          </ul>
        </div>

        <div className="mt-8">
          <h2 className="mb-3 text-xs font-bold tracking-widest text-ink-400 uppercase">Level</h2>
          <div className="flex flex-wrap gap-2">
            {(["all", ...levels] as const).map((l) => (
              <button
                key={l}
                type="button"
                onClick={() => setLevel(l)}
                className={`rounded-full border px-4 py-1.5 text-xs font-semibold transition-colors ${
                  level === l
                    ? "border-ink-950 bg-ink-950 text-white"
                    : "border-ink-200 text-ink-600 hover:border-brand-500 hover:text-brand-700"
                }`}
              >
                {l === "all" ? "All levels" : l}
              </button>
            ))}
          </div>
        </div>
      </aside>

      <div>
        <p className="mb-6 text-sm text-ink-500" aria-live="polite">
          Showing <span className="font-bold text-ink-900">{filtered.length}</span> of {courses.length} courses
        </p>
        {filtered.length > 0 ? (
          <div key={`${category}-${level}`} className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
            {filtered.map((course, i) => (
              <div key={course.slug} className="h-full animate-fade-up" style={{ animationDelay: `${Math.min(i, 8) * 60}ms` }}>
                <CourseCard course={course} />
              </div>
            ))}
          </div>
        ) : (
          <div className="rounded-3xl border border-dashed border-ink-200 p-12 text-center">
            <Icon name="search" className="mx-auto size-10 text-ink-300" />
            <p className="mt-4 font-semibold text-ink-900">No courses match your filters</p>
            <p className="mt-1 text-sm text-ink-500">Try a different keyword or clear the filters.</p>
            <button
              type="button"
              onClick={() => {
                setQuery("");
                setLevel("all");
                selectCategory("all");
              }}
              className="mt-5 text-sm font-semibold text-brand-600 hover:underline"
            >
              Clear all filters
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
