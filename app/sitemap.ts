import type { MetadataRoute } from "next";

// Phase 1: static route list. Phase 2+ replaces the static entries below
// with a query over all published `Content` rows across every content type,
// per the SEO strategy in the approved architecture.
const staticRoutes = [
  "",
  "research",
  "knowledge",
  "ai-systems",
  "projects",
  "video",
  "books",
  "architecture",
  "writing",
  "playbooks",
  "roadmaps",
  "roadmaps/ai-forward-deployed-engineer",
  "roadmaps/rag-engineering-roadmap",
  "journey",
  "reading-room",
  "ventures",
  "work-with-me",
  "case-studies",
  "datasets",
  "toolbox",
  "talks",
  "now",
];

export default function sitemap(): MetadataRoute.Sitemap {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://huzaifa.ai";
  return staticRoutes.map((route) => ({
    url: `${siteUrl}/${route}`,
    lastModified: new Date(),
  }));
}
