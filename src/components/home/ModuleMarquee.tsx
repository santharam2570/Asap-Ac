const modules = [
  "S/4HANA",
  "FICO",
  "MM",
  "SD",
  "PP",
  "QM",
  "PM",
  "EWM",
  "HCM",
  "SuccessFactors",
  "ABAP",
  "RAP",
  "Fiori / UI5",
  "Basis",
  "Security & GRC",
  "BTP",
  "Integration Suite",
  "Ariba",
  "IBP",
  "BW/4HANA",
  "Analytics Cloud",
  "Datasphere",
];

export function ModuleMarquee() {
  return (
    <section aria-label="SAP modules we teach" className="border-y border-ink-100 bg-ink-50/60 py-5">
      <div className="relative flex overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]">
        <div className="pause-on-hover flex shrink-0 animate-marquee items-center gap-10 pr-10">
          {[...modules, ...modules].map((m, i) => (
            <span
              key={i}
              className="flex cursor-default items-center gap-10 font-display text-lg font-bold whitespace-nowrap text-ink-400 transition-colors hover:text-brand-600"
            >
              SAP {m}
              <span className="size-1.5 rounded-full bg-brand-500" aria-hidden />
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
