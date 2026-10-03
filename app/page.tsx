import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

const description =
  "Research, systems, experiments, projects, and engineering notes across RAG, AI Agents, Evaluation, MLOps, GPU Computing, and Healthcare AI — connected as one evolving knowledge system.";

export const metadata: Metadata = {
  title: "My Second Brain for AI Engineering",
  description,
  openGraph: {
    title: "My Second Brain for AI Engineering — Muhammad Huzaifa",
    description,
  },
};

export default function Home() {
  return (
    <div className="mx-auto max-w-6xl px-6 py-12 sm:py-20">
      <section
        aria-labelledby="hero-heading"
        className="grid items-center gap-12 lg:grid-cols-[minmax(0,1.5fr)_minmax(0,1fr)] lg:gap-16"
      >
        <div className="min-w-0">
          <div className="mb-5 flex items-start gap-2 font-mono text-xs leading-relaxed text-accent">
            <span
              aria-hidden="true"
              className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-live"
            />
            <span>
              available for AI engineering collaboration, research &amp;
              consulting
            </span>
          </div>
          <h1
            id="hero-heading"
            className="max-w-2xl font-display text-4xl font-semibold leading-tight tracking-tight sm:text-5xl xl:text-6xl"
          >
            My Second Brain for AI Engineering.
          </h1>
          <p className="mt-6 max-w-xl text-lg leading-relaxed text-foreground-dim">
            {description}
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              href="/ai-systems"
              className="inline-flex items-center justify-center rounded-[var(--radius-s)] bg-accent px-5 py-3 text-sm font-medium text-white transition-opacity hover:opacity-90 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent"
            >
              Explore AI Systems
            </Link>
            <Link
              href="/knowledge"
              className="inline-flex items-center justify-center rounded-[var(--radius-s)] border border-line px-5 py-3 text-sm font-medium transition-colors hover:border-foreground-faint focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent"
            >
              Browse Knowledge
            </Link>
            <Link
              href="/projects"
              className="inline-flex items-center justify-center rounded-[var(--radius-s)] border border-line px-5 py-3 text-sm font-medium transition-colors hover:border-foreground-faint focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent"
            >
              View Projects
            </Link>
          </div>
          <Link
            href="/now"
            className="mt-5 inline-flex items-center gap-2 py-2 text-sm text-foreground-dim underline-offset-4 transition-colors hover:text-foreground hover:underline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent"
          >
            See what I&apos;m doing now <span aria-hidden="true">&rarr;</span>
          </Link>
        </div>
        <figure className="mx-auto w-full max-w-sm lg:justify-self-end">
          <div className="overflow-hidden rounded-2xl border border-line bg-surface">
            <Image
              src="/huzaifa-profile.png"
              alt="Muhammad Huzaifa wearing a navy suit"
              width={1254}
              height={1254}
              sizes="(min-width: 1024px) 384px, (min-width: 432px) 384px, calc(100vw - 48px)"
              priority
              className="h-auto w-full"
            />
          </div>
          <figcaption className="mt-4 flex flex-wrap items-center justify-between gap-2 text-sm">
            <span className="font-medium">Muhammad Huzaifa</span>
            <span className="font-mono text-xs text-foreground-dim">
              AI Engineering
            </span>
          </figcaption>
        </figure>
      </section>

      <section
        aria-label="Inside the Second Brain"
        className="mt-16 grid gap-px overflow-hidden rounded-[var(--radius-m)] border border-line bg-line sm:mt-20 sm:grid-cols-3"
      >
        {[
          {
            label: "Build",
            body: "Production-oriented AI systems, experiments, and projects across RAG, Agents, Evaluation, MLOps, GPU Computing, and Healthcare AI.",
          },
          {
            label: "Think",
            body: "Research notes, architecture decisions, engineering logs, failures, trade-offs, and lessons behind the systems I build.",
          },
          {
            label: "Connect",
            body: "A growing knowledge graph that links concepts, projects, experiments, research, tools, and implementation patterns into one Second Brain.",
          },
        ].map((card) => (
          <div key={card.label} className="bg-background p-6 sm:p-7">
            <h2 className="mb-3 font-mono text-xs uppercase tracking-widest text-accent">
              {card.label}
            </h2>
            <p className="text-sm leading-relaxed text-foreground-dim">
              {card.body}
            </p>
          </div>
        ))}
      </section>
    </div>
  );
}
