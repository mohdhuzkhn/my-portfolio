import { notFound } from "next/navigation";
import {
  getBySlug,
  getPublishedByType,
  resolveRelated,
  resolveBacklinks,
} from "@/lib/content";
import { contentMetadata, structuredData } from "@/lib/seo/metadata";
import { MdxContent } from "@/components/mdx/mdx-content";
import { RelatedPanel } from "@/components/content/related-panel";
import { KnowledgeCategoryTree } from "@/components/knowledge/category-tree";

export function generateStaticParams() {
  return getPublishedByType("BRAIN").map((doc) => ({ slug: doc.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const doc = getBySlug("BRAIN", slug);
  if (!doc) return {};
  return contentMetadata(doc);
}

export default async function KnowledgeDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const doc = getBySlug("BRAIN", slug);
  if (!doc || doc.status !== "PUBLISHED") notFound();

  const jsonLd = structuredData("BRAIN", doc);
  const related = resolveRelated(doc);
  const backlinks = resolveBacklinks(doc.slug);

  return (
    <div className="mx-auto grid max-w-6xl grid-cols-1 gap-12 px-6 py-16 lg:grid-cols-[200px_minmax(0,1fr)] xl:grid-cols-[200px_minmax(0,1fr)_200px]">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <aside className="hidden lg:block lg:pt-2">
        <KnowledgeCategoryTree activeSlug={doc.slug} />
      </aside>

      <article className="min-w-0">
        <div className="mb-2 font-mono text-xs text-foreground-faint">
          {doc.category}
        </div>
        <h1 className="font-display text-3xl font-semibold">{doc.title}</h1>
        <p className="mt-3 text-lg text-foreground-dim">{doc.summary}</p>

        <div className="mt-8">
          <MdxContent code={doc.body.code} />
        </div>

        {doc.examples && (
          <div className="mt-10 rounded-[var(--radius-m)] border border-line bg-surface p-6">
            <div className="mb-2 font-mono text-xs uppercase tracking-wide text-foreground-faint">
              Example
            </div>
            <p className="text-sm text-foreground-dim">{doc.examples}</p>
          </div>
        )}
      </article>

      <aside className="min-w-0 lg:col-start-2 xl:col-start-auto xl:pt-2">
        <RelatedPanel related={related} backlinks={backlinks} />
      </aside>
    </div>
  );
}
