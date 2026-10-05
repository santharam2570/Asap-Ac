"use client";

import { useEffect, useState } from "react";
import { useInView } from "@/components/motion/Reveal";

// Animates the numeric part of values like "5,000+", "92%" or "24+".
export function CountUp({ value, duration = 1800 }: { value: string; duration?: number }) {
  const match = value.match(/^([^\d]*)([\d,]+)(.*)$/);
  const target = match ? Number(match[2].replace(/,/g, "")) : 0;
  const { ref, inView } = useInView<HTMLSpanElement>(0.4);
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    if (!inView || !target) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let frame: number;
    const start = performance.now();
    const tick = (now: number) => {
      const p = reduce ? 1 : Math.min(1, (now - start) / duration);
      setCurrent(Math.round(target * (1 - Math.pow(1 - p, 3))));
      if (p < 1) frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [inView, target, duration]);

  if (!match) return <span>{value}</span>;

  return (
    <span ref={ref} className="tabular-nums">
      {match[1]}
      {current.toLocaleString("en-IN")}
      {match[3]}
    </span>
  );
}
