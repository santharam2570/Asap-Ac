import Image from "next/image";
import Link from "next/link";
import logo from "@/assets/brand/logo.png";
import logoLight from "@/assets/brand/logo-light.png";
import mark from "@/assets/brand/logo-mark.png";
import markLight from "@/assets/brand/logo-mark-light.png";

interface LogoProps {
  variant?: "full" | "compact";
  tone?: "dark" | "light";
  className?: string;
  priority?: boolean;
}

export function Logo({ variant = "compact", tone = "dark", className = "", priority }: LogoProps) {
  if (variant === "full") {
    return (
      <Image
        src={tone === "light" ? logoLight : logo}
        alt="ASAP Academy – As Study As Possible"
        className={className}
        priority={priority}
      />
    );
  }

  const light = tone === "light";
  return (
    <Link href="/" className={`group flex items-center gap-2.5 ${className}`} aria-label="ASAP Academy home">
      <Image
        src={light ? markLight : mark}
        alt=""
        className="h-9 w-auto transition-transform duration-300 group-hover:scale-105"
        priority={priority}
      />
      <span className="flex flex-col leading-none">
        <span className="font-display text-xl font-black tracking-tight text-brand-600">
          <span className={light ? "text-white" : "text-ink-950"}>A</span>SAP
        </span>
        <span
          className={`mt-0.5 font-display text-[10px] font-bold tracking-[0.28em] ${
            light ? "text-ink-300" : "text-ink-500"
          }`}
        >
          ACADEMY
        </span>
      </span>
    </Link>
  );
}
