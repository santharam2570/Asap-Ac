import { CountUp } from "@/components/motion/CountUp";
import { Reveal } from "@/components/motion/Reveal";
import { Container } from "@/components/ui/Container";
import { Icon } from "@/components/ui/Icon";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { features, stats } from "@/data/content";

export function WhyUs() {
  return (
    <section className="relative overflow-hidden bg-ink-950 py-20 sm:py-28">
      <div className="bg-grid-dark absolute inset-0" aria-hidden />
      <div className="absolute top-0 left-1/4 size-96 animate-blob rounded-full bg-brand-600/25 blur-3xl" aria-hidden />
      <div
        className="absolute right-0 bottom-0 size-80 animate-blob rounded-full bg-brand-400/10 blur-3xl"
        style={{ animationDelay: "5s" }}
        aria-hidden
      />

      <Container className="relative">
        <SectionHeading
          tone="dark"
          eyebrow="Why ASAP Academy"
          title={
            <>
              Training that gets you <span className="text-brand-400">hired</span>
            </>
          }
          description="We don't just teach SAP screens. We train you to think and work like a consultant on a real project."
        />

        <div className="mt-14 grid gap-px overflow-hidden rounded-3xl border border-white/10 bg-white/10 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((f, i) => (
            <Reveal key={f.title} variant="fade" delay={i * 100} className="bg-ink-950">
              <div className="group relative h-full overflow-hidden p-8 transition-colors duration-300 hover:bg-ink-900">
                <div
                  className="absolute -top-20 -right-20 size-40 rounded-full bg-brand-600/0 blur-2xl transition-colors duration-500 group-hover:bg-brand-600/30"
                  aria-hidden
                />
                <span className="relative flex size-12 items-center justify-center rounded-2xl bg-brand-600/15 text-brand-400 ring-1 ring-brand-500/30 transition-all duration-300 group-hover:scale-110 group-hover:bg-brand-600 group-hover:text-white">
                  <Icon name={f.icon} className="size-6" />
                </span>
                <h3 className="relative mt-5 text-lg font-bold text-white">{f.title}</h3>
                <p className="relative mt-2 text-sm leading-relaxed text-ink-400">{f.description}</p>
              </div>
            </Reveal>
          ))}
        </div>

        <dl className="mt-14 grid grid-cols-2 gap-8 lg:grid-cols-4">
          {stats.map((s, i) => (
            <Reveal key={s.label} delay={i * 120} className="border-l-2 border-brand-600 pl-5">
              <dt className="text-sm text-ink-400">{s.label}</dt>
              <dd className="mt-1 font-display text-3xl font-black text-white sm:text-4xl">
                <CountUp value={s.value} />
              </dd>
            </Reveal>
          ))}
        </dl>
      </Container>
    </section>
  );
}
