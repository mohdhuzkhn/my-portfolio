-- CreateEnum
CREATE TYPE "Role" AS ENUM ('ADMIN', 'READER');

-- CreateEnum
CREATE TYPE "ContentType" AS ENUM ('RESEARCH', 'BRAIN', 'ARCHITECTURE', 'WRITING', 'PROJECT', 'LAB_EXPERIMENT', 'JOURNEY_MILESTONE', 'ROADMAP', 'VENTURE', 'PLAYBOOK', 'CASE_STUDY', 'TALK', 'DATASET', 'TOOLBOX_ENTRY');

-- CreateEnum
CREATE TYPE "Status" AS ENUM ('DRAFT', 'PUBLISHED', 'ARCHIVED');

-- CreateEnum
CREATE TYPE "ResearchLayer" AS ENUM ('IDEA', 'NOTE', 'PAPER');

-- CreateEnum
CREATE TYPE "ExperimentStatus" AS ENUM ('IDEA', 'ACTIVE', 'COMPLETED', 'ARCHIVED');

-- CreateEnum
CREATE TYPE "VentureStatus" AS ENUM ('IDEA', 'RESEARCHING', 'BUILDING', 'LAUNCHING', 'ACTIVE');

-- CreateEnum
CREATE TYPE "TalkType" AS ENUM ('CONFERENCE', 'MEETUP', 'PODCAST', 'GUEST_LECTURE', 'WORKSHOP', 'WEBINAR');

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "name" TEXT,
    "role" "Role" NOT NULL DEFAULT 'READER',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Content" (
    "id" TEXT NOT NULL,
    "type" "ContentType" NOT NULL,
    "slug" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "summary" TEXT NOT NULL,
    "status" "Status" NOT NULL DEFAULT 'DRAFT',
    "publishedAt" TIMESTAMP(3),
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "readingTime" INTEGER,
    "body" TEXT NOT NULL,
    "ogImage" TEXT,

    CONSTRAINT "Content_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ContentLink" (
    "id" TEXT NOT NULL,
    "sourceId" TEXT NOT NULL,
    "targetId" TEXT NOT NULL,
    "relation" TEXT NOT NULL DEFAULT '',

    CONSTRAINT "ContentLink_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Tag" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Tag_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TagOnContent" (
    "tagId" TEXT NOT NULL,
    "contentId" TEXT NOT NULL,

    CONSTRAINT "TagOnContent_pkey" PRIMARY KEY ("tagId","contentId")
);

-- CreateTable
CREATE TABLE "ResearchDetail" (
    "id" TEXT NOT NULL,
    "contentId" TEXT NOT NULL,
    "layer" "ResearchLayer" NOT NULL DEFAULT 'PAPER',
    "category" TEXT NOT NULL,
    "abstract" TEXT,
    "methodology" TEXT,
    "results" TEXT,
    "limitations" TEXT,
    "futureWork" TEXT,
    "pdfUrl" TEXT,

    CONSTRAINT "ResearchDetail_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "BrainDetail" (
    "id" TEXT NOT NULL,
    "contentId" TEXT NOT NULL,
    "category" TEXT NOT NULL,
    "examples" TEXT,
    "codeSnippets" TEXT,

    CONSTRAINT "BrainDetail_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ArchitectureDetail" (
    "id" TEXT NOT NULL,
    "contentId" TEXT NOT NULL,
    "diagramSvg" TEXT NOT NULL,
    "components" TEXT NOT NULL,
    "dataFlow" TEXT NOT NULL,
    "tradeoffs" TEXT,
    "scalability" TEXT,
    "failurePoints" TEXT,
    "costAnalysis" TEXT,

    CONSTRAINT "ArchitectureDetail_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "WritingDetail" (
    "id" TEXT NOT NULL,
    "contentId" TEXT NOT NULL,
    "category" TEXT NOT NULL,

    CONSTRAINT "WritingDetail_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ProjectDetail" (
    "id" TEXT NOT NULL,
    "contentId" TEXT NOT NULL,
    "repoUrl" TEXT,
    "demoUrl" TEXT,
    "challenges" TEXT,
    "lessons" TEXT,
    "futureWork" TEXT,

    CONSTRAINT "ProjectDetail_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Screenshot" (
    "id" TEXT NOT NULL,
    "projectId" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "caption" TEXT,

    CONSTRAINT "Screenshot_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "LabDetail" (
    "id" TEXT NOT NULL,
    "contentId" TEXT NOT NULL,
    "category" TEXT NOT NULL,
    "status" "ExperimentStatus" NOT NULL DEFAULT 'IDEA',
    "hypothesis" TEXT NOT NULL,
    "goal" TEXT NOT NULL,
    "setup" TEXT NOT NULL,
    "architectureNote" TEXT,
    "results" TEXT,
    "lessonsLearned" TEXT,
    "futureIterations" TEXT,

    CONSTRAINT "LabDetail_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "JourneyDetail" (
    "id" TEXT NOT NULL,
    "contentId" TEXT NOT NULL,
    "milestoneDate" TIMESTAMP(3) NOT NULL,
    "sequenceIndex" INTEGER NOT NULL,
    "stageName" TEXT NOT NULL,

    CONSTRAINT "JourneyDetail_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "RoadmapDetail" (
    "id" TEXT NOT NULL,
    "contentId" TEXT NOT NULL,

    CONSTRAINT "RoadmapDetail_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "RoadmapStage" (
    "id" TEXT NOT NULL,
    "roadmapId" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "order" INTEGER NOT NULL,
    "dependsOnId" TEXT,
    "resourceNote" TEXT,

    CONSTRAINT "RoadmapStage_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "VentureDetail" (
    "id" TEXT NOT NULL,
    "contentId" TEXT NOT NULL,
    "status" "VentureStatus" NOT NULL DEFAULT 'IDEA',
    "problem" TEXT NOT NULL,
    "vision" TEXT NOT NULL,
    "market" TEXT,
    "technicalNote" TEXT,
    "currentStatus" TEXT,
    "futurePlans" TEXT,

    CONSTRAINT "VentureDetail_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PlaybookDetail" (
    "id" TEXT NOT NULL,
    "contentId" TEXT NOT NULL,
    "overview" TEXT NOT NULL,
    "problem" TEXT NOT NULL,
    "prerequisites" TEXT,
    "architectureNote" TEXT,
    "recommendedStack" TEXT,
    "commonMistakes" TEXT,
    "tradeoffs" TEXT,

    CONSTRAINT "PlaybookDetail_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PlaybookStep" (
    "id" TEXT NOT NULL,
    "playbookId" TEXT NOT NULL,
    "order" INTEGER NOT NULL,
    "title" TEXT NOT NULL,
    "detail" TEXT NOT NULL,

    CONSTRAINT "PlaybookStep_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CaseStudyDetail" (
    "id" TEXT NOT NULL,
    "contentId" TEXT NOT NULL,
    "problem" TEXT NOT NULL,
    "constraints" TEXT,
    "researchNote" TEXT,
    "architectureNote" TEXT,
    "technicalDecisions" TEXT,
    "challenges" TEXT,
    "results" TEXT,
    "lessonsLearned" TEXT,
    "futureImprovements" TEXT,

    CONSTRAINT "CaseStudyDetail_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TalkDetail" (
    "id" TEXT NOT NULL,
    "contentId" TEXT NOT NULL,
    "talkType" "TalkType" NOT NULL,
    "event" TEXT NOT NULL,
    "eventDate" TIMESTAMP(3) NOT NULL,
    "slidesUrl" TEXT,
    "recordingUrl" TEXT,
    "resourcesNote" TEXT,

    CONSTRAINT "TalkDetail_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "DatasetDetail" (
    "id" TEXT NOT NULL,
    "contentId" TEXT NOT NULL,
    "source" TEXT NOT NULL,
    "license" TEXT NOT NULL,
    "domain" TEXT NOT NULL,
    "useCases" TEXT,
    "notes" TEXT,

    CONSTRAINT "DatasetDetail_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ToolboxDetail" (
    "id" TEXT NOT NULL,
    "contentId" TEXT NOT NULL,
    "whyIUseIt" TEXT NOT NULL,
    "alternatives" TEXT,
    "strengths" TEXT,
    "weaknesses" TEXT,
    "bestUseCases" TEXT,

    CONSTRAINT "ToolboxDetail_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Reference" (
    "id" TEXT NOT NULL,
    "citation" TEXT NOT NULL,
    "url" TEXT,
    "researchDetailId" TEXT,
    "playbookDetailId" TEXT,

    CONSTRAINT "Reference_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ReadingItem" (
    "id" TEXT NOT NULL,
    "section" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "author" TEXT,
    "url" TEXT,
    "note" TEXT,
    "status" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "ReadingItem_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "NowSnapshot" (
    "id" TEXT NOT NULL,
    "currentFocus" TEXT NOT NULL,
    "currentBuildId" TEXT,
    "currentResearchId" TEXT,
    "currentExperimentId" TEXT,
    "currentLearning" TEXT NOT NULL,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "NowSnapshot_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Bookmark" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "contentId" TEXT NOT NULL,

    CONSTRAINT "Bookmark_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "NewsletterSubscriber" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "userId" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "NewsletterSubscriber_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ContactRequest" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "category" TEXT NOT NULL,
    "message" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "handled" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "ContactRequest_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Content_slug_key" ON "Content"("slug");

-- CreateIndex
CREATE INDEX "Content_type_status_publishedAt_idx" ON "Content"("type", "status", "publishedAt");

-- CreateIndex
CREATE INDEX "ContentLink_targetId_idx" ON "ContentLink"("targetId");

-- CreateIndex
CREATE UNIQUE INDEX "ContentLink_sourceId_targetId_relation_key" ON "ContentLink"("sourceId", "targetId", "relation");

-- CreateIndex
CREATE UNIQUE INDEX "Tag_name_key" ON "Tag"("name");

-- CreateIndex
CREATE UNIQUE INDEX "ResearchDetail_contentId_key" ON "ResearchDetail"("contentId");

-- CreateIndex
CREATE UNIQUE INDEX "BrainDetail_contentId_key" ON "BrainDetail"("contentId");

-- CreateIndex
CREATE UNIQUE INDEX "ArchitectureDetail_contentId_key" ON "ArchitectureDetail"("contentId");

-- CreateIndex
CREATE UNIQUE INDEX "WritingDetail_contentId_key" ON "WritingDetail"("contentId");

-- CreateIndex
CREATE UNIQUE INDEX "ProjectDetail_contentId_key" ON "ProjectDetail"("contentId");

-- CreateIndex
CREATE UNIQUE INDEX "LabDetail_contentId_key" ON "LabDetail"("contentId");

-- CreateIndex
CREATE UNIQUE INDEX "JourneyDetail_contentId_key" ON "JourneyDetail"("contentId");

-- CreateIndex
CREATE UNIQUE INDEX "RoadmapDetail_contentId_key" ON "RoadmapDetail"("contentId");

-- CreateIndex
CREATE UNIQUE INDEX "VentureDetail_contentId_key" ON "VentureDetail"("contentId");

-- CreateIndex
CREATE UNIQUE INDEX "PlaybookDetail_contentId_key" ON "PlaybookDetail"("contentId");

-- CreateIndex
CREATE UNIQUE INDEX "CaseStudyDetail_contentId_key" ON "CaseStudyDetail"("contentId");

-- CreateIndex
CREATE UNIQUE INDEX "TalkDetail_contentId_key" ON "TalkDetail"("contentId");

-- CreateIndex
CREATE UNIQUE INDEX "DatasetDetail_contentId_key" ON "DatasetDetail"("contentId");

-- CreateIndex
CREATE UNIQUE INDEX "ToolboxDetail_contentId_key" ON "ToolboxDetail"("contentId");

-- CreateIndex
CREATE UNIQUE INDEX "Bookmark_userId_contentId_key" ON "Bookmark"("userId", "contentId");

-- CreateIndex
CREATE UNIQUE INDEX "NewsletterSubscriber_email_key" ON "NewsletterSubscriber"("email");

-- CreateIndex
CREATE UNIQUE INDEX "NewsletterSubscriber_userId_key" ON "NewsletterSubscriber"("userId");

-- AddForeignKey
ALTER TABLE "ContentLink" ADD CONSTRAINT "ContentLink_sourceId_fkey" FOREIGN KEY ("sourceId") REFERENCES "Content"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ContentLink" ADD CONSTRAINT "ContentLink_targetId_fkey" FOREIGN KEY ("targetId") REFERENCES "Content"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TagOnContent" ADD CONSTRAINT "TagOnContent_tagId_fkey" FOREIGN KEY ("tagId") REFERENCES "Tag"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TagOnContent" ADD CONSTRAINT "TagOnContent_contentId_fkey" FOREIGN KEY ("contentId") REFERENCES "Content"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ResearchDetail" ADD CONSTRAINT "ResearchDetail_contentId_fkey" FOREIGN KEY ("contentId") REFERENCES "Content"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BrainDetail" ADD CONSTRAINT "BrainDetail_contentId_fkey" FOREIGN KEY ("contentId") REFERENCES "Content"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ArchitectureDetail" ADD CONSTRAINT "ArchitectureDetail_contentId_fkey" FOREIGN KEY ("contentId") REFERENCES "Content"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "WritingDetail" ADD CONSTRAINT "WritingDetail_contentId_fkey" FOREIGN KEY ("contentId") REFERENCES "Content"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProjectDetail" ADD CONSTRAINT "ProjectDetail_contentId_fkey" FOREIGN KEY ("contentId") REFERENCES "Content"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Screenshot" ADD CONSTRAINT "Screenshot_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "ProjectDetail"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "LabDetail" ADD CONSTRAINT "LabDetail_contentId_fkey" FOREIGN KEY ("contentId") REFERENCES "Content"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "JourneyDetail" ADD CONSTRAINT "JourneyDetail_contentId_fkey" FOREIGN KEY ("contentId") REFERENCES "Content"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RoadmapDetail" ADD CONSTRAINT "RoadmapDetail_contentId_fkey" FOREIGN KEY ("contentId") REFERENCES "Content"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RoadmapStage" ADD CONSTRAINT "RoadmapStage_roadmapId_fkey" FOREIGN KEY ("roadmapId") REFERENCES "RoadmapDetail"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RoadmapStage" ADD CONSTRAINT "RoadmapStage_dependsOnId_fkey" FOREIGN KEY ("dependsOnId") REFERENCES "RoadmapStage"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "VentureDetail" ADD CONSTRAINT "VentureDetail_contentId_fkey" FOREIGN KEY ("contentId") REFERENCES "Content"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PlaybookDetail" ADD CONSTRAINT "PlaybookDetail_contentId_fkey" FOREIGN KEY ("contentId") REFERENCES "Content"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PlaybookStep" ADD CONSTRAINT "PlaybookStep_playbookId_fkey" FOREIGN KEY ("playbookId") REFERENCES "PlaybookDetail"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CaseStudyDetail" ADD CONSTRAINT "CaseStudyDetail_contentId_fkey" FOREIGN KEY ("contentId") REFERENCES "Content"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TalkDetail" ADD CONSTRAINT "TalkDetail_contentId_fkey" FOREIGN KEY ("contentId") REFERENCES "Content"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DatasetDetail" ADD CONSTRAINT "DatasetDetail_contentId_fkey" FOREIGN KEY ("contentId") REFERENCES "Content"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ToolboxDetail" ADD CONSTRAINT "ToolboxDetail_contentId_fkey" FOREIGN KEY ("contentId") REFERENCES "Content"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Reference" ADD CONSTRAINT "Reference_researchDetailId_fkey" FOREIGN KEY ("researchDetailId") REFERENCES "ResearchDetail"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Reference" ADD CONSTRAINT "Reference_playbookDetailId_fkey" FOREIGN KEY ("playbookDetailId") REFERENCES "PlaybookDetail"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "NowSnapshot" ADD CONSTRAINT "NowSnapshot_currentBuildId_fkey" FOREIGN KEY ("currentBuildId") REFERENCES "Content"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "NowSnapshot" ADD CONSTRAINT "NowSnapshot_currentResearchId_fkey" FOREIGN KEY ("currentResearchId") REFERENCES "Content"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "NowSnapshot" ADD CONSTRAINT "NowSnapshot_currentExperimentId_fkey" FOREIGN KEY ("currentExperimentId") REFERENCES "Content"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Bookmark" ADD CONSTRAINT "Bookmark_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Bookmark" ADD CONSTRAINT "Bookmark_contentId_fkey" FOREIGN KEY ("contentId") REFERENCES "Content"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "NewsletterSubscriber" ADD CONSTRAINT "NewsletterSubscriber_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
