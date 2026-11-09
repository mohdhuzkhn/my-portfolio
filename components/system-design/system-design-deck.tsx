"use client";

import Image from "next/image";
import { useCallback, useEffect, useState } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { systemDesignSlides } from "@/lib/system-design-slides";

export function SystemDesignDeck() {
  const [activeIndex, setActiveIndex] = useState(0);
  const slide = systemDesignSlides[activeIndex];

  const goTo = useCallback((index: number) => {
    setActiveIndex(
      (index + systemDesignSlides.length) % systemDesignSlides.length,
    );
  }, []);

  useEffect(() => {
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "ArrowRight") goTo(activeIndex + 1);
      if (event.key === "ArrowLeft") goTo(activeIndex - 1);
    }
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [activeIndex, goTo]);

  return (
    <section aria-label="Four Pillars of System Design slide deck" className="mt-10">
      <div className="overflow-hidden rounded-[var(--radius-m)] border border-line bg-surface">
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-line px-5 py-4 sm:px-6">
          <div>
            <p className="font-mono text-[11px] uppercase tracking-wide text-foreground-faint">
              Four Pillars of System Design
            </p>
            <h2 className="mt-1 font-display text-lg font-semibold">
              {slide.title}
            </h2>
          </div>
          <p className="font-mono text-xs text-foreground-dim" aria-live="polite">
            {String(activeIndex + 1).padStart(2, "0")} / {String(systemDesignSlides.length).padStart(2, "0")}
          </p>
        </div>

        <div className="relative flex min-h-[280px] items-center justify-center bg-[#111214] p-3 sm:min-h-[430px] sm:p-6 lg:min-h-[560px]">
          <Image
            key={slide.image}
            src={slide.image}
            alt={slide.alt}
            width={1200}
            height={800}
            priority={activeIndex === 0}
            className="max-h-[68vh] w-full object-contain"
            sizes="(min-width: 1280px) 1120px, (min-width: 768px) 90vw, 100vw"
          />
        </div>

        <div className="flex flex-col gap-4 border-t border-line px-5 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-6">
          <p className="max-w-2xl text-sm leading-relaxed text-foreground-dim" aria-live="polite">
            {slide.caption}
          </p>
          <div className="flex shrink-0 items-center gap-2">
            <button
              type="button"
              onClick={() => goTo(activeIndex - 1)}
              aria-label="Previous slide"
              className="inline-flex h-10 w-10 items-center justify-center rounded-[var(--radius-s)] border border-line text-foreground-dim transition-colors hover:border-accent hover:text-foreground focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent"
            >
              <ArrowLeft size={17} aria-hidden="true" />
            </button>
            <button
              type="button"
              onClick={() => goTo(activeIndex + 1)}
              aria-label="Next slide"
              className="inline-flex h-10 items-center justify-center gap-2 rounded-[var(--radius-s)] border border-accent bg-accent-dim px-4 text-sm font-medium text-foreground transition-colors hover:bg-accent hover:text-white focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent"
            >
              Next <ArrowRight size={16} aria-hidden="true" />
            </button>
          </div>
        </div>
      </div>

      <div className="mt-4 grid grid-cols-2 gap-2 sm:grid-cols-5" aria-label="Choose a slide">
        {systemDesignSlides.map((item, index) => (
          <button
            key={item.image}
            type="button"
            onClick={() => goTo(index)}
            aria-current={activeIndex === index ? "step" : undefined}
            className={`rounded-[var(--radius-s)] border px-3 py-3 text-left text-sm transition-colors focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent ${activeIndex === index ? "border-accent bg-accent-dim text-foreground" : "border-line text-foreground-dim hover:border-foreground-faint hover:text-foreground"}`}
          >
            <span className="mb-1 block font-mono text-[10px] text-foreground-faint">
              {String(index + 1).padStart(2, "0")}
            </span>
            <span className="line-clamp-1">{item.title}</span>
          </button>
        ))}
      </div>
      <p className="mt-3 text-xs text-foreground-faint">
        Tip: use the left and right arrow keys to move between slides.
      </p>
    </section>
  );
}
