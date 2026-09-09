import { defineDocumentType, makeSource } from "contentlayer2/source-files";
import readingTime from "reading-time";

/**
 * Every document type below mirrors its corresponding Prisma *Detail
 * model field-for-field (see prisma/schema.prisma). MDX is the authoring
 * source of truth; `scripts/sync-content.ts` upserts these into Postgres
 * (Content + ContentLink + the matching detail table) so that search,
 * the knowledge graph, and SEO metadata generation can run as SQL against
 * a consistent backbone rather than re-parsing MDX at query time.
 */

// Fields every content type shares — mirrors the `Content` backbone.
const sharedFields = {
  title: { type: "string", required: true },
  summary: { type: "string", required: true },
  status: { type: "enum", options: ["DRAFT", "PUBLISHED", "ARCHIVED"], default: "DRAFT" },
  publishedAt: { type: "date", required: false },
  ogImage: { type: "string", required: false },
  tags: { type: "list", of: { type: "string" }, default: [] },
  // Slugs of other content items this piece relates to. Ingested into
  // ContentLink edges by the sync script — `relation` lets a single list
  // carry the edge label (e.g. "usedIn:some-slug") or, for the common
  // case, a plain slug defaults to relation: null ("related").
  related: { type: "list", of: { type: "string" }, default: [] },
} as const;

const computedFields = (typeSegment: string) => ({
  slug: {
    type: "string" as const,
    resolve: (doc: any) => doc._raw.sourceFileName.replace(/\.mdx$/, ""),
  },
  url: {
    type: "string" as const,
    resolve: (doc: any) =>
      `/${typeSegment}/${doc._raw.sourceFileName.replace(/\.mdx$/, "")}`,
  },
  readingTime: {
    type: "number" as const,
    resolve: (doc: any) => Math.ceil(readingTime(doc.body.raw).minutes),
  },
});

// ── Research: three layers, one document type, `layer` field distinguishes ──
export const ResearchPaper = defineDocumentType(() => ({
  name: "ResearchPaper",
  filePathPattern: "research/**/*.mdx",
  contentType: "mdx",
  fields: {
    ...sharedFields,
    layer: { type: "enum", options: ["IDEA", "NOTE", "PAPER"], default: "PAPER" },
    category: { type: "string", required: true },
    abstract: { type: "string", required: false },
    methodology: { type: "string", required: false },
    results: { type: "string", required: false },
    limitations: { type: "string", required: false },
    futureWork: { type: "string", required: false },
    pdfUrl: { type: "string", required: false },
  },
  computedFields: computedFields("research"),
}));

// ── Knowledge (public label) / Brain (internal name) ──────────────────
export const KnowledgeArticle = defineDocumentType(() => ({
  name: "KnowledgeArticle",
  filePathPattern: "knowledge/**/*.mdx",
  contentType: "mdx",
  fields: {
    ...sharedFields,
    category: { type: "string", required: true },
    examples: { type: "string", required: false },
    codeSnippets: { type: "string", required: false },
  },
  computedFields: computedFields("knowledge"),
}));

export const ArchitectureDoc = defineDocumentType(() => ({
  name: "ArchitectureDoc",
  filePathPattern: "architecture/**/*.mdx",
  contentType: "mdx",
  fields: {
    ...sharedFields,
    diagramSvg: { type: "string", required: false },
    components: { type: "string", required: true },
    dataFlow: { type: "string", required: true },
    tradeoffs: { type: "string", required: false },
    scalability: { type: "string", required: false },
    failurePoints: { type: "string", required: false },
    costAnalysis: { type: "string", required: false },
  },
  computedFields: computedFields("architecture"),
}));

export const WritingPost = defineDocumentType(() => ({
  name: "WritingPost",
  filePathPattern: "writing/**/*.mdx",
  contentType: "mdx",
  fields: {
    ...sharedFields,
    category: { type: "string", required: true },
  },
  computedFields: computedFields("writing"),
}));

export const Project = defineDocumentType(() => ({
  name: "Project",
  filePathPattern: "projects/**/*.mdx",
  contentType: "mdx",
  fields: {
    ...sharedFields,
    repoUrl: { type: "string", required: false },
    demoUrl: { type: "string", required: false },
    challenges: { type: "string", required: false },
    lessons: { type: "string", required: false },
    futureWork: { type: "string", required: false },
    screenshots: { type: "list", of: { type: "string" }, default: [] },
  },
  computedFields: computedFields("projects"),
}));

export const LabExperiment = defineDocumentType(() => ({
  name: "LabExperiment",
  filePathPattern: "lab/**/*.mdx",
  contentType: "mdx",
  fields: {
    ...sharedFields,
    category: { type: "string", required: true },
    experimentStatus: {
      type: "enum",
      options: ["IDEA", "ACTIVE", "COMPLETED", "ARCHIVED"],
      default: "IDEA",
    },
    hypothesis: { type: "string", required: true },
    goal: { type: "string", required: true },
    setup: { type: "string", required: true },
    architectureNote: { type: "string", required: false },
    results: { type: "string", required: false },
    lessonsLearned: { type: "string", required: false },
    futureIterations: { type: "string", required: false },
  },
  computedFields: computedFields("lab"),
}));

export const JourneyMilestone = defineDocumentType(() => ({
  name: "JourneyMilestone",
  filePathPattern: "journey/**/*.mdx",
  contentType: "mdx",
  fields: {
    ...sharedFields,
    milestoneDate: { type: "date", required: true },
    sequenceIndex: { type: "number", required: true },
    stageName: { type: "string", required: true },
  },
  computedFields: computedFields("journey"),
}));

export const Roadmap = defineDocumentType(() => ({
  name: "Roadmap",
  filePathPattern: "roadmaps/**/*.mdx",
  contentType: "mdx",
  fields: {
    ...sharedFields,
    stages: {
      type: "json", // [{ title, order, dependsOn?, resourceNote? }]
      required: true,
    },
  },
  computedFields: computedFields("roadmaps"),
}));

export const Venture = defineDocumentType(() => ({
  name: "Venture",
  filePathPattern: "ventures/**/*.mdx",
  contentType: "mdx",
  fields: {
    ...sharedFields,
    ventureStatus: {
      type: "enum",
      options: ["IDEA", "RESEARCHING", "BUILDING", "LAUNCHING", "ACTIVE"],
      default: "IDEA",
    },
    problem: { type: "string", required: true },
    vision: { type: "string", required: true },
    market: { type: "string", required: false },
    technicalNote: { type: "string", required: false },
    currentStatus: { type: "string", required: false },
    futurePlans: { type: "string", required: false },
  },
  computedFields: computedFields("ventures"),
}));

export const Playbook = defineDocumentType(() => ({
  name: "Playbook",
  filePathPattern: "playbooks/**/*.mdx",
  contentType: "mdx",
  fields: {
    ...sharedFields,
    overview: { type: "string", required: true },
    problem: { type: "string", required: true },
    prerequisites: { type: "string", required: false },
    architectureNote: { type: "string", required: false },
    recommendedStack: { type: "string", required: false },
    commonMistakes: { type: "string", required: false },
    tradeoffs: { type: "string", required: false },
    steps: {
      type: "json", // [{ order, title, detail }]
      required: true,
    },
  },
  computedFields: computedFields("playbooks"),
}));

export const CaseStudy = defineDocumentType(() => ({
  name: "CaseStudy",
  filePathPattern: "case-studies/**/*.mdx",
  contentType: "mdx",
  fields: {
    ...sharedFields,
    problem: { type: "string", required: true },
    constraints: { type: "string", required: false },
    researchNote: { type: "string", required: false },
    architectureNote: { type: "string", required: false },
    technicalDecisions: { type: "string", required: false },
    challenges: { type: "string", required: false },
    results: { type: "string", required: false },
    lessonsLearned: { type: "string", required: false },
    futureImprovements: { type: "string", required: false },
  },
  computedFields: computedFields("case-studies"),
}));

export const Talk = defineDocumentType(() => ({
  name: "Talk",
  filePathPattern: "talks/**/*.mdx",
  contentType: "mdx",
  fields: {
    ...sharedFields,
    talkType: {
      type: "enum",
      options: ["CONFERENCE", "MEETUP", "PODCAST", "GUEST_LECTURE", "WORKSHOP", "WEBINAR"],
      required: true,
    },
    event: { type: "string", required: true },
    eventDate: { type: "date", required: true },
    slidesUrl: { type: "string", required: false },
    recordingUrl: { type: "string", required: false },
    resourcesNote: { type: "string", required: false },
  },
  computedFields: computedFields("talks"),
}));

export const Dataset = defineDocumentType(() => ({
  name: "Dataset",
  filePathPattern: "datasets/**/*.mdx",
  contentType: "mdx",
  fields: {
    ...sharedFields,
    source: { type: "string", required: true },
    license: { type: "string", required: true },
    domain: { type: "string", required: true },
    useCases: { type: "string", required: false },
  },
  computedFields: computedFields("datasets"),
}));

export const ToolboxEntry = defineDocumentType(() => ({
  name: "ToolboxEntry",
  filePathPattern: "toolbox/**/*.mdx",
  contentType: "mdx",
  fields: {
    ...sharedFields,
    whyIUseIt: { type: "string", required: true },
    alternatives: { type: "string", required: false },
    strengths: { type: "string", required: false },
    weaknesses: { type: "string", required: false },
    bestUseCases: { type: "string", required: false },
  },
  computedFields: computedFields("toolbox"),
}));

export default makeSource({
  contentDirPath: "content",
  documentTypes: [
    ResearchPaper,
    KnowledgeArticle,
    ArchitectureDoc,
    WritingPost,
    Project,
    LabExperiment,
    JourneyMilestone,
    Roadmap,
    Venture,
    Playbook,
    CaseStudy,
    Talk,
    Dataset,
    ToolboxEntry,
  ],
});
