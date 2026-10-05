import Link from "next/link";
import type { ComponentProps, ReactNode } from "react";

type Variant = "primary" | "secondary" | "outline" | "ghost" | "white";
type Size = "sm" | "md" | "lg";

const base =
  "group/btn relative isolate overflow-hidden inline-flex items-center justify-center gap-2 rounded-full font-semibold transition-all duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-600 disabled:pointer-events-none disabled:opacity-60";

const variants: Record<Variant, string> = {
  primary:
    "bg-brand-600 text-white shadow-lg shadow-brand-600/25 hover:bg-brand-700 hover:shadow-brand-700/30 hover:-translate-y-0.5",
  secondary: "bg-ink-950 text-white hover:bg-ink-800 hover:-translate-y-0.5",
  outline:
    "border border-ink-200 bg-white text-ink-900 hover:border-brand-600 hover:text-brand-700",
  ghost: "text-brand-700 hover:bg-brand-50",
  white: "bg-white text-brand-700 shadow-lg hover:bg-brand-50 hover:-translate-y-0.5",
};

const sizes: Record<Size, string> = {
  sm: "h-9 px-4 text-sm",
  md: "h-11 px-6 text-sm",
  lg: "h-13 px-8 text-base",
};

export function buttonClasses(variant: Variant = "primary", size: Size = "md", className = "") {
  return `${base} ${variants[variant]} ${sizes[size]} ${className}`;
}

interface ButtonLinkProps extends Omit<ComponentProps<typeof Link>, "className"> {
  variant?: Variant;
  size?: Size;
  className?: string;
  children: ReactNode;
}

export function ButtonShine() {
  return (
    <span
      aria-hidden
      className="pointer-events-none absolute inset-y-0 left-0 -z-10 w-1/3 -translate-x-[120%] bg-gradient-to-r from-transparent via-white/35 to-transparent group-hover/btn:animate-shine"
    />
  );
}

export function ButtonLink({ variant = "primary", size, className, children, ...props }: ButtonLinkProps) {
  return (
    <Link className={buttonClasses(variant, size, className)} {...props}>
      {variant !== "outline" && variant !== "ghost" && <ButtonShine />}
      {children}
    </Link>
  );
}
