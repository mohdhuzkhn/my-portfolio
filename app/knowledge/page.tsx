import Link from "next/link";
import { getPublishedByType } from "@/lib/content";
import { KnowledgeCategoryTree } from "@/components/knowledge/category-tree";

export const metadata = {
  title: "Knowledge",
  description: "A public AI engineering knowledge base — definitions, examples, and cross-linked concepts.",
};

export default function KnowledgeIndexPage() {
  const articles = getPublishedByType("BRAIN");

  return (
    <div className="mx-auto grid max-w-6xl grid-cols-1 gap-12 px-6 py-16 lg:grid-cols-[220px_1fr]">
      <aside className="lg:pt-2">
        <KnowledgeCategoryTree />
      </aside>
      <div>
        <div className="mb-2 font-mono text-xs uppercase tracking-wide text-foreground-faint">
          AI Engineering Knowledge Base
        </div>
        <h1 className="font-display text-3xl font-semibold">Knowledge</h1>
        <p className="mt-3 max-w-xl text-foreground-dim">
          The largest and fastest-growing section of the platform — every
          reusable concept from Research, Lab, and Playbooks gets a home
          here, cross-linked to everything that uses it.
        </p>

        <div className="mt-10 grid gap-px overflow-hidden rounded-[var(--radius-m)] border border-line bg-line sm:grid-cols-2">
          {articles.map((doc) => (
            <Link key={doc.slug} href={doc.url} className="group bg-background p-6">
              <div className="mb-2 font-mono text-xs text-foreground-faint">{doc.category}</div>
              <h3 className="font-medium group-hover:text-accent">{doc.title}</h3>
              <p className="mt-1.5 text-sm text-foreground-dim">{doc.summary}</p>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
