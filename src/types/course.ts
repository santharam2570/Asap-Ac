export type CategoryId =
  | "s4hana"
  | "finance"
  | "logistics"
  | "hr"
  | "technical"
  | "cloud"
  | "analytics";

export type IconName =
  | "layers"
  | "finance"
  | "truck"
  | "users"
  | "code"
  | "cloud"
  | "chart";

export interface Category {
  id: CategoryId;
  name: string;
  description: string;
  icon: IconName;
}

export type CourseLevel = "Beginner" | "Intermediate" | "Advanced";

export interface CourseModule {
  title: string;
  topics: string[];
}

export interface Course {
  slug: string;
  code: string;
  title: string;
  category: CategoryId;
  level: CourseLevel;
  durationWeeks: number;
  hours: number;
  summary: string;
  description: string;
  highlights: string[];
  modules: CourseModule[];
  careerRoles: string[];
  prerequisites: string[];
  featured?: boolean;
}
