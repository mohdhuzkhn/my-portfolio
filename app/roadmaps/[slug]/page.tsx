import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight, ChevronDown, CheckCircle2 } from "lucide-react";
import { allRoadmaps } from "contentlayer/generated";
import { MdxContent } from "@/components/mdx/mdx-content";
import { contentMetadata } from "@/lib/seo/metadata";

type Stage = {
  title: string;
  order: number;
  weeks?: string;
  objective?: string;
  learn?: string[];
  project?: string;
  build?: string;
  gate?: string;
  links?: { label: string; href: string }[];
};

const sections = [
  { id: "learning-path", label: "Learning path" },
  { id: "architecture", label: "Architecture decisions" },
  { id: "evaluation", label: "Evaluation gates" },
  { id: "client-pilot", label: "30-day client pilot" },
  { id: "discovery", label: "Discovery & ROI" },
  { id: "stack", label: "Recommended stack" },
  { id: "evidence", label: "Portfolio evidence" },
  { id: "resources", label: "Resources & caveats" },
];

export function generateStaticParams() {
  return allRoadmaps
    .filter((doc) => doc.status === "PUBLISHED")
    .map((doc) => ({ slug: doc.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const doc = allRoadmaps.find(
    (item) => item.slug === slug && item.status === "PUBLISHED",
  );
  return doc ? contentMetadata(doc) : {};
}

export default async function RoadmapDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const doc = allRoadmaps.find(
    (item) => item.slug === slug && item.status === "PUBLISHED",
  );
  if (!doc) notFound();
  const stages: Stage[] = doc.stages;
  const isFde = slug === "ai-forward-deployed-engineer";

  return (
    <div className="mx-auto max-w-6xl px-6 py-12 sm:py-16">
      <Link
        href="/roadmaps"
        className="inline-flex items-center gap-2 text-sm text-foreground-dim hover:text-accent"
      >
        <ArrowLeft size={16} aria-hidden="true" /> All roadmaps
      </Link>
      <header className="mt-10">
        <p className="font-mono text-xs uppercase tracking-widest text-accent">
          {isFde
            ? "Learning guide / Version 1.0 / October 2026"
            : "Learning guide / Retrieval systems"}
        </p>
        <h1 className="mt-4 max-w-4xl font-display text-4xl font-semibold leading-tight sm:text-5xl">
          {doc.title}
        </h1>
        <p className="mt-5 max-w-3xl text-lg leading-relaxed text-foreground-dim">
          {doc.summary}
        </p>
        {isFde && (
          <>
            <p className="mt-5 max-w-3xl leading-relaxed text-foreground-dim">
              An AI Forward Deployed Engineer works with users and business
              stakeholders to diagnose a bottleneck, deploy a solution inside
              existing systems, and measure whether the workflow improves.
            </p>
            <div className="mt-8 grid gap-px overflow-hidden rounded-[var(--radius-m)] border border-line bg-line sm:grid-cols-2">
              <div className="bg-background p-6">
                <p className="font-mono text-xs uppercase tracking-wide text-accent">
                  Learning clock
                </p>
                <p className="mt-3 font-display text-2xl font-semibold">
                  12–16 weeks, suggested
                </p>
                <p className="mt-2 text-sm leading-relaxed text-foreground-dim">
                  Five stages with proof projects. Advance when you can
                  demonstrate the exit criteria, rather than on a fixed date.
                </p>
              </div>
              <div className="bg-background p-6">
                <p className="font-mono text-xs uppercase tracking-wide text-accent">
                  Delivery clock
                </p>
                <p className="mt-3 font-display text-2xl font-semibold">
                  30 days per scoped pilot
                </p>
                <p className="mt-2 text-sm leading-relaxed text-foreground-dim">
                  A separate client execution loop, assuming timely access, a
                  narrow use case, and responsive stakeholders.
                </p>
              </div>
            </div>
          </>
        )}
      </header>
      <div className="mt-12 grid min-w-0 gap-10 lg:grid-cols-[200px_minmax(0,1fr)]">
        <aside className="min-w-0">
          <nav aria-label="Roadmap sections" className="lg:sticky lg:top-24">
            <p className="mb-4 font-mono text-xs uppercase tracking-wide text-foreground-dim">
              On this page
            </p>
            <div className="flex flex-wrap gap-x-5 gap-y-3 lg:flex-col">
              {(isFde ? sections : sections.slice(0, 1)).map((item) => (
                <a
                  key={item.id}
                  href={`#${item.id}`}
                  className="text-sm text-foreground-dim hover:text-accent"
                >
                  {item.label}
                </a>
              ))}
            </div>
          </nav>
        </aside>
        <article className="min-w-0">
          <section id="learning-path" className="scroll-mt-24">
            <p className="font-mono text-xs uppercase tracking-wide text-accent">
              Build the foundations first
            </p>
            <h2 className="mt-3 font-display text-3xl font-semibold">
              The learning path
            </h2>
            <p className="mt-4 leading-relaxed text-foreground-dim">
              {isFde
                ? "Start with a reliable service, add AI selectively, evaluate its behavior, then integrate it into a real workflow. Open each stage for what to learn, what to build, and how to judge readiness."
                : "Work through each dependency in order. Use related Knowledge articles and AI Systems guides to put the concepts into practice."}
            </p>
            <div className="mt-6 space-y-4">
              {stages.map((stage, index) => (
                <details
                  key={stage.order}
                  open={index === 0 || !isFde}
                  className="group rounded-[var(--radius-m)] border border-line"
                >
                  <summary className="flex cursor-pointer list-none items-start gap-4 p-5 focus-visible:outline-2 focus-visible:outline-accent sm:p-6 [&::-webkit-details-marker]:hidden">
                    <span className="pt-1 font-mono text-sm text-accent">
                      {String(stage.order).padStart(2, "0")}
                    </span>
                    <span className="min-w-0 flex-1">
                      {stage.weeks && (
                        <span className="mb-2 block font-mono text-xs uppercase tracking-wide text-foreground-dim">
                          {stage.weeks}
                        </span>
                      )}
                      <span className="block font-display text-xl font-semibold">
                        {stage.title}
                      </span>
                      {stage.objective && (
                        <span className="mt-2 block text-sm leading-relaxed text-foreground-dim">
                          {stage.objective}
                        </span>
                      )}
                    </span>
                    <ChevronDown
                      size={18}
                      aria-hidden="true"
                      className="mt-1 shrink-0 text-foreground-dim transition-transform group-open:rotate-180"
                    />
                  </summary>
                  <div className="border-t border-line p-5 sm:p-6">
                    {stage.learn && (
                      <>
                        <h3 className="font-display text-lg font-semibold">
                          What to learn
                        </h3>
                        <ul className="mt-4 list-disc space-y-3 pl-5 text-sm leading-relaxed text-foreground-dim">
                          {stage.learn.map((item) => (
                            <li key={item}>{item}</li>
                          ))}
                        </ul>
                      </>
                    )}
                    {stage.build && (
                      <div className="mt-6">
                        <p className="font-mono text-xs uppercase tracking-wide text-accent">
                          Proof project
                        </p>
                        <h3 className="mt-2 font-display text-lg font-semibold">
                          {stage.project}
                        </h3>
                        <p className="mt-3 text-sm leading-relaxed text-foreground-dim">
                          {stage.build}
                        </p>
                      </div>
                    )}
                    {stage.gate && (
                      <div className="mt-6 flex gap-3 rounded-[var(--radius-s)] bg-surface p-4">
                        <CheckCircle2
                          size={18}
                          aria-hidden="true"
                          className="mt-1 shrink-0 text-accent"
                        />
                        <div>
                          <h3 className="text-sm font-semibold">
                            Ready to move on when…
                          </h3>
                          <p className="mt-2 text-sm leading-relaxed text-foreground-dim">
                            {stage.gate}
                          </p>
                        </div>
                      </div>
                    )}
                    {stage.links && (
                      <div className="mt-5 flex flex-wrap gap-x-5 gap-y-3">
                        {stage.links.map((link) => (
                          <Link
                            key={link.href}
                            href={link.href}
                            className="inline-flex items-center gap-2 text-sm text-accent"
                          >
                            {link.label}
                            <ArrowRight size={14} aria-hidden="true" />
                          </Link>
                        ))}
                      </div>
                    )}
                    {!stage.learn && (
                      <p className="text-sm leading-relaxed text-foreground-dim">
                        Study {stage.title.toLowerCase()} before moving to the
                        next dependency.
                      </p>
                    )}
                  </div>
                </details>
              ))}
            </div>
          </section>
          <div className="mt-12 [&_.prose-institute]:max-w-none [&_h2]:scroll-mt-24">
            <MdxContent code={doc.body.code} />
          </div>
          <div className="mt-12 border-t border-line pt-6">
            <p className="font-mono text-xs uppercase tracking-wide text-foreground-dim">
              Keep exploring
            </p>
            <div className="mt-4 flex flex-wrap gap-x-6 gap-y-3">
              <Link href="/video" className="text-sm text-accent">
                Video learning library
              </Link>
              <Link href="/ai-systems" className="text-sm text-accent">
                AI Systems
              </Link>
              <Link href="/knowledge" className="text-sm text-accent">
                Knowledge
              </Link>
            </div>
          </div>
        </article>
      </div>
    </div>
  );
}
