import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { allRoadmaps } from "contentlayer/generated";

export const metadata: Metadata = {
  title: "Roadmaps",
  description:
    "Guided learning paths for AI engineering, with practical projects, competency checkpoints, and resources.",
};

export default function RoadmapsPage() {
  const roadmaps = allRoadmaps
    .filter((doc) => doc.status === "PUBLISHED")
    .sort((a, b) => a.title.localeCompare(b.title));
  return (
    <div className="mx-auto max-w-6xl px-6 py-16 sm:py-20">
      <p className="font-mono text-xs uppercase tracking-widest text-accent">
        Learn with a direction
      </p>
      <h1 className="mt-4 font-display text-4xl font-semibold sm:text-5xl">
        Roadmaps
      </h1>
      <p className="mt-5 max-w-2xl text-lg leading-relaxed text-foreground-dim">
        Follow a learning path, build evidence of competence, and connect each
        step to the systems and concepts in this Second Brain.
      </p>
      <div className="mt-12 space-y-6">
        {roadmaps.map((doc) => (
          <Link
            key={doc.slug}
            href={doc.url}
            className="group block rounded-[var(--radius-m)] border border-line p-6 transition-colors hover:border-accent sm:p-8"
          >
            <p className="font-mono text-xs uppercase tracking-wide text-accent">
              {doc.slug === "ai-forward-deployed-engineer"
                ? "Featured learning path / 5 stages + client pilot"
                : "Retrieval systems / 6 stages"}
            </p>
            <h2 className="mt-4 font-display text-2xl font-semibold sm:text-3xl">
              {doc.title}
            </h2>
            <p className="mt-3 max-w-3xl leading-relaxed text-foreground-dim">
              {doc.summary}
            </p>
            <span className="mt-6 inline-flex items-center gap-2 text-sm text-accent">
              Explore roadmap <ArrowRight size={16} aria-hidden="true" />
            </span>
          </Link>
        ))}
      </div>
      <p className="mt-10 max-w-2xl text-sm leading-relaxed text-foreground-dim">
        These are learning guides. Suggested timelines and example evaluation
        targets should be adapted to your starting point, project scope, and
        access to real systems.
      </p>
    </div>
  );
}
