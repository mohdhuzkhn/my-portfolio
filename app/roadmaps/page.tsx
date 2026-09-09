import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Roadmaps",
  description: "The Roadmaps section of the AI Engineering Institute.",
};

export default function RoadmapsPage() {
  return (
    <div className="mx-auto max-w-3xl px-6 py-20">
      <div className="mb-3 font-mono text-xs uppercase tracking-wide text-foreground-faint">
        Phase 4 — core pages
      </div>
      <h1 className="font-display text-3xl font-semibold">Roadmaps</h1>
      <p className="mt-4 text-foreground-dim">
        This section is scaffolded and routed as part of the Phase 1
        foundation. Real content, listing pages, and detail templates for
        Roadmaps build out in their assigned implementation phase.
      </p>
    </div>
  );
}
