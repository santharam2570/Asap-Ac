"use client";

import { useEffect, useState } from "react";
import { Icon } from "@/components/ui/Icon";

export function ScrollProgress() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(max > 0 ? window.scrollY / max : 0);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  return (
    <>
      <div
        className="fixed inset-x-0 top-0 z-[60] h-[3px] origin-left bg-gradient-to-r from-brand-400 via-brand-600 to-ink-950"
        style={{ transform: `scaleX(${progress})` }}
        aria-hidden
      />
      <button
        type="button"
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        aria-label="Back to top"
        className={`fixed right-5 bottom-24 z-40 flex size-12 items-center justify-center rounded-full bg-ink-950 text-white shadow-xl transition-all duration-300 hover:-translate-y-1 hover:bg-brand-600 ${
          progress > 0.08 ? "visible translate-y-0 opacity-100" : "invisible translate-y-4 opacity-0"
        }`}
      >
        <Icon name="arrowRight" className="size-5 -rotate-90" />
      </button>
    </>
  );
}
