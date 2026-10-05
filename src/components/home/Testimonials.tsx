import { Reveal } from "@/components/motion/Reveal";
import { Container } from "@/components/ui/Container";
import { Icon } from "@/components/ui/Icon";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { testimonials } from "@/data/content";

export function Testimonials() {
  return (
    <section className="bg-gradient-to-b from-brand-50/70 to-white py-20 sm:py-28">
      <Container>
        <SectionHeading
          eyebrow="Success Stories"
          title="Learners who made the switch"
          description="From freshers to working professionals, our learners now work as SAP consultants across India and abroad."
        />

        <div className="mt-14 grid gap-6 md:grid-cols-3">
          {testimonials.map((t, i) => (
            <Reveal key={t.name} delay={i * 150} className="h-full">
              <figure className="group relative flex h-full flex-col overflow-hidden rounded-3xl border border-ink-100 bg-white p-8 shadow-sm transition-all duration-300 hover:-translate-y-1.5 hover:border-brand-200 hover:shadow-xl hover:shadow-brand-900/10">
                <span
                  className="absolute -top-6 right-4 font-display text-[9rem] leading-none font-black text-brand-50 transition-colors duration-300 group-hover:text-brand-100"
                  aria-hidden
                >
                  &rdquo;
                </span>
                <div className="relative flex gap-1 text-amber-400">
                  {Array.from({ length: 5 }).map((_, s) => (
                    <Icon
                      key={s}
                      name="star"
                      className="size-4 fill-current transition-transform duration-300 group-hover:scale-125"
                      style={{ transitionDelay: `${s * 50}ms` }}
                    />
                  ))}
                </div>
                <blockquote className="relative mt-5 flex-1 leading-relaxed text-ink-600">&ldquo;{t.quote}&rdquo;</blockquote>
                <figcaption className="relative mt-6 flex items-center gap-3 border-t border-ink-100 pt-6">
                  <span className="flex size-11 shrink-0 items-center justify-center rounded-full bg-ink-950 font-display text-sm font-bold text-white transition-colors duration-300 group-hover:bg-brand-600">
                    {t.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </span>
                  <span>
                    <span className="block font-bold text-ink-950">{t.name}</span>
                    <span className="text-sm text-ink-500">
                      {t.role} · <span className="text-brand-600">{t.course}</span>
                    </span>
                  </span>
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
