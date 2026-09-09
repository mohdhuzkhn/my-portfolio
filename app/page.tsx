import Link from "next/link";

export default function Home() {
  return (
    <div className="mx-auto max-w-6xl px-6 py-20">
      <div className="mb-2 flex items-center gap-2 font-mono text-[13px] text-accent">
        <span
          className="h-1.5 w-1.5 rounded-full bg-live"
          style={{ animation: "pulse 2s infinite" }}
        />
        available for research collaboration &amp; freelance work
      </div>
      <h1 className="max-w-2xl font-display text-4xl font-semibold leading-tight sm:text-5xl">
        Muhammad Huzaifa is building a body of work in AI engineering.
      </h1>
      <p className="mt-5 max-w-xl text-lg text-foreground-dim">
        Research, architecture, and engineering writing on RAG systems,
        autonomous agents, and healthcare AI — published as the work happens,
        not packaged after the fact.
      </p>

      <div className="mt-10 flex flex-wrap gap-3">
        <Link
          href="/research"
          className="rounded-[var(--radius-s)] bg-accent px-5 py-2.5 text-sm font-medium text-white transition-opacity hover:opacity-90"
        >
          Enter the Research Lab
        </Link>
        <Link
          href="/knowledge"
          className="rounded-[var(--radius-s)] border border-line px-5 py-2.5 text-sm transition-colors hover:border-foreground-faint"
        >
          Browse the Knowledge base
        </Link>
        <Link
          href="/now"
          className="rounded-[var(--radius-s)] border border-line px-5 py-2.5 text-sm transition-colors hover:border-foreground-faint"
        >
          See what I&apos;m doing now
        </Link>
      </div>

      <div className="mt-24 grid gap-px overflow-hidden rounded-[var(--radius-m)] border border-line bg-line sm:grid-cols-3">
        {[
          {
            label: "Foundation phase",
            body: "This homepage is the Phase 1 skeleton. The full ten-row operating-system dashboard (Current Build, Current Research, Current Experiment, Activity Feed) lands in Phase 7, once Lab and Ventures have real content to feed it.",
          },
          {
            label: "What's live now",
            body: "Navigation shell, theming, and SEO foundation are in place. Content types, the knowledge graph, and the actual pages behind each nav item build out in Phases 2-5.",
          },
          {
            label: "What's next",
            body: "Phase 2: the content system - Prisma schema for all fourteen content types, MDX + Contentlayer + Fumadocs wiring.",
          },
        ].map((card) => (
          <div key={card.label} className="bg-background p-6">
            <div className="mb-2 font-mono text-xs uppercase tracking-wide text-foreground-faint">
              {card.label}
            </div>
            <p className="text-sm text-foreground-dim">{card.body}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
