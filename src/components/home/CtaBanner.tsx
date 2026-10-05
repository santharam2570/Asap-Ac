import { Reveal } from "@/components/motion/Reveal";
import { ButtonLink } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Icon } from "@/components/ui/Icon";
import { siteConfig } from "@/config/site";

interface CtaBannerProps {
  title?: string;
  description?: string;
}

export function CtaBanner({
  title = "Ready to start your SAP career?",
  description = "Book a free demo class and talk to our SAP mentors about the right course for you.",
}: CtaBannerProps) {
  return (
    <section className="pb-20 sm:pb-28">
      <Container>
        <Reveal variant="zoom" duration={900}>
          <div className="relative overflow-hidden rounded-[2rem] bg-gradient-to-br from-brand-500 via-brand-600 to-brand-800 bg-size-200 px-6 py-14 text-center animate-gradient sm:px-12 sm:py-16">
            <div className="bg-grid-dark absolute inset-0 opacity-70" aria-hidden />
            <div className="absolute -top-24 -left-24 size-72 animate-blob rounded-full bg-brand-300/40 blur-3xl" aria-hidden />
            <div
              className="absolute -right-24 -bottom-24 size-72 animate-blob rounded-full bg-ink-950/40 blur-3xl"
              style={{ animationDelay: "6s" }}
              aria-hidden
            />
            <div className="absolute top-8 right-10 hidden size-24 animate-spin-slow rounded-full border-2 border-dashed border-white/20 sm:block" aria-hidden />
            <div className="absolute bottom-8 left-10 hidden size-14 animate-float rounded-2xl border border-white/20 bg-white/10 sm:block" aria-hidden />

            <div className="relative mx-auto max-w-2xl">
              <h2 className="text-3xl font-black tracking-tight text-white sm:text-4xl">{title}</h2>
              <p className="mt-4 text-lg text-brand-100">{description}</p>
              <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
                <ButtonLink href="/contact" variant="white" size="lg">
                  Book a Free Demo
                  <Icon name="arrowRight" className="size-5 transition-transform group-hover/btn:translate-x-1" />
                </ButtonLink>
                <a
                  href={siteConfig.contact.phoneHref}
                  className="group inline-flex h-13 items-center justify-center gap-2 rounded-full border border-white/30 px-8 font-semibold text-white transition-colors hover:bg-white/10"
                >
                  <Icon name="phone" className="size-5 group-hover:animate-wiggle" /> {siteConfig.contact.phone}
                </a>
              </div>
            </div>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
