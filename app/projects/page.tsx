import Link from "next/link";
import { ExternalLink, GitBranch } from "lucide-react";
import { getPublishedByType } from "@/lib/content";

export const metadata = {
  title: "Projects",
  description:
    "AI systems, developer tools, and product experiments built by Muhammad Huzaifa Khan.",
};

function publishedTime(value?: string) {
  return value ? new Date(value).getTime() : 0;
}

export default function ProjectsPage() {
  const projects = [...getPublishedByType("PROJECT")].sort(
    (a, b) => publishedTime(b.publishedAt) - publishedTime(a.publishedAt),
  );

  return (
    <div className="mx-auto max-w-6xl px-6 py-16">
      <div className="mb-2 font-mono text-xs uppercase tracking-wide text-foreground-faint">
        Proof of Work
      </div>
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h1 className="font-display text-3xl font-semibold sm:text-4xl">
            Projects
          </h1>
          <p className="mt-3 max-w-2xl text-foreground-dim">
            AI systems, production experiments, and the earlier builds that show
            the path from programming fundamentals to applied AI engineering.
          </p>
        </div>
        <div className="font-mono text-xs text-foreground-faint">
          {projects.length} published projects
        </div>
      </div>

      {projects.length === 0 ? (
        <div className="mt-12 rounded-[var(--radius-m)] border border-line bg-surface p-8 text-sm text-foreground-dim">
          No projects are published yet.
        </div>
      ) : (
        <div className="mt-10 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {projects.map((project) => (
            <article
              key={project.slug}
              className="flex min-h-72 flex-col rounded-[var(--radius-m)] border border-line bg-surface p-6 transition-colors hover:border-foreground-faint"
            >
              <div className="flex flex-wrap gap-2">
                {project.tags.slice(0, 3).map((tag: string) => (
                  <span
                    key={tag}
                    className="rounded-full border border-line px-2 py-1 font-mono text-[10px] uppercase tracking-wide text-foreground-faint"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              <Link href={project.url} className="group mt-5 block">
                <h2 className="font-display text-xl font-semibold group-hover:text-accent">
                  {project.title}
                </h2>
                <p className="mt-3 text-sm leading-6 text-foreground-dim">
                  {project.summary}
                </p>
              </Link>

              <div className="mt-auto flex flex-wrap gap-3 pt-7">
                {project.repoUrl && (
                  <a
                    href={project.repoUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 rounded-[var(--radius-s)] border border-line px-3 py-2 text-xs font-medium transition-colors hover:border-foreground-faint hover:text-accent"
                  >
                    <GitBranch className="h-3.5 w-3.5" aria-hidden="true" />
                    Source
                  </a>
                )}
                {project.demoUrl && (
                  <a
                    href={project.demoUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 rounded-[var(--radius-s)] bg-accent px-3 py-2 text-xs font-medium text-white transition-opacity hover:opacity-90"
                  >
                    <ExternalLink className="h-3.5 w-3.5" aria-hidden="true" />
                    Live demo
                  </a>
                )}
              </div>
            </article>
          ))}
        </div>
      )}
    </div>
  );
}
