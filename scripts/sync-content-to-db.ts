/**
 * Ingests every MDX document under /content into Postgres: one Content
 * row + one type-specific detail row per document, tags, and ContentLink
 * edges resolved from each document's `related` slug list.
 *
 * This script reads MDX files directly (via gray-matter) rather than
 * importing Contentlayer's generated output. Contentlayer's build emits
 * ESM-only (`index.mjs`, no CJS build) — fine for Next.js, since webpack
 * resolves it internally, but not loadable through Node's plain CJS
 * `require()`, which is what a standalone `tsx` script uses. Reading the
 * MDX directly sidesteps that mismatch entirely and keeps this script
 * portable across OSes and run contexts. The 14 MDX schemas themselves
 * remain defined once, in contentlayer.config.ts, which is what the
 * Next.js app (lib/content/index.ts) actually renders from.
 *
 * Run with: npm run content:sync
 * Requires DATABASE_URL and a generated Prisma client (`npx prisma generate`).
 */
import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import readingTime from "reading-time";
import { prisma } from "@/lib/db/client";

type ContentTypeKey =
  | "RESEARCH"
  | "BRAIN"
  | "ARCHITECTURE"
  | "WRITING"
  | "PROJECT"
  | "LAB_EXPERIMENT"
  | "JOURNEY_MILESTONE"
  | "ROADMAP"
  | "VENTURE"
  | "PLAYBOOK"
  | "CASE_STUDY"
  | "TALK"
  | "DATASET"
  | "TOOLBOX_ENTRY";

// Mirrors contentDirPath patterns in contentlayer.config.ts.
const folderByType: Record<ContentTypeKey, string> = {
  RESEARCH: "research",
  BRAIN: "knowledge",
  ARCHITECTURE: "architecture",
  WRITING: "writing",
  PROJECT: "projects",
  LAB_EXPERIMENT: "lab",
  JOURNEY_MILESTONE: "journey",
  ROADMAP: "roadmaps",
  VENTURE: "ventures",
  PLAYBOOK: "playbooks",
  CASE_STUDY: "case-studies",
  TALK: "talks",
  DATASET: "datasets",
  TOOLBOX_ENTRY: "toolbox",
};

const CONTENT_ROOT = path.join(process.cwd(), "content");

function findMdxFiles(dir: string): string[] {
  if (!fs.existsSync(dir)) return [];
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  return entries.flatMap((entry) => {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) return findMdxFiles(full);
    return entry.name.endsWith(".mdx") ? [full] : [];
  });
}

/** Loads and parses every MDX file for one content type. */
function loadType(type: ContentTypeKey) {
  const dir = path.join(CONTENT_ROOT, folderByType[type]);
  return findMdxFiles(dir).map((filePath) => {
    const raw = fs.readFileSync(filePath, "utf-8");
    const { data, content } = matter(raw);
    const slug = path.basename(filePath, ".mdx");
    return {
      ...data,
      slug,
      url: `/${folderByType[type]}/${slug}`,
      readingTime: Math.ceil(readingTime(content).minutes),
      body: { raw: content },
      status: data.status ?? "DRAFT",
      tags: data.tags ?? [],
      related: data.related ?? [],
      ...(type === "RESEARCH" ? { layer: data.layer ?? "PAPER" } : {}),
      ...(type === "LAB_EXPERIMENT" ? { experimentStatus: data.experimentStatus ?? "IDEA" } : {}),
      ...(type === "VENTURE" ? { ventureStatus: data.ventureStatus ?? "IDEA" } : {}),
    };
  });
}

function loadAllContent(): Record<ContentTypeKey, any[]> {
  const result = {} as Record<ContentTypeKey, any[]>;
  for (const type of Object.keys(folderByType) as ContentTypeKey[]) {
    result[type] = loadType(type);
  }
  return result;
}

async function upsertTags(contentId: string, tags: string[]) {
  for (const name of tags) {
    const tag = await prisma.tag.upsert({
      where: { name },
      update: {},
      create: { name },
    });
    await prisma.tagOnContent.upsert({
      where: { tagId_contentId: { tagId: tag.id, contentId } },
      update: {},
      create: { tagId: tag.id, contentId },
    });
  }
}

/** Builds the type-specific detail upsert for a single Content row. */
async function upsertDetail(type: ContentTypeKey, contentId: string, doc: any) {
  switch (type) {
    case "RESEARCH":
      return prisma.researchDetail.upsert({
        where: { contentId },
        update: {
          layer: doc.layer,
          category: doc.category,
          abstract: doc.abstract,
          methodology: doc.methodology,
          results: doc.results,
          limitations: doc.limitations,
          futureWork: doc.futureWork,
          pdfUrl: doc.pdfUrl,
        },
        create: {
          contentId,
          layer: doc.layer,
          category: doc.category,
          abstract: doc.abstract,
          methodology: doc.methodology,
          results: doc.results,
          limitations: doc.limitations,
          futureWork: doc.futureWork,
          pdfUrl: doc.pdfUrl,
        },
      });

    case "BRAIN":
      return prisma.brainDetail.upsert({
        where: { contentId },
        update: { category: doc.category, examples: doc.examples, codeSnippets: doc.codeSnippets },
        create: { contentId, category: doc.category, examples: doc.examples, codeSnippets: doc.codeSnippets },
      });

    case "ARCHITECTURE":
      return prisma.architectureDetail.upsert({
        where: { contentId },
        update: {
          diagramSvg: doc.diagramSvg ?? "",
          components: doc.components,
          dataFlow: doc.dataFlow,
          tradeoffs: doc.tradeoffs,
          scalability: doc.scalability,
          failurePoints: doc.failurePoints,
          costAnalysis: doc.costAnalysis,
        },
        create: {
          contentId,
          diagramSvg: doc.diagramSvg ?? "",
          components: doc.components,
          dataFlow: doc.dataFlow,
          tradeoffs: doc.tradeoffs,
          scalability: doc.scalability,
          failurePoints: doc.failurePoints,
          costAnalysis: doc.costAnalysis,
        },
      });

    case "WRITING":
      return prisma.writingDetail.upsert({
        where: { contentId },
        update: { category: doc.category },
        create: { contentId, category: doc.category },
      });

    case "PROJECT": {
      const detail = await prisma.projectDetail.upsert({
        where: { contentId },
        update: {
          repoUrl: doc.repoUrl,
          demoUrl: doc.demoUrl,
          challenges: doc.challenges,
          lessons: doc.lessons,
          futureWork: doc.futureWork,
        },
        create: {
          contentId,
          repoUrl: doc.repoUrl,
          demoUrl: doc.demoUrl,
          challenges: doc.challenges,
          lessons: doc.lessons,
          futureWork: doc.futureWork,
        },
      });
      if (doc.screenshots?.length) {
        await prisma.screenshot.deleteMany({ where: { projectId: detail.id } });
        await prisma.screenshot.createMany({
          data: doc.screenshots.map((url: string) => ({ projectId: detail.id, url })),
        });
      }
      return detail;
    }

    case "LAB_EXPERIMENT":
      return prisma.labDetail.upsert({
        where: { contentId },
        update: {
          category: doc.category,
          status: doc.experimentStatus,
          hypothesis: doc.hypothesis,
          goal: doc.goal,
          setup: doc.setup,
          architectureNote: doc.architectureNote,
          results: doc.results,
          lessonsLearned: doc.lessonsLearned,
          futureIterations: doc.futureIterations,
        },
        create: {
          contentId,
          category: doc.category,
          status: doc.experimentStatus,
          hypothesis: doc.hypothesis,
          goal: doc.goal,
          setup: doc.setup,
          architectureNote: doc.architectureNote,
          results: doc.results,
          lessonsLearned: doc.lessonsLearned,
          futureIterations: doc.futureIterations,
        },
      });

    case "JOURNEY_MILESTONE":
      return prisma.journeyDetail.upsert({
        where: { contentId },
        update: {
          milestoneDate: new Date(doc.milestoneDate),
          sequenceIndex: doc.sequenceIndex,
          stageName: doc.stageName,
        },
        create: {
          contentId,
          milestoneDate: new Date(doc.milestoneDate),
          sequenceIndex: doc.sequenceIndex,
          stageName: doc.stageName,
        },
      });

    case "ROADMAP": {
      const detail = await prisma.roadmapDetail.upsert({
        where: { contentId },
        update: {},
        create: { contentId },
      });
      // Stages are re-created each sync: simplest way to keep order/deps
      // consistent with the MDX source without diffing.
      await prisma.roadmapStage.deleteMany({ where: { roadmapId: detail.id } });
      const stages: { title: string; order: number; dependsOn?: string; resourceNote?: string }[] =
        doc.stages ?? [];
      const created: Record<string, string> = {};
      for (const stage of stages.sort((a, b) => a.order - b.order)) {
        const row = await prisma.roadmapStage.create({
          data: {
            roadmapId: detail.id,
            title: stage.title,
            order: stage.order,
            resourceNote: stage.resourceNote,
          },
        });
        created[stage.title] = row.id;
      }
      for (const stage of stages) {
        if (stage.dependsOn && created[stage.dependsOn]) {
          await prisma.roadmapStage.update({
            where: { id: created[stage.title] },
            data: { dependsOnId: created[stage.dependsOn] },
          });
        }
      }
      return detail;
    }

    case "VENTURE":
      return prisma.ventureDetail.upsert({
        where: { contentId },
        update: {
          status: doc.ventureStatus,
          problem: doc.problem,
          vision: doc.vision,
          market: doc.market,
          technicalNote: doc.technicalNote,
          currentStatus: doc.currentStatus,
          futurePlans: doc.futurePlans,
        },
        create: {
          contentId,
          status: doc.ventureStatus,
          problem: doc.problem,
          vision: doc.vision,
          market: doc.market,
          technicalNote: doc.technicalNote,
          currentStatus: doc.currentStatus,
          futurePlans: doc.futurePlans,
        },
      });

    case "PLAYBOOK": {
      const detail = await prisma.playbookDetail.upsert({
        where: { contentId },
        update: {
          overview: doc.overview,
          problem: doc.problem,
          prerequisites: doc.prerequisites,
          architectureNote: doc.architectureNote,
          recommendedStack: doc.recommendedStack,
          commonMistakes: doc.commonMistakes,
          tradeoffs: doc.tradeoffs,
        },
        create: {
          contentId,
          overview: doc.overview,
          problem: doc.problem,
          prerequisites: doc.prerequisites,
          architectureNote: doc.architectureNote,
          recommendedStack: doc.recommendedStack,
          commonMistakes: doc.commonMistakes,
          tradeoffs: doc.tradeoffs,
        },
      });
      if (doc.steps?.length) {
        await prisma.playbookStep.deleteMany({ where: { playbookId: detail.id } });
        await prisma.playbookStep.createMany({
          data: doc.steps.map((s: { order: number; title: string; detail: string }) => ({
            playbookId: detail.id,
            order: s.order,
            title: s.title,
            detail: s.detail,
          })),
        });
      }
      return detail;
    }

    case "CASE_STUDY":
      return prisma.caseStudyDetail.upsert({
        where: { contentId },
        update: {
          problem: doc.problem,
          constraints: doc.constraints,
          researchNote: doc.researchNote,
          architectureNote: doc.architectureNote,
          technicalDecisions: doc.technicalDecisions,
          challenges: doc.challenges,
          results: doc.results,
          lessonsLearned: doc.lessonsLearned,
          futureImprovements: doc.futureImprovements,
        },
        create: {
          contentId,
          problem: doc.problem,
          constraints: doc.constraints,
          researchNote: doc.researchNote,
          architectureNote: doc.architectureNote,
          technicalDecisions: doc.technicalDecisions,
          challenges: doc.challenges,
          results: doc.results,
          lessonsLearned: doc.lessonsLearned,
          futureImprovements: doc.futureImprovements,
        },
      });

    case "TALK":
      return prisma.talkDetail.upsert({
        where: { contentId },
        update: {
          talkType: doc.talkType,
          event: doc.event,
          eventDate: new Date(doc.eventDate),
          slidesUrl: doc.slidesUrl,
          recordingUrl: doc.recordingUrl,
          resourcesNote: doc.resourcesNote,
        },
        create: {
          contentId,
          talkType: doc.talkType,
          event: doc.event,
          eventDate: new Date(doc.eventDate),
          slidesUrl: doc.slidesUrl,
          recordingUrl: doc.recordingUrl,
          resourcesNote: doc.resourcesNote,
        },
      });

    case "DATASET":
      return prisma.datasetDetail.upsert({
        where: { contentId },
        update: { source: doc.source, license: doc.license, domain: doc.domain, useCases: doc.useCases },
        create: { contentId, source: doc.source, license: doc.license, domain: doc.domain, useCases: doc.useCases },
      });

    case "TOOLBOX_ENTRY":
      return prisma.toolboxDetail.upsert({
        where: { contentId },
        update: {
          whyIUseIt: doc.whyIUseIt,
          alternatives: doc.alternatives,
          strengths: doc.strengths,
          weaknesses: doc.weaknesses,
          bestUseCases: doc.bestUseCases,
        },
        create: {
          contentId,
          whyIUseIt: doc.whyIUseIt,
          alternatives: doc.alternatives,
          strengths: doc.strengths,
          weaknesses: doc.weaknesses,
          bestUseCases: doc.bestUseCases,
        },
      });
  }
}

async function main() {
  const contentByType = loadAllContent();
  const slugToContentId = new Map<string, string>();
  const allDocsWithType: { type: ContentTypeKey; doc: any }[] = [];

  // Pass 1: upsert every Content row + its detail row + tags.
  for (const [type, docs] of Object.entries(contentByType) as [ContentTypeKey, any[]][]) {
    for (const doc of docs) {
      const content = await prisma.content.upsert({
        where: { slug: doc.slug },
        update: {
          type: type as any,
          title: doc.title,
          summary: doc.summary,
          status: doc.status,
          publishedAt: doc.publishedAt ? new Date(doc.publishedAt) : null,
          readingTime: doc.readingTime,
          body: doc.body.raw,
          ogImage: doc.ogImage,
        },
        create: {
          type: type as any,
          slug: doc.slug,
          title: doc.title,
          summary: doc.summary,
          status: doc.status,
          publishedAt: doc.publishedAt ? new Date(doc.publishedAt) : null,
          readingTime: doc.readingTime,
          body: doc.body.raw,
          ogImage: doc.ogImage,
        },
      });
      slugToContentId.set(doc.slug, content.id);
      await upsertDetail(type, content.id, doc);
      await upsertTags(content.id, doc.tags ?? []);
      allDocsWithType.push({ type, doc });
    }
  }

  // Pass 2: ContentLink edges, now that every slug has a Content id —
  // deferred to its own pass because `related` can point forward to a
  // document processed earlier or later in Pass 1, across any type.
  for (const { doc } of allDocsWithType) {
    const sourceId = slugToContentId.get(doc.slug);
    if (!sourceId) continue;
    for (const relatedSlug of doc.related ?? []) {
      const targetId = slugToContentId.get(relatedSlug);
      if (!targetId) {
        console.warn(`  ⚠ ${doc.slug} -> "${relatedSlug}" (no matching content found, skipped)`);
        continue;
      }
      await prisma.contentLink.upsert({
        where: { sourceId_targetId_relation: { sourceId, targetId, relation: "" } },
        update: {},
        create: { sourceId, targetId },
      });
    }
  }

  console.log(`✓ Synced ${allDocsWithType.length} content items across 14 types.`);
}

main()
  .catch((err) => {
    console.error(err);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
