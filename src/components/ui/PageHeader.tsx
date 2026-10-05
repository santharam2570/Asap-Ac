import Link from "next/link";
import type { ReactNode } from "react";
import { Container } from "@/components/ui/Container";
import { Icon } from "@/components/ui/Icon";

interface PageHeaderProps {
  title: ReactNode;
  description?: ReactNode;
  breadcrumbs?: { label: string; href?: string }[];
  children?: ReactNode;
}

const delay = (ms: number) => ({ animationDelay: `${ms}ms` });

export function PageHeader({ title, description, breadcrumbs = [], children }: PageHeaderProps) {
  return (
    <section className="relative overflow-hidden bg-ink-950 text-white">
      <div className="bg-grid-dark absolute inset-0 animate-fade-in" aria-hidden />
      <div className="absolute -top-24 right-0 size-96 animate-blob rounded-full bg-brand-600/30 blur-3xl" aria-hidden />
      <div
        className="absolute -bottom-32 -left-20 size-80 animate-blob rounded-full bg-brand-500/15 blur-3xl"
        style={delay(5000)}
        aria-hidden
      />
      <div
        className="absolute top-1/2 right-[8%] hidden size-56 -translate-y-1/2 animate-spin-slow rounded-full border border-dashed border-white/10 lg:block"
        aria-hidden
      >
        <span className="absolute top-0 left-1/2 size-2.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-brand-400 shadow-[0_0_12px] shadow-brand-400" />
      </div>
      <div
        className="absolute top-1/2 right-[8%] hidden size-56 -translate-y-1/2 scale-[0.6] animate-spin-slower rounded-full border border-white/10 lg:block"
        aria-hidden
      />

      <Container className="relative py-16 sm:py-20">
        <nav aria-label="Breadcrumb" className="mb-6 animate-fade-up" style={delay(0)}>
          <ol className="flex flex-wrap items-center gap-1.5 text-sm text-ink-400">
            <li>
              <Link href="/" className="transition-colors hover:text-white">
                Home
              </Link>
            </li>
            {breadcrumbs.map((b) => (
              <li key={b.label} className="flex items-center gap-1.5">
                <Icon name="arrowRight" className="size-3.5 opacity-50" />
                {b.href ? (
                  <Link href={b.href} className="transition-colors hover:text-white">
                    {b.label}
                  </Link>
                ) : (
                  <span className="text-brand-300">{b.label}</span>
                )}
              </li>
            ))}
          </ol>
        </nav>
        <h1
          className="max-w-4xl animate-fade-up text-4xl font-black tracking-tight text-white sm:text-5xl"
          style={delay(100)}
        >
          {title}
        </h1>
        {description && (
          <p className="mt-5 max-w-2xl animate-fade-up text-lg leading-relaxed text-ink-300" style={delay(200)}>
            {description}
          </p>
        )}
        {children && (
          <div className="animate-fade-up" style={delay(300)}>
            {children}
          </div>
        )}
      </Container>
    </section>
  );
}
