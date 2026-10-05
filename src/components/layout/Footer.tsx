import Link from "next/link";
import type { ReactNode } from "react";
import { branches, mainNav, siteConfig } from "@/config/site";
import { BranchCard } from "@/components/branches/BranchCard";
import { categories } from "@/data/categories";
import { courses } from "@/data/courses";
import { Reveal } from "@/components/motion/Reveal";
import { Container } from "@/components/ui/Container";
import { Icon, type IconKey } from "@/components/ui/Icon";
import { Logo } from "@/components/ui/Logo";
import { SocialIcon, type SocialName } from "@/components/ui/SocialIcon";

const popular = courses.filter((c) => c.featured).slice(0, 6);
const { contact } = siteConfig;

const socials: { name: SocialName; label: string; href: string }[] = [
  { name: "linkedin", label: "LinkedIn", href: siteConfig.social.linkedin },
  { name: "youtube", label: "YouTube", href: siteConfig.social.youtube },
  { name: "instagram", label: "Instagram", href: siteConfig.social.instagram },
  { name: "facebook", label: "Facebook", href: siteConfig.social.facebook },
];

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="relative overflow-hidden bg-ink-950 text-ink-300">
      <div className="bg-grid-dark absolute inset-0 opacity-60" aria-hidden />
      <div className="absolute -top-40 left-1/2 h-80 w-[48rem] -translate-x-1/2 animate-blob rounded-full bg-brand-600/20 blur-3xl" aria-hidden />

      <Container className="relative">
        <div className="pt-16">
          <Reveal className="mb-6 flex items-end justify-between gap-4">
            <h2 className="font-display text-2xl font-extrabold text-white">
              Visit our <span className="text-brand-400">branches</span>
            </h2>
            <Link
              href="/contact#branches"
              className="hidden text-sm font-semibold text-brand-300 transition-colors hover:text-white sm:block"
            >
              View on map →
            </Link>
          </Reveal>
          <div className="grid gap-4 lg:grid-cols-[1fr_1fr_0.8fr]">
            {branches.map((b, i) => (
              <Reveal key={b.id} delay={i * 120} className="h-full">
                <BranchCard branch={b} tone="dark" />
              </Reveal>
            ))}
            <Reveal delay={240} className="h-full">
              <div className="flex h-full flex-col gap-4 rounded-3xl bg-brand-600 p-6 text-white sm:p-7">
                <h3 className="font-display text-xl font-extrabold text-white">Get in touch</h3>
                <ContactRow icon="mail" label="Email" href={`mailto:${contact.email}`} value={contact.email} />
                <ContactRow
                  icon="monitor"
                  label="Website"
                  href={`https://${siteConfig.domain}`}
                  value={siteConfig.domain}
                />
                {branches.map((b) => (
                  <ContactRow key={b.id} icon="phone" label={b.name} href={b.phoneHref} value={b.phone} />
                ))}
              </div>
            </Reveal>
          </div>
        </div>

        <div className="grid gap-12 py-16 md:grid-cols-2 lg:grid-cols-12">
          <Reveal className="lg:col-span-4">
            <Logo tone="light" />
            <p className="mt-2 text-xs font-semibold tracking-[0.3em] text-brand-300 uppercase">
              {siteConfig.tagline}
            </p>
            <p className="mt-5 max-w-sm text-sm leading-relaxed text-ink-400">
              Industry-focused SAP training by certified consultants. Learn with live projects, real system access
              and dedicated placement support.
            </p>
            <div className="mt-6 flex gap-3">
              {socials.map((s) => (
                <a
                  key={s.name}
                  href={s.href}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={s.label}
                  className="flex size-10 items-center justify-center rounded-full bg-white/5 text-white ring-1 ring-white/10 transition-all duration-300 hover:-translate-y-1 hover:bg-brand-600 hover:ring-brand-500"
                >
                  <SocialIcon name={s.name} />
                </a>
              ))}
            </div>
            <a
              href={contact.whatsappHref}
              target="_blank"
              rel="noreferrer"
              className="mt-6 inline-flex items-center gap-2 rounded-full bg-[#25d366] px-5 py-2.5 text-sm font-semibold text-white transition-transform hover:-translate-y-0.5"
            >
              <Icon name="whatsapp" className="size-4" /> Chat on WhatsApp
            </a>
          </Reveal>

          <FooterColumn title="Quick Links" className="lg:col-span-2" delay={100}>
            {mainNav.map((item) => (
              <FooterLink key={item.href} href={item.href}>
                {item.label}
              </FooterLink>
            ))}
          </FooterColumn>

          <FooterColumn title="Popular Courses" className="lg:col-span-3" delay={200}>
            {popular.map((c) => (
              <FooterLink key={c.slug} href={`/courses/${c.slug}`}>
                {c.title}
              </FooterLink>
            ))}
          </FooterColumn>

          <FooterColumn title="SAP Tracks" className="lg:col-span-3" delay={300}>
            {categories.map((c) => (
              <FooterLink key={c.id} href={`/courses?category=${c.id}`}>
                {c.name}
              </FooterLink>
            ))}
          </FooterColumn>
        </div>

        <div className="flex flex-col gap-3 border-t border-white/10 py-6 text-xs text-ink-500 md:flex-row md:items-center md:justify-between">
          <p>
            © {year} <span className="font-semibold text-ink-300">{siteConfig.name}</span>. All rights reserved.
          </p>
          <p className="md:text-right">
            SAP and other SAP products are trademarks of SAP SE. {siteConfig.name} is an independent training
            institute.
          </p>
        </div>
      </Container>
    </footer>
  );
}

function ContactRow({ icon, label, href, value }: { icon: IconKey; label: string; href: string; value: string }) {
  return (
    <a
      href={href}
      target={href.startsWith("http") ? "_blank" : undefined}
      rel="noreferrer"
      className="group/row flex items-center gap-3 rounded-2xl bg-white/10 p-3 transition-colors hover:bg-white/20"
    >
      <span className="flex size-9 shrink-0 items-center justify-center rounded-xl bg-white text-brand-600 transition-transform group-hover/row:scale-110">
        <Icon name={icon} className="size-4" />
      </span>
      <span className="min-w-0">
        <span className="block text-[11px] font-medium text-brand-100">{label}</span>
        <span className="block truncate text-sm font-semibold">{value}</span>
      </span>
    </a>
  );
}

function FooterColumn({
  title,
  className,
  delay,
  children,
}: {
  title: string;
  className?: string;
  delay: number;
  children: ReactNode;
}) {
  return (
    <Reveal delay={delay} className={className}>
      <h3 className="mb-5 font-display text-sm font-bold tracking-wide text-white">{title}</h3>
      <ul className="space-y-3 text-sm">{children}</ul>
    </Reveal>
  );
}

function FooterLink({ href, children }: { href: string; children: ReactNode }) {
  return (
    <li>
      <Link href={href} className="group/link inline-flex items-center gap-2 transition-colors hover:text-white">
        <span className="h-px w-0 bg-brand-400 transition-all duration-300 group-hover/link:w-3" />
        {children}
      </Link>
    </li>
  );
}
