import Image from "next/image";
import mark from "@/assets/brand/logo-mark.png";
import { RotatingWord } from "@/components/motion/RotatingWord";
import { ButtonLink } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Icon } from "@/components/ui/Icon";

const chips = [
  { label: "SAP FICO", className: "top-6 -left-4 sm:-left-10", delay: "0s" },
  { label: "S/4HANA", className: "top-1/3 -right-3 sm:-right-8", delay: "1.5s" },
  { label: "ABAP & RAP", className: "bottom-24 -left-2 sm:-left-12", delay: "3s" },
  { label: "SAP BTP", className: "-bottom-3 right-10", delay: "4.5s" },
];

const rotatingModules = ["FICO", "MM", "SD", "ABAP", "S/4HANA", "BTP", "HCM"];

const delay = (ms: number) => ({ animationDelay: `${ms}ms` });

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-white">
      <div className="bg-grid absolute inset-0 [mask-image:radial-gradient(ellipse_at_top,black_30%,transparent_75%)]" aria-hidden />
      <div className="absolute -top-32 -right-32 size-[34rem] animate-blob rounded-full bg-brand-500/15 blur-3xl" aria-hidden />
      <div
        className="absolute -bottom-40 -left-40 size-[28rem] animate-blob rounded-full bg-brand-300/25 blur-3xl"
        style={delay(4000)}
        aria-hidden
      />

      <Container className="relative grid items-center gap-16 py-16 sm:py-20 lg:grid-cols-2 lg:py-28">
        <div>
          <p
            className="inline-flex animate-fade-up items-center gap-2 rounded-full border border-brand-100 bg-brand-50 px-4 py-1.5 text-xs font-semibold text-brand-700"
            style={delay(0)}
          >
            <span className="relative flex size-2">
              <span className="absolute inline-flex size-full animate-ping rounded-full bg-brand-500 opacity-60" />
              <span className="relative inline-flex size-2 rounded-full bg-brand-600" />
            </span>
            Admissions open · New SAP batches this month
          </p>

          <h1
            className="mt-6 animate-fade-up text-4xl leading-[1.1] font-black tracking-tight sm:text-5xl lg:text-6xl"
            style={delay(120)}
          >
            Become a <span className="whitespace-nowrap">job-ready</span>
            <span className="block text-brand-600">
              SAP <RotatingWord words={rotatingModules} />
            </span>
            Consultant
          </h1>
          <p
            className="mt-3 animate-fade-up font-display text-2xl font-bold text-ink-500 sm:text-3xl"
            style={delay(240)}
          >
            As Study As Possible.
          </p>

          <p className="mt-6 max-w-xl animate-fade-up text-lg leading-relaxed text-ink-500" style={delay(360)}>
            Industry-focused training in every major SAP module, from FICO, MM and SD to ABAP, S/4HANA,
            SuccessFactors and BTP. Taught by certified consultants on live systems, with real-time projects
            and placement support.
          </p>

          <div className="mt-8 flex animate-fade-up flex-col gap-3 sm:flex-row" style={delay(480)}>
            <ButtonLink href="/courses" size="lg">
              Explore Courses
              <Icon name="arrowRight" className="size-5 transition-transform group-hover/btn:translate-x-1" />
            </ButtonLink>
            <ButtonLink href="/contact" size="lg" variant="outline">
              Book a Free Demo
            </ButtonLink>
          </div>

          <ul className="mt-10 grid max-w-lg grid-cols-1 gap-3 text-sm font-medium text-ink-600 sm:grid-cols-2">
            {["Live SAP server access", "Real-time projects", "Certification guidance", "Placement assistance"].map(
              (item, i) => (
                <li key={item} className="flex animate-fade-up items-center gap-2" style={delay(600 + i * 100)}>
                  <span className="flex size-5 items-center justify-center rounded-full bg-brand-600 text-white">
                    <Icon name="check" className="size-3" strokeWidth={3} />
                  </span>
                  {item}
                </li>
              ),
            )}
          </ul>
        </div>

        <div className="relative mx-auto w-full max-w-md animate-zoom-in lg:max-w-lg" style={delay(250)}>
          <div className="relative aspect-square overflow-hidden rounded-[2.5rem] bg-gradient-to-br from-brand-500 via-brand-700 to-ink-950 bg-size-200 p-1 shadow-2xl shadow-brand-900/30 animate-gradient">
            <div className="bg-grid-dark absolute inset-0" aria-hidden />
            <div
              className="absolute top-1/2 left-1/2 size-[88%] -translate-x-1/2 -translate-y-1/2 animate-spin-slow rounded-full border border-dashed border-white/20"
              aria-hidden
            >
              <span className="absolute top-0 left-1/2 size-3 -translate-x-1/2 -translate-y-1/2 rounded-full bg-brand-300 shadow-[0_0_16px] shadow-brand-300" />
            </div>
            <div
              className="absolute top-1/2 left-1/2 size-[66%] -translate-x-1/2 -translate-y-1/2 animate-spin-slower rounded-full border border-white/10"
              aria-hidden
            >
              <span className="absolute bottom-0 left-1/2 size-2 -translate-x-1/2 translate-y-1/2 rounded-full bg-white" />
            </div>

            <div className="relative flex h-full flex-col items-center justify-center p-10">
              <div className="animate-float rounded-[2rem] bg-white p-8 shadow-2xl">
                <Image src={mark} alt="ASAP Academy" className="h-32 w-auto sm:h-40" priority />
              </div>
              <p className="mt-8 font-display text-2xl font-black tracking-tight text-white sm:text-3xl">
                ASAP <span className="text-brand-300">ACADEMY</span>
              </p>
              <p className="mt-1 text-xs font-semibold tracking-[0.3em] text-brand-200 uppercase">
                As Study As Possible
              </p>
            </div>
          </div>

          {chips.map((chip) => (
            <div key={chip.label} className={`absolute ${chip.className}`}>
              <div
                className="flex animate-float-slow items-center gap-2 rounded-2xl border border-ink-100 bg-white px-4 py-2.5 text-sm font-bold text-ink-900 shadow-xl shadow-ink-900/10"
                style={{ animationDelay: chip.delay }}
              >
                <span className="relative flex size-2">
                  <span className="absolute inline-flex size-full animate-ping rounded-full bg-brand-500 opacity-50" />
                  <span className="relative size-2 rounded-full bg-brand-600" />
                </span>
                {chip.label}
              </div>
            </div>
          ))}

          <div className="absolute -bottom-6 -left-4 hidden items-center gap-3 rounded-2xl bg-ink-950 px-5 py-4 text-white shadow-xl sm:flex">
            <span className="flex size-10 animate-wiggle items-center justify-center rounded-xl bg-brand-600 [animation-iteration-count:3]">
              <Icon name="award" className="size-5" />
            </span>
            <span>
              <span className="block text-lg leading-none font-black">5,000+</span>
              <span className="text-xs text-ink-300">learners trained</span>
            </span>
          </div>
        </div>
      </Container>
    </section>
  );
}
