import type { Metadata } from "next";
import Image from "next/image";
import logo from "@/assets/brand/logo.png";
import { CtaBanner } from "@/components/home/CtaBanner";
import { Journey } from "@/components/home/Journey";
import { CountUp } from "@/components/motion/CountUp";
import { Reveal } from "@/components/motion/Reveal";
import { Container } from "@/components/ui/Container";
import { Icon, type IconKey } from "@/components/ui/Icon";
import { PageHeader } from "@/components/ui/PageHeader";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { siteConfig } from "@/config/site";
import { stats, whyAsap } from "@/data/content";

export const metadata: Metadata = {
  title: "About Us",
  description: `Learn about ${siteConfig.name}: our mission, values and approach to SAP training.`,
};

const values: { icon: IconKey; title: string; description: string }[] = [
  {
    icon: "target",
    title: "Our Mission",
    description:
      "Make world-class SAP education accessible, practical and career-focused, so every learner can study as smart and as fast as possible.",
  },
  {
    icon: "star",
    title: "Our Vision",
    description:
      "To be India's most trusted SAP academy, known for consultants who are productive from day one on real projects.",
  },
  {
    icon: "users",
    title: "Our Approach",
    description:
      "Small batches, real systems, real scenarios. Every concept is taught the way it is used in live implementation and support projects.",
  },
];

export default function AboutPage() {
  return (
    <>
      <PageHeader
        breadcrumbs={[{ label: "About" }]}
        title={
          <>
            Premier <span className="text-brand-400">SAP Training Institute</span> in Coimbatore &amp; Trichy
          </>
        }
        description="Founded by working enterprise SAP consultants, ASAP Academy bridges the gap between academic education and real-world ERP consulting. We empower freshers and professionals across Coimbatore (Peelamedu) and Trichy (Cantonment) with 100% live server access, real-time project labs, and career-focused SAP certification guidance."
      />

      <section className="py-20 sm:py-28">
        <Container className="grid items-center gap-14 lg:grid-cols-2">
          <Reveal variant="left" duration={900} className="relative">
            <div className="absolute -inset-4 -rotate-3 animate-float-slow rounded-[2.5rem] bg-brand-600/10" aria-hidden />
            <div className="relative rounded-[2rem] border border-ink-100 bg-white p-10 shadow-xl shadow-ink-900/5 transition-transform duration-500 hover:scale-[1.02] sm:p-14">
              <Image src={logo} alt="ASAP Academy logo" className="mx-auto h-auto w-full max-w-sm" />
            </div>
          </Reveal>
          <div>
            <SectionHeading align="left" title="Who We Are & Why Choose ASAP Academy" />
            <Reveal delay={150} className="mt-6 space-y-4 text-lg leading-relaxed text-ink-600">
              <p>
                ASAP Academy stands out as the top-rated SAP training center in Tamil Nadu, with physical branches in
                Coimbatore (Peelamedu) and Trichy (Cantonment). Unlike traditional IT training institutes that focus on
                static theoretical slide decks, we train learners on live S/4HANA sandbox environments under the
                mentorship of active enterprise consultants.
              </p>
              <p>
                Whether you are a commerce graduate aiming for SAP FICO, an engineer targeting SAP MM/SD or ABAP, or an
                HR professional moving to SAP SuccessFactors, our curriculum is tailored to make you
                implementation-ready from day one.
              </p>
            </Reveal>
            <dl className="mt-10 grid grid-cols-2 gap-6">
              {stats.map((s, i) => (
                <Reveal
                  key={s.label}
                  variant="zoom"
                  delay={250 + i * 100}
                  className="flex flex-col-reverse rounded-2xl bg-ink-50 p-5 hover:bg-brand-50"
                >
                  <dt className="mt-1 text-sm text-ink-500">{s.label}</dt>
                  <dd className="font-display text-3xl font-black text-brand-600">
                    <CountUp value={s.value} />
                  </dd>
                </Reveal>
              ))}
            </dl>
          </div>
        </Container>
      </section>

      <section className="bg-ink-50/70 py-20 sm:py-28">
        <Container>
          <div className="grid gap-6 md:grid-cols-3">
            {values.map((v, i) => (
              <Reveal key={v.title} delay={i * 150} className="h-full">
                <div className="group h-full rounded-3xl border border-ink-100 bg-white p-8 transition-all duration-300 hover:-translate-y-1.5 hover:border-brand-200 hover:shadow-xl hover:shadow-brand-900/10">
                  <span className="flex size-12 items-center justify-center rounded-2xl bg-brand-600 text-white transition-transform duration-300 group-hover:scale-110 group-hover:-rotate-6">
                    <Icon name={v.icon} className="size-6" />
                  </span>
                  <h3 className="mt-5 text-xl font-bold">{v.title}</h3>
                  <p className="mt-3 leading-relaxed text-ink-500">{v.description}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      <Journey steps={whyAsap} />
      <CtaBanner />
    </>
  );
}
