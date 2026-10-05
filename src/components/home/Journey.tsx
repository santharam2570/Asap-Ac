import { Reveal } from "@/components/motion/Reveal";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { journey } from "@/data/content";

export function Journey() {
  return (
    <section className="py-20 sm:py-28">
      <Container>
        <SectionHeading
          eyebrow="How it works"
          title="Your path from learner to SAP consultant"
          description="A clear, guided four-step journey with mentors at every stage."
        />

        <div className="relative mt-16">
          <Reveal
            variant="growX"
            duration={1600}
            delay={200}
            className="absolute top-7 right-[12.5%] left-[12.5%] hidden h-0.5 origin-left bg-gradient-to-r from-brand-200 via-brand-600 to-brand-200 md:block"
          >
            <span />
          </Reveal>
          <ol className="relative grid gap-10 md:grid-cols-4 md:gap-6">
          {journey.map((j, i) => (
            <Reveal as="li" key={j.step} delay={300 + i * 250} className="group relative text-center">
              <span className="relative mx-auto flex size-14 items-center justify-center rounded-2xl bg-brand-600 font-display text-lg font-black text-white shadow-lg ring-8 shadow-brand-600/30 ring-white transition-all duration-300 group-hover:-translate-y-1 group-hover:rotate-6 group-hover:bg-ink-950">
                <span className="absolute inset-0 animate-ping rounded-2xl bg-brand-500 opacity-20" style={{ animationDelay: `${i * 0.5}s`, animationDuration: "2.5s" }} aria-hidden />
                {j.step}
              </span>
              <h3 className="mt-6 text-lg font-bold">{j.title}</h3>
              <p className="mx-auto mt-2 max-w-xs text-sm leading-relaxed text-ink-500">{j.description}</p>
            </Reveal>
          ))}
          </ol>
        </div>
      </Container>
    </section>
  );
}
