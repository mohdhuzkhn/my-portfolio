import { notFound } from "next/navigation";
import { getBySlug, getPublishedByType, resolveRelated, resolveBacklinks } from "@/lib/content";
import { contentMetadata, structuredData } from "@/lib/seo/metadata";
import { MdxContent } from "@/components/mdx/mdx-content";
import { RelatedPanel } from "@/components/content/related-panel";

export function generateStaticParams() {
  return getPublishedByType("PLAYBOOK").map((doc) => ({ slug: doc.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const doc = getBySlug("PLAYBOOK", slug);
  if (!doc) return {};
  return contentMetadata(doc);
}

export default async function PlaybookDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const doc = getBySlug("PLAYBOOK", slug);
  if (!doc || doc.status !== "PUBLISHED") notFound();

  const jsonLd = structuredData("PLAYBOOK", doc);
  const related = resolveRelated(doc);
  const backlinks = resolveBacklinks(doc.slug);
  const steps = (doc.steps as { order: number; title: string; detail: string }[]).sort(
    (a, b) => a.order - b.order,
  );

  return (
    <div className="mx-auto grid max-w-6xl grid-cols-1 gap-12 px-6 py-16 lg:grid-cols-[1fr_260px]">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <article>
        <h1 className="font-display text-3xl font-semibold sm:text-4xl">{doc.title}</h1>
        <p className="mt-3 text-lg text-foreground-dim">{doc.summary}</p>

        <div className="mt-8 rounded-[var(--radius-m)] border border-line bg-surface p-6">
          <div className="mb-2 font-mono text-xs uppercase tracking-wide text-foreground-faint">
            Overview
          </div>
          <p className="text-sm text-foreground-dim">{doc.overview}</p>
        </div>

        <div className="mt-10">
          <MdxContent code={doc.body.code} />
        </div>

        <div className="mt-10">
          <h2 className="mb-5 font-display text-xl font-semibold">Workflow</h2>
          <ol className="space-y-6">
            {steps.map((step) => (
              <li key={step.order} className="flex gap-4">
                <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-accent-dim font-mono text-xs text-accent">
                  {step.order}
                </span>
                <div>
                  <h3 className="font-medium">{step.title}</h3>
                  <p className="mt-1 text-sm text-foreground-dim">{step.detail}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>

        {(doc.recommendedStack || doc.commonMistakes || doc.tradeoffs) && (
          <div className="mt-12 space-y-8 border-t border-line pt-8">
            {doc.recommendedStack && <Field label="Recommended Stack" value={doc.recommendedStack} />}
            {doc.commonMistakes && <Field label="Common Mistakes" value={doc.commonMistakes} />}
            {doc.tradeoffs && <Field label="Tradeoffs" value={doc.tradeoffs} />}
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
