import type { Metadata } from "next";
import type { ContentTypeKey } from "@/lib/content";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://huzaifa.ai";

type BaseDoc = {
  title: string;
  summary: string;
  url: string;
  ogImage?: string;
  publishedAt?: string;
};

/** generateMetadata() input for any content-type detail page. */
export function contentMetadata(doc: BaseDoc): Metadata {
  const ogImage = doc.ogImage ?? `${siteUrl}/api/og?title=${encodeURIComponent(doc.title)}`;
  return {
    title: doc.title,
    description: doc.summary,
    alternates: { canonical: `${siteUrl}${doc.url}` },
    openGraph: {
      title: doc.title,
      description: doc.summary,
      url: `${siteUrl}${doc.url}`,
      images: [{ url: ogImage }],
      type: "article",
      publishedTime: doc.publishedAt,
    },
    twitter: {
      card: "summary_large_image",
      title: doc.title,
      description: doc.summary,
      images: [ogImage],
    },
  };
}

/**
 * JSON-LD structured data, one schema.org type per content type, per the
 * approved SEO strategy:
 * Playbook -> HowTo (direct schema fit for a step list)
 * Case Study -> TechArticle (no dedicated schema.org type exists)
 * Dataset -> Dataset (exact schema.org match)
 * Toolbox entry -> Review (strengths/weaknesses/alternatives is structurally a review)
 * Talk -> Event, omitted while the section is still in its designed-empty state
 * Everything else -> Article / ScholarlyArticle / TechArticle as the closest fit.
 */
export function structuredData(
  type: ContentTypeKey,
  doc: BaseDoc & { publishedAt?: string; steps?: { title: string; detail: string }[] },
) {
  const url = `${siteUrl}${doc.url}`;
  const base = {
    "@context": "https://schema.org",
    headline: doc.title,
    description: doc.summary,
    url,
    datePublished: doc.publishedAt,
  };

  switch (type) {
    case "PLAYBOOK":
      return {
        ...base,
        "@type": "HowTo",
        step: (doc.steps ?? []).map((s) => ({
          "@type": "HowToStep",
          name: s.title,
          text: s.detail,
        })),
      };
    case "CASE_STUDY":
      return { ...base, "@type": "TechArticle" };
    case "DATASET":
      return { ...base, "@type": "Dataset" };
    case "TOOLBOX_ENTRY":
      return { ...base, "@type": "Review", itemReviewed: { "@type": "SoftwareApplication", name: doc.title } };
    case "RESEARCH":
      return { ...base, "@type": "ScholarlyArticle" };
    case "TALK":
      return { ...base, "@type": "Event" };
    default:
      return { ...base, "@type": "TechArticle" };
  }
}
