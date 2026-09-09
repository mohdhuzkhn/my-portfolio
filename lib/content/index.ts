import {
  allResearchPapers,
  allKnowledgeArticles,
  allArchitectureDocs,
  allWritingPosts,
  allProjects,
  allLabExperiments,
  allJourneyMilestones,
  allRoadmaps,
  allVentures,
  allPlaybooks,
  allCaseStudies,
  allTalks,
  allDatasets,
  allToolboxEntries,
} from "contentlayer/generated";

/** Every content type, in one place — mirrors ContentType in prisma/schema.prisma. */
export const contentByType = {
  RESEARCH: allResearchPapers,
  BRAIN: allKnowledgeArticles, // public label "Knowledge", internal name unchanged
  ARCHITECTURE: allArchitectureDocs,
  WRITING: allWritingPosts,
  PROJECT: allProjects,
  LAB_EXPERIMENT: allLabExperiments,
  JOURNEY_MILESTONE: allJourneyMilestones,
  ROADMAP: allRoadmaps,
  VENTURE: allVentures,
  PLAYBOOK: allPlaybooks,
  CASE_STUDY: allCaseStudies,
  TALK: allTalks,
  DATASET: allDatasets,
  TOOLBOX_ENTRY: allToolboxEntries,
} as const;

export type ContentTypeKey = keyof typeof contentByType;

/** Flat list of every document across all 14 types, published only. */
export function getAllPublished() {
  return Object.values(contentByType)
    .flat()
    .filter((doc: any) => doc.status === "PUBLISHED");
}

export function getPublishedByType<K extends ContentTypeKey>(type: K) {
  return (contentByType[type] as any[]).filter(
    (doc) => doc.status === "PUBLISHED",
  );
}

export function getBySlug<K extends ContentTypeKey>(type: K, slug: string) {
  return (contentByType[type] as any[]).find((doc) => doc.slug === slug);
}

/**
 * Resolves a document's `related` slugs into the actual documents they
 * point to, searching across every content type since relations are
 * cross-type by design (a Playbook can relate to a Knowledge article and
 * a Project in the same list). This is the Phase 2 stand-in for the full
 * ContentLink-backed graph service that Phase 3 builds against Postgres —
 * same relation data, file-based lookup instead of a SQL join, so pages
 * can render related content immediately without waiting on the DB sync.
 */
export function resolveRelated(doc: { related: string[] }) {
  const all = getAllPublished();
  return doc.related
    .map((slug) => all.find((d: any) => d.slug === slug))
    .filter((d): d is NonNullable<typeof d> => Boolean(d));
}

/**
 * Backlinks: every published document, of any type, whose `related` list
 * references this slug. Same file-based stand-in as resolveRelated above.
 */
export function resolveBacklinks(slug: string) {
  return getAllPublished().filter((d: any) => d.related?.includes(slug));
}

export function getReadingTime(doc: { readingTime: number }) {
  return doc.readingTime;
}
