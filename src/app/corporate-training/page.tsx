import type { Metadata } from "next";
import { EnquiryForm } from "@/components/forms/EnquiryForm";
import { Reveal } from "@/components/motion/Reveal";
import { Container } from "@/components/ui/Container";
import { Icon, type IconKey } from "@/components/ui/Icon";
import { PageHeader } from "@/components/ui/PageHeader";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { getCategories, getCourses } from "@/lib/courses";

export const metadata: Metadata = {
  title: "Corporate SAP Training",
  description:
    "Customised SAP training programs for teams: S/4HANA upskilling, end-user training, and consultant bootcamps delivered online or on-site.",
};

const offerings: { icon: IconKey; title: string; description: string }[] = [
  {
    icon: "layers",
    title: "S/4HANA Upskilling",
    description: "Move your ECC teams to S/4HANA with role-based programs for functional and technical staff.",
  },
  {
    icon: "users",
    title: "End-User Training",
    description: "Practical, process-based training so business users adopt SAP faster with fewer support tickets.",
  },
  {
    icon: "briefcase",
    title: "Fresher Bootcamps",
    description: "Intensive programs that turn graduate hires into project-ready SAP consultants.",
  },
  {
    icon: "building",
    title: "On-site or Online",
    description: "Delivered at your office, at our centre, or live online across time zones.",
  },
];

const benefits = [
  "Customised syllabus mapped to your SAP landscape",
  "Dedicated sandbox systems for your team",
  "Pre- and post-training assessments",
  "Progress reports for managers",
  "Flexible schedules around project timelines",
  "Post-training support and refreshers",
];

export default async function CorporateTrainingPage() {
  const [courses, categories] = await Promise.all([getCourses(), getCategories()]);

  return (
    <>
      <PageHeader
        breadcrumbs={[{ label: "Corporate Training" }]}
        title={
          <>
            SAP training for <span className="text-brand-400">your teams</span>
          </>
        }
        description="Tailored SAP programs that upskill your workforce, accelerate S/4HANA adoption and build in-house expertise."
      />

      <section className="py-20 sm:py-28">
        <Container>
          <SectionHeading
            eyebrow="What we offer"
            title="Programs built around your business"
            description={`Choose from ${courses.length}+ SAP courses across ${categories.length} tracks, or let us design a program for you.`}
          />
          <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {offerings.map((o, i) => (
              <Reveal key={o.title} delay={i * 110} className="h-full">
                <div className="group h-full rounded-3xl border border-ink-100 bg-white p-7 transition-all duration-300 hover:-translate-y-1.5 hover:border-brand-200 hover:shadow-xl hover:shadow-brand-900/10">
                  <span className="flex size-12 items-center justify-center rounded-2xl bg-brand-50 text-brand-600 transition-all duration-300 group-hover:scale-110 group-hover:-rotate-6 group-hover:bg-brand-600 group-hover:text-white">
                    <Icon name={o.icon} className="size-6" />
                  </span>
                  <h3 className="mt-5 text-lg font-bold">{o.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-ink-500">{o.description}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      <section className="bg-ink-50/70 py-20 sm:py-28">
        <Container className="grid gap-12 lg:grid-cols-2">
          <div>
            <SectionHeading
              align="left"
              eyebrow="Why partner with us"
              title="Measurable outcomes, not just attendance"
            />
            <ul className="mt-8 space-y-4">
              {benefits.map((b, i) => (
                <Reveal as="li" key={b} variant="left" delay={i * 80} className="flex items-start gap-3">
                  <span className="mt-0.5 flex size-6 shrink-0 items-center justify-center rounded-full bg-brand-600 text-white">
                    <Icon name="check" className="size-3.5" strokeWidth={3} />
                  </span>
                  <span className="text-ink-700">{b}</span>
                </Reveal>
              ))}
            </ul>
          </div>
          <Reveal variant="right" className="rounded-3xl border border-ink-100 bg-white p-6 shadow-xl shadow-ink-900/5 sm:p-10">
            <h2 className="text-2xl font-extrabold">Request a proposal</h2>
            <p className="mt-2 text-ink-500">Tell us about your team and we&apos;ll get back with a tailored plan.</p>
            <div className="mt-8">
              <EnquiryForm source="corporate" courseOptions={courses.map(({ slug, title }) => ({ slug, title }))} />
            </div>
          </Reveal>
        </Container>
      </section>
    </>
  );
}
