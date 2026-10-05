"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { branches, mainNav, siteConfig } from "@/config/site";
import { ButtonLink } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Icon } from "@/components/ui/Icon";
import { Logo } from "@/components/ui/Logo";

export function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
  }, [open]);

  const isActive = (href: string) => (href === "/" ? pathname === "/" : pathname.startsWith(href));

  return (
    <header className="sticky top-0 z-50">
      <div className="hidden bg-ink-950 text-xs text-ink-300 md:block">
        <Container className="flex h-9 items-center justify-between">
          <p>
            <span className="font-semibold text-white">New batches every month</span> · Branches in{" "}
            {branches.map((b) => b.name).join(" & ")}
          </p>
          <div className="flex items-center gap-5">
            {branches.map((b) => (
              <a key={b.id} href={b.phoneHref} className="flex items-center gap-1.5 transition-colors hover:text-white">
                <Icon name="phone" className="size-3.5" />
                <span className="text-ink-500">{b.name}:</span> {b.phone}
              </a>
            ))}
          </div>
        </Container>
      </div>

      <nav
        className={`border-b transition-all duration-300 ${
          scrolled ? "border-ink-100 bg-white/90 shadow-sm backdrop-blur-lg" : "border-transparent bg-white"
        }`}
      >
        <Container className="flex h-18 animate-slide-down items-center justify-between">
          <Logo priority />

          <ul className="hidden items-center gap-1 lg:flex">
            {mainNav.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className={`group/nav relative rounded-full px-4 py-2 text-sm font-semibold transition-colors ${
                    isActive(item.href) ? "text-brand-700" : "text-ink-600 hover:text-ink-950"
                  }`}
                >
                  {item.label}
                  <span
                    className={`absolute inset-x-4 -bottom-0.5 h-0.5 origin-left rounded-full bg-brand-600 transition-transform duration-300 ${
                      isActive(item.href) ? "scale-x-100" : "scale-x-0 group-hover/nav:scale-x-100"
                    }`}
                  />
                </Link>
              </li>
            ))}
          </ul>

          <div className="hidden items-center gap-3 lg:flex">
            <ButtonLink href="/contact" size="sm" variant="primary">
              Book a Free Demo
            </ButtonLink>
          </div>

          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            className="inline-flex size-11 items-center justify-center rounded-full text-ink-900 hover:bg-ink-50 lg:hidden"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
          >
            <Icon name={open ? "close" : "menu"} className="size-6" />
          </button>
        </Container>
      </nav>

      <div
        className={`fixed inset-x-0 top-18 bottom-0 z-40 bg-white transition-all duration-300 lg:hidden ${
          open ? "visible opacity-100" : "invisible opacity-0"
        }`}
      >
        <Container className="flex h-full flex-col py-6">
          <ul className="flex flex-col gap-1">
            {mainNav.map((item, i) => (
              <li
                key={item.href}
                className={open ? "animate-fade-up" : "opacity-0"}
                style={{ animationDelay: `${80 + i * 60}ms` }}
              >
                <Link
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className={`flex items-center justify-between rounded-2xl px-4 py-4 text-lg font-semibold ${
                    isActive(item.href) ? "bg-brand-50 text-brand-700" : "text-ink-800 hover:bg-ink-50"
                  }`}
                >
                  {item.label}
                  <Icon name="arrowRight" className="size-5 opacity-50" />
                </Link>
              </li>
            ))}
          </ul>
          <div className="mt-auto flex flex-col gap-3 border-t border-ink-100 pt-6">
            <ButtonLink href="/contact" size="lg" onClick={() => setOpen(false)}>
              Book a Free Demo
            </ButtonLink>
            <a
              href={siteConfig.contact.phoneHref}
              className="flex items-center justify-center gap-2 py-2 text-sm font-semibold text-ink-600"
            >
              <Icon name="phone" className="size-4" /> {siteConfig.contact.phone}
            </a>
          </div>
        </Container>
      </div>
    </header>
  );
}
