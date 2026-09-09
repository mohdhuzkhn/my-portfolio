import Link from "next/link";
import { getPublishedByType } from "@/lib/content";

export function KnowledgeCategoryTree({ activeSlug }: { activeSlug?: string }) {
  const articles = getPublishedByType("BRAIN");
  const byCategory = new Map<string, typeof articles>();
  for (const a of articles) {
    if (!byCategory.has(a.category)) byCategory.set(a.category, []);
    byCategory.get(a.category)!.push(a);
  }

  return (
    <nav className="space-y-6">
      {[...byCategory.entries()].map(([category, docs]) => (
        <div key={category}>
          <div className="mb-2 font-mono text-xs uppercase tracking-wide text-foreground-faint">
            {category}
          </div>
          <ul className="space-y-1.5">
            {docs.map((doc) => (
              <li key={doc.slug}>
                <Link
                  href={doc.url}
                  className={
                    "block text-sm transition-colors " +
                    (doc.slug === activeSlug
                      ? "text-accent"
                      : "text-foreground-dim hover:text-foreground")
                  }
                >
                  {doc.title}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </nav>
  );
}
