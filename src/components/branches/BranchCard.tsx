import { branchDirectionsUrl, branchMapEmbedUrl, type Branch } from "@/config/site";
import { Icon } from "@/components/ui/Icon";

interface BranchCardProps {
  branch: Branch;
  tone?: "light" | "dark";
  showMap?: boolean;
}

export function BranchCard({ branch, tone = "light", showMap = false }: BranchCardProps) {
  const dark = tone === "dark";

  return (
    <article
      className={`group flex h-full flex-col overflow-hidden rounded-3xl transition-all duration-300 hover:-translate-y-1 ${
        dark
          ? "bg-white/[0.04] ring-1 ring-white/10 hover:bg-white/[0.07] hover:ring-brand-500/50"
          : "border border-ink-100 bg-white shadow-xl shadow-ink-900/5 hover:border-brand-200 hover:shadow-brand-900/10"
      }`}
    >
      {showMap && (
        <div className="relative h-64 overflow-hidden bg-ink-100 sm:h-72">
          <iframe
            title={`${branch.name} branch location`}
            src={branchMapEmbedUrl(branch)}
            className="absolute inset-0 h-full w-full"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            allowFullScreen
          />
        </div>
      )}

      <div className="flex flex-1 flex-col p-6 sm:p-7">
        <div className="flex items-start gap-4">
          <span className="flex size-12 shrink-0 items-center justify-center rounded-2xl bg-brand-600 text-white shadow-lg shadow-brand-600/30 transition-transform duration-300 group-hover:scale-110 group-hover:-rotate-6">
            <Icon name="pin" className="size-5" />
          </span>
          <div className="min-w-0">
            <p className={`text-xs font-bold tracking-widest uppercase ${dark ? "text-brand-300" : "text-brand-600"}`}>
              Branch
            </p>
            <h3 className={`font-display text-xl font-extrabold ${dark ? "text-white" : "text-ink-950"}`}>
              {branch.name}
            </h3>
          </div>
          <span
            className={`ml-auto inline-flex shrink-0 items-center gap-1.5 rounded-full px-2.5 py-1 text-[11px] font-semibold ${
              dark ? "bg-emerald-500/10 text-emerald-300" : "bg-emerald-50 text-emerald-700"
            }`}
          >
            <span className="relative flex size-1.5">
              <span className="absolute inline-flex size-full animate-ping rounded-full bg-emerald-400 opacity-75" />
              <span className="relative size-1.5 rounded-full bg-emerald-500" />
            </span>
            Closes {branch.closesAt}
          </span>
        </div>

        <address className={`mt-5 text-sm leading-relaxed not-italic ${dark ? "text-ink-300" : "text-ink-600"}`}>
          {branch.addressLines.map((line) => (
            <span key={line} className="block">
              {line}
            </span>
          ))}
        </address>

        <dl className={`mt-5 space-y-2 text-sm ${dark ? "text-ink-300" : "text-ink-600"}`}>
          <div className="flex items-center gap-2.5">
            <dt>
              <Icon name="phone" className={`size-4 ${dark ? "text-brand-400" : "text-brand-600"}`} />
              <span className="sr-only">Phone</span>
            </dt>
            <dd>
              <a
                href={branch.phoneHref}
                className={`font-semibold transition-colors ${dark ? "text-white hover:text-brand-300" : "text-ink-900 hover:text-brand-600"}`}
              >
                {branch.phone}
              </a>
            </dd>
          </div>
          {branch.hours.map((h) => (
            <div key={h.days} className="flex items-center gap-2.5">
              <dt>
                <Icon name="clock" className={`size-4 ${dark ? "text-brand-400" : "text-brand-600"}`} />
                <span className="sr-only">Hours</span>
              </dt>
              <dd>
                {h.days} · {h.time}
              </dd>
            </div>
          ))}
        </dl>

        <div className="flex-1" />
        <div className="mt-6 flex flex-wrap gap-2">
          <a
            href={branchDirectionsUrl(branch)}
            target="_blank"
            rel="noreferrer"
            className="group/dir inline-flex h-10 items-center gap-2 rounded-full bg-brand-600 px-5 text-sm font-semibold text-white transition-all hover:-translate-y-0.5 hover:bg-brand-700"
          >
            <Icon name="pin" className="size-4" />
            Get directions
            <Icon name="arrowRight" className="size-4 transition-transform group-hover/dir:translate-x-1" />
          </a>
          <a
            href={branch.phoneHref}
            className={`inline-flex h-10 items-center gap-2 rounded-full px-5 text-sm font-semibold transition-colors ${
              dark
                ? "text-white ring-1 ring-white/20 hover:bg-white/10"
                : "text-ink-900 ring-1 ring-ink-200 hover:text-brand-700 hover:ring-brand-500"
            }`}
          >
            <Icon name="phone" className="size-4" />
            Call branch
          </a>
        </div>
      </div>
    </article>
  );
}
