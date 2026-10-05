import type { Metadata } from "next";
import { BranchCard } from "@/components/branches/BranchCard";
import { EnquiryForm } from "@/components/forms/EnquiryForm";
import { Reveal } from "@/components/motion/Reveal";
import { Container } from "@/components/ui/Container";
import { Icon, type IconKey } from "@/components/ui/Icon";
import { PageHeader } from "@/components/ui/PageHeader";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { SocialIcon, type SocialName } from "@/components/ui/SocialIcon";
import { branches, siteConfig } from "@/config/site";
import { getCourses } from "@/lib/courses";

export const metadata: Metadata = {
  title: "Contact Us – Trichy & Coimbatore Branches",
  description: `Contact ${siteConfig.name} in Tiruchirappalli or Coimbatore to book a free SAP demo class or career counselling session.`,
};

const { contact } = siteConfig;

const channels: { icon: IconKey; label: string; value: string; href: string }[] = [
  ...branches.map((b) => ({
    icon: "phone" as const,
    label: `Call ${b.name}`,
    value: b.phone,
    href: b.phoneHref,
  })),
  { icon: "whatsapp", label: "WhatsApp", value: "Chat with a counsellor", href: contact.whatsappHref },
  { icon: "mail", label: "Email", value: contact.email, href: `mailto:${contact.email}` },
];

const socials: { name: SocialName; label: string; href: string; hover: string }[] = [
  { name: "instagram", label: "Instagram", href: siteConfig.social.instagram, hover: "hover:bg-[#e1306c]" },
  { name: "facebook", label: "Facebook", href: siteConfig.social.facebook, hover: "hover:bg-[#1877f2]" },
  { name: "youtube", label: "YouTube", href: siteConfig.social.youtube, hover: "hover:bg-[#ff0000]" },
  { name: "linkedin", label: "LinkedIn", href: siteConfig.social.linkedin, hover: "hover:bg-[#0a66c2]" },
];

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": branches.map((b) => ({
    "@type": "EducationalOrganization",
    "@id": `${siteConfig.url}/#branch-${b.id}`,
    name: `${siteConfig.name} – ${b.name}`,
    url: siteConfig.url,
    telephone: b.phone,
    sameAs: Object.values(siteConfig.social),
    address: {
      "@type": "PostalAddress",
      streetAddress: b.addressLines.slice(0, -1).join(", "),
      addressLocality: b.city,
      addressRegion: "Tamil Nadu",
      postalCode: b.addressLines.at(-1)?.match(/\d{6}/)?.[0],
      addressCountry: "IN",
    },
  })),
};

export default async function ContactPage() {
  const courses = await getCourses();

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }}
      />

      <PageHeader
        breadcrumbs={[{ label: "Contact" }]}
        title={
          <>
            Let&apos;s talk about your <span className="text-brand-400">SAP career</span>
          </>
        }
        description="Visit us in Tiruchirappalli or Coimbatore, or book a free demo class online. We usually respond within a few hours."
      />

      <section className="py-14 sm:py-20">
        <Container className="grid gap-10 lg:grid-cols-[1fr_1.4fr]">
          <div className="space-y-4">
            {channels.map((c, i) => (
              <Reveal key={c.label} variant="left" delay={i * 90}>
                <a
                  href={c.href}
                  target={c.href.startsWith("http") ? "_blank" : undefined}
                  rel="noreferrer"
                  className="group flex items-center gap-4 rounded-2xl border border-ink-100 bg-white p-5 transition-all duration-300 hover:-translate-y-0.5 hover:border-brand-200 hover:shadow-lg hover:shadow-brand-900/5"
                >
                  <span className="flex size-12 shrink-0 items-center justify-center rounded-2xl bg-brand-50 text-brand-600 transition-all duration-300 group-hover:scale-110 group-hover:-rotate-6 group-hover:bg-brand-600 group-hover:text-white">
                    <Icon name={c.icon} className="size-5" />
                  </span>
                  <span>
                    <span className="block text-xs font-semibold tracking-wider text-ink-400 uppercase">{c.label}</span>
                    <span className="mt-0.5 block font-semibold text-ink-900">{c.value}</span>
                  </span>
                </a>
              </Reveal>
            ))}

            <Reveal variant="left" delay={400}>
              <a
                href="#branches"
                className="group flex items-center justify-between gap-4 rounded-2xl bg-ink-950 p-6 text-white transition-colors hover:bg-ink-900"
              >
                <span>
                  <span className="block font-display font-bold">Prefer to visit in person?</span>
                  <span className="mt-1 block text-sm text-ink-400">
                    Branches in {branches.map((b) => b.name).join(" & ")}
                  </span>
                </span>
                <span className="flex size-10 shrink-0 items-center justify-center rounded-full bg-brand-600 transition-transform group-hover:translate-y-1">
                  <Icon name="arrowRight" className="size-5 rotate-90" />
                </span>
              </a>
            </Reveal>

            <Reveal variant="left" delay={480}>
              <div className="rounded-2xl border border-ink-100 bg-white p-6">
                <p className="font-display font-bold text-ink-950">Follow us</p>
                <p className="mt-1 text-sm text-ink-500">Tips, batch updates and success stories.</p>
                <div className="mt-4 grid grid-cols-2 gap-2">
                  {socials.map((s) => (
                    <a
                      key={s.name}
                      href={s.href}
                      target="_blank"
                      rel="noreferrer"
                      className={`group/s flex items-center gap-2.5 rounded-xl border border-ink-100 px-3 py-2.5 text-sm font-semibold text-ink-700 transition-all duration-300 hover:-translate-y-0.5 hover:border-transparent hover:text-white ${s.hover}`}
                    >
                      <SocialIcon name={s.name} className="size-4 transition-transform group-hover/s:scale-110" />
                      {s.label}
                    </a>
                  ))}
                </div>
              </div>
            </Reveal>
          </div>

          <Reveal variant="right" className="rounded-3xl border border-ink-100 bg-white p-6 shadow-xl shadow-ink-900/5 sm:p-10">
            <h2 className="text-2xl font-extrabold">Send us an enquiry</h2>
            <p className="mt-2 text-ink-500">Fill in your details and our counsellor will call you back.</p>
            <div className="mt-8">
              <EnquiryForm courseOptions={courses.map(({ slug, title }) => ({ slug, title }))} />
            </div>
          </Reveal>
        </Container>
      </section>

      <section id="branches" className="scroll-mt-28 bg-ink-50/70 py-20 sm:py-28">
        <Container>
          <SectionHeading
            eyebrow="Our Branches"
            title={
              <>
                Find us in <span className="text-brand-600">Trichy</span> &amp;{" "}
                <span className="text-brand-600">Coimbatore</span>
              </>
            }
            description="Drop by for a free counselling session, a demo class or to meet our trainers."
          />
          <div className="mt-14 grid gap-8 lg:grid-cols-2">
            {branches.map((b, i) => (
              <Reveal key={b.id} variant={i === 0 ? "left" : "right"} className="h-full">
                <BranchCard branch={b} showMap />
              </Reveal>
            ))}
          </div>
        </Container>
      </section>
    </>
  );
}
