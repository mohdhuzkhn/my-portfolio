import type { Metadata } from "next";
import { SystemDesignDeck } from "@/components/system-design/system-design-deck";

export const metadata: Metadata = {
  title: "System Design",
  description:
    "A visual learning deck covering the four pillars of system design: performance, scalability, reliability, and security.",
};

export default function SystemDesignPage() {
  return (
    <div className="mx-auto max-w-6xl px-6 py-16">
      <div className="mb-2 font-mono text-xs uppercase tracking-wide text-foreground-faint">
        Systems thinking · Slide 01–05
      </div>
      <h1 className="font-display text-3xl font-semibold">System Design</h1>
      <p className="mt-3 max-w-2xl leading-relaxed text-foreground-dim">
        A growing visual notebook on the ideas behind dependable systems. Start
        with the four pillars, then move through each concept at your own pace.
      </p>
      <SystemDesignDeck />
    </div>
  );
}
