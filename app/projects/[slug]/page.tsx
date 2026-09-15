import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ExternalLink, GitBranch } from "lucide-react";
import {
  getBySlug,
  getPublishedByType,
  resolveBacklinks,
  resolveRelated,
} from "@/lib/content";
import { RelatedPanel } from "@/components/content/related-panel";
import { MdxContent } from "@/components/mdx/mdx-content";
import { contentMetadata, structuredData } from "@/lib/seo/metadata";

export function generateStaticParams() {
  return getPublishedByType("PROJECT").map((project) => ({
    slug: project.slug,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = getBySlug("PROJECT", slug);
  return project ? contentMetadata(project) : {};
}

export default async function ProjectDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = getBySlug("PROJECT", slug);
  if (!project || project.status !== "PUBLISHED") notFound();

  const related = resolveRelated(project);
  const backlinks = resolveBacklinks(project.slug);
  const jsonLd = structuredData("PROJECT", project);

  return (
    <div className="mx-auto grid max-w-6xl grid-cols-1 gap-12 px-6 py-16 lg:grid-cols-[1fr_260px]">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <article>
        <Link
          href="/projects"
          className="mb-8 inline-flex items-center gap-2 text-sm text-foreground-dim transition-colors hover:text-accent"
        >
          <ArrowLeft className="h-4 w-4" aria-hidden="true" />
          All projects
        </Link>

        <div className="mb-3 flex flex-wrap gap-2">
          {project.tags.map((tag: string) => (
            <span
              key={tag}
              className="rounded-full border border-line px-2 py-1 font-mono text-[10px] uppercase tracking-wide text-foreground-faint"
            >
              {tag}
            </span>
          ))}
        </div>

        <h1 className="font-display text-3xl font-semibold sm:text-4xl">
          {project.title}
        </h1>
        <p className="mt-4 max-w-2xl text-lg leading-8 text-foreground-dim">
          {project.summary}
        </p>

        <div className="mt-7 flex flex-wrap gap-3">
          {project.repoUrl && (
            <a
              href={project.repoUrl}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 rounded-[var(--radius-s)] border border-line px-4 py-2.5 text-sm font-medium transition-colors hover:border-foreground-faint hover:text-accent"
            >
              <GitBranch className="h-4 w-4" aria-hidden="true" />
              View source
            </a>
          )}
          {project.demoUrl && (
            <a
              href={project.demoUrl}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 rounded-[var(--radius-s)] bg-accent px-4 py-2.5 text-sm font-medium text-white transition-opacity hover:opacity-90"
            >
              <ExternalLink className="h-4 w-4" aria-hidden="true" />
              Open live demo
            </a>
          )}
        </div>

        <div className="mt-10">
          <MdxContent code={project.body.code} />
        </div>

        {(project.challenges || project.lessons || project.futureWork) && (
          <div className="mt-12 grid gap-5 border-t border-line pt-8 md:grid-cols-2">
            {project.challenges && (
              <ProjectField label="Challenges" value={project.challenges} />
            )}
            {project.lessons && (
              <ProjectField label="Lessons" value={project.lessons} />
            )}
            {project.futureWork && (
              <ProjectField label="Future work" value={project.futureWork} />
            )}
          </div>
        )}
      </article>

      <aside className="lg:pt-12">
        <RelatedPanel related={related} backlinks={backlinks} />
      </aside>
    </div>
  );
}

function ProjectField({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-[var(--radius-m)] border border-line bg-surface p-5">
      <div className="mb-2 font-mono text-xs uppercase tracking-wide text-foreground-faint">
        {label}
      </div>
      <p className="text-sm leading-6 text-foreground-dim">{value}</p>
    </div>
  );
}
