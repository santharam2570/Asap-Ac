"use client";

import { useEffect, useRef, useState, type ElementType, type ReactNode } from "react";

type Variant = "up" | "down" | "left" | "right" | "zoom" | "fade" | "growX";

const hidden: Record<Variant, string> = {
  up: "translate-y-10",
  down: "-translate-y-10",
  left: "-translate-x-12",
  right: "translate-x-12",
  zoom: "scale-90",
  fade: "",
  growX: "scale-x-0",
};

interface RevealProps {
  children: ReactNode;
  variant?: Variant;
  delay?: number;
  duration?: number;
  className?: string;
  as?: ElementType;
}

export function useInView<T extends Element>(threshold = 0.15) {
  const ref = useRef<T>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.disconnect();
        }
      },
      { threshold, rootMargin: "0px 0px -60px 0px" },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [threshold]);

  return { ref, inView };
}

export function Reveal({
  children,
  variant = "up",
  delay = 0,
  duration = 700,
  className = "",
  as: Tag = "div",
}: RevealProps) {
  const { ref, inView } = useInView<HTMLDivElement>();
  const [settled, setSettled] = useState(false);

  // Drop the entrance timing afterwards so hover transitions stay snappy.
  useEffect(() => {
    if (!inView) return;
    const id = setTimeout(() => setSettled(true), delay + duration);
    return () => clearTimeout(id);
  }, [inView, delay, duration]);

  return (
    <Tag
      ref={ref}
      style={settled ? undefined : { transitionDelay: `${delay}ms`, transitionDuration: `${duration}ms` }}
      className={`transition-all duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:translate-none motion-reduce:scale-100 motion-reduce:opacity-100 motion-reduce:transition-none ${
        inView ? "translate-none scale-100 opacity-100" : `opacity-0 ${hidden[variant]}`
      } ${className}`}
    >
      {children}
    </Tag>
  );
}
