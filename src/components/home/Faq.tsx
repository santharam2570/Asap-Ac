import { Reveal } from "@/components/motion/Reveal";
import { Container } from "@/components/ui/Container";
import { Icon } from "@/components/ui/Icon";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { faqs } from "@/data/content";

export function Faq() {
  return (
    <section className="py-20 sm:py-28">
      <Container className="grid gap-12 lg:grid-cols-5">
        <div className="lg:col-span-2">
          <SectionHeading
            align="left"
            eyebrow="FAQ"
            title="Questions? We've got answers."
            description="Can't find what you're looking for? Our counsellors are happy to help you choose the right course."
          />
        </div>
        <div className="space-y-3 lg:col-span-3">
          {faqs.map((f, i) => (
            <Reveal key={f.q} variant="right" delay={i * 80}>
              <details className="group rounded-2xl border border-ink-100 bg-white px-6 transition-all duration-300 open:border-brand-200 open:bg-brand-50/40 open:shadow-lg open:shadow-brand-900/5 hover:border-brand-200">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 py-5 font-semibold text-ink-900 [&::-webkit-details-marker]:hidden">
                  {f.q}
                  <span className="flex size-8 shrink-0 items-center justify-center rounded-full bg-ink-50 text-ink-600 transition-all duration-300 group-open:rotate-45 group-open:bg-brand-600 group-open:text-white">
                    <Icon name="plus" className="size-4" />
                  </span>
                </summary>
                <p className="animate-fade-up pb-6 leading-relaxed text-ink-500 [animation-duration:400ms]">{f.a}</p>
              </details>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
