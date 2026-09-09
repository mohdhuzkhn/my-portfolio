import Link from "next/link";
import { getPublishedByType } from "@/lib/content";

export const metadata = {
  title: "Research",
  description: "Research papers, working notes, and early ideas — process, not just outcomes.",
};

const layerLabels: Record<string, string> = {
  PAPER: "Papers",
  NOTE: "Notes",
  IDEA: "Ideas",
};

export default function ResearchIndexPage() {
  const papers = getPublishedByType("RESEARCH");
  const byLayer: Record<string, typeof papers> = { PAPER: [], NOTE: [], IDEA: [] };
  for (const p of papers) byLayer[p.layer]?.push(p);

  return (
    <div className="mx-auto max-w-3xl px-6 py-16">
      <div className="mb-2 font-mono text-xs uppercase tracking-wide text-foreground-faint">
        Research Lab
      </div>
      <h1 className="font-display text-3xl font-semibold">Research</h1>
      <p className="mt-3 max-w-xl text-foreground-dim">
        Ideas, working notes, and finished papers — shown as three layers so the
        process of an idea becoming a paper stays visible, not just the outcome.
      </p>

      {(["PAPER", "NOTE", "IDEA"] as const).map((layer) => (
        <section key={layer} className="mt-12">
          <h2 className="mb-4 font-mono text-sm uppercase tracking-wide text-foreground-faint">
            {layerLabels[layer]}
          </h2>
          {byLayer[layer].length === 0 ? (
            <p className="text-sm text-foreground-faint">Nothing published in this layer yet.</p>
          ) : (
            <div className="space-y-6">
              {byLayer[layer].map((doc) => (
                <Link key={doc.slug} href={doc.url} className="block group">
                  <div className="mb-1 flex items-center gap-2 font-mono text-xs text-foreground-faint">
                    <span>{doc.category}</span>
                    <span>·</span>
                    <span>{doc.readingTime} min read</span>
                  </div>
                  <h3 className="text-lg font-medium group-hover:text-accent">{doc.title}</h3>
                  <p className="mt-1 text-sm text-foreground-dim">{doc.summary}</p>
                </Link>
              ))}
            </div>
          )}
        </section>
      ))}
    </div>
  );
}
