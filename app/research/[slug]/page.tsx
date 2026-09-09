import { notFound } from "next/navigation";
import { getBySlug, getPublishedByType, resolveRelated, resolveBacklinks } from "@/lib/content";
import { contentMetadata, structuredData } from "@/lib/seo/metadata";
import { MdxContent } from "@/components/mdx/mdx-content";
import { RelatedPanel } from "@/components/content/related-panel";

export function generateStaticParams() {
  return getPublishedByType("RESEARCH").map((doc) => ({ slug: doc.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const doc = getBySlug("RESEARCH", slug);
  if (!doc) return {};
  return contentMetadata(doc);
}

export default async function ResearchDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const doc = getBySlug("RESEARCH", slug);
  if (!doc || doc.status !== "PUBLISHED") notFound();

  const jsonLd = structuredData("RESEARCH", doc);
  const related = resolveRelated(doc);
  const backlinks = resolveBacklinks(doc.slug);

  return (
    <div className="mx-auto grid max-w-6xl grid-cols-1 gap-12 px-6 py-16 lg:grid-cols-[1fr_260px]">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <article>
        <div className="mb-3 flex items-center gap-3 font-mono text-xs text-foreground-faint">
          <span className="rounded-full border border-line px-2 py-0.5">{doc.layer}</span>
          <span>{doc.category}</span>
          <span>·</span>
          <span>{doc.readingTime} min read</span>
        </div>
        <h1 className="font-display text-3xl font-semibold sm:text-4xl">{doc.title}</h1>
        <p className="mt-3 text-lg text-foreground-dim">{doc.summary}</p>

        {doc.abstract && (
          <div className="mt-8 rounded-[var(--radius-m)] border border-line bg-surface p-6">
            <div className="mb-2 font-mono text-xs uppercase tracking-wide text-foreground-faint">
              Abstract
            </div>
            <p className="text-sm text-foreground-dim">{doc.abstract}</p>
          </div>
        )}

        <div className="mt-10">
          <MdxContent code={doc.body.code} />
        </div>

        {(doc.methodology || doc.results || doc.limitations || doc.futureWork) && (
          <div className="mt-12 space-y-8 border-t border-line pt-8">
            {doc.methodology && <Field label="Methodology" value={doc.methodology} />}
            {doc.results && <Field label="Results" value={doc.results} />}
            {doc.limitations && <Field label="Limitations" value={doc.limitations} />}
            {doc.futureWork && <Field label="Future Work" value={doc.futureWork} />}
          </div>
        )}
      </article>

      <aside className="lg:pt-2">
        <RelatedPanel related={related} backlinks={backlinks} />
      </aside>
    </div>
  );
}

function Field({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <div className="mb-2 font-mono text-xs uppercase tracking-wide text-foreground-faint">
        {label}
      </div>
      <p className="text-sm text-foreground-dim">{value}</p>
    </div>
  );
}
