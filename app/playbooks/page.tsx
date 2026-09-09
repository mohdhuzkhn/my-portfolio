import Link from "next/link";
import { getPublishedByType } from "@/lib/content";

export const metadata = {
  title: "Playbooks",
  description: "Actionable engineering frameworks — step-by-step execution paths, not concept explanations.",
};

export default function PlaybooksIndexPage() {
  const playbooks = getPublishedByType("PLAYBOOK");

  return (
    <div className="mx-auto max-w-3xl px-6 py-16">
      <div className="mb-2 font-mono text-xs uppercase tracking-wide text-foreground-faint">
        Execution, not just explanation
      </div>
      <h1 className="font-display text-3xl font-semibold">Playbooks</h1>
      <p className="mt-3 max-w-xl text-foreground-dim">
        Knowledge explains what a concept is. Research explains what was
        discovered. Playbooks explain how to actually build it.
      </p>

      <div className="mt-10 space-y-6">
        {playbooks.map((doc) => (
          <Link key={doc.slug} href={doc.url} className="block group rounded-[var(--radius-m)] border border-line p-6 transition-colors hover:border-foreground-faint">
            <h3 className="text-lg font-medium group-hover:text-accent">{doc.title}</h3>
            <p className="mt-1.5 text-sm text-foreground-dim">{doc.summary}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
