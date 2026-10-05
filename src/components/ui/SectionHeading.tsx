import type { ReactNode } from "react";
import { Reveal } from "@/components/motion/Reveal";

interface SectionHeadingProps {
  eyebrow?: string;
  title: ReactNode;
  description?: ReactNode;
  align?: "left" | "center";
  tone?: "light" | "dark";
}

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "center",
  tone = "light",
}: SectionHeadingProps) {
  const dark = tone === "dark";
  return (
    <Reveal className={align === "center" ? "mx-auto max-w-3xl text-center" : "max-w-2xl"}>
      {eyebrow && (
        <p
          className={`mb-3 inline-flex items-center gap-2 text-xs font-bold tracking-[0.2em] uppercase ${
            dark ? "text-brand-300" : "text-brand-600"
          }`}
        >
          <span className={`h-px w-6 ${dark ? "bg-brand-300" : "bg-brand-600"}`} />
          {eyebrow}
        </p>
      )}
      <h2
        className={`text-3xl leading-tight font-extrabold tracking-tight sm:text-4xl ${
          dark ? "text-white" : "text-ink-950"
        }`}
      >
        {title}
      </h2>
      {description && (
        <p className={`mt-4 text-base leading-relaxed sm:text-lg ${dark ? "text-ink-300" : "text-ink-500"}`}>
          {description}
        </p>
      )}
    </Reveal>
  );
}
