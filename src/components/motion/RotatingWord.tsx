"use client";

import { useEffect, useState } from "react";

export function RotatingWord({ words, interval = 2200 }: { words: string[]; interval?: number }) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const id = setInterval(() => setIndex((i) => (i + 1) % words.length), interval);
    return () => clearInterval(id);
  }, [words.length, interval]);

  return (
    <span className="relative inline-grid overflow-hidden align-bottom">
      {/* Longest word reserves the width so the line doesn't jump. */}
      <span className="invisible col-start-1 row-start-1">
        {words.reduce((a, b) => (b.length > a.length ? b : a))}
      </span>
      {words.map((word, i) => (
        <span
          key={word}
          aria-hidden={i !== index}
          className={`col-start-1 row-start-1 transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${
            i === index
              ? "translate-y-0 opacity-100"
              : i === (index - 1 + words.length) % words.length
                ? "-translate-y-full opacity-0"
                : "translate-y-full opacity-0"
          }`}
        >
          {word}
        </span>
      ))}
    </span>
  );
}
