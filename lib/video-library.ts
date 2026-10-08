export type VideoStatus = "watching" | "watched" | "later";

export type LearningVideo = {
  id: string;
  title: string;
  creator: string;
  topic: string;
  context: string;
  statuses: VideoStatus[];
  resumeSeconds?: number;
  related: { label: string; href: string }[];
};

// Keep one entry per YouTube ID. A rewatch may be both watched and watching.
// Add future selections with statuses: ["later"].
export const learningVideos: LearningVideo[] = [
  {
    id: "7xTGNNLPyMI",
    title: "Deep Dive into LLMs like ChatGPT",
    creator: "Andrej Karpathy",
    topic: "LLM Foundations",
    context:
      "Foundational context for working with language models and exploring retrieval-augmented applications.",
    statuses: ["watching"],
    resumeSeconds: 1701,
    related: [
      { label: "RAG systems", href: "/ai-systems/rag" },
      { label: "Insight Stream PDF", href: "/projects/rag-app-pdf" },
    ],
  },
  {
    id: "kwSVtQ7dziU",
    title:
      "Skill Issue: Andrej Karpathy on Code Agents, AutoResearch, and the Loopy Era of AI",
    creator: "No Priors: AI, Machine Learning, Tech, & Startups",
    topic: "AI Agents & Research",
    context:
      "A conversation on code agents and automated research, alongside my exploration of agent systems and AI projects.",
    statuses: ["watching", "watched"],
    related: [
      { label: "Agent systems", href: "/ai-systems/agents" },
      { label: "Projects", href: "/projects" },
    ],
  },
  {
    id: "mKSzrYyixW8",
    title:
      "Will AI Wipe Out Humanity? Pakistan's Top Computer Scientist Explains | Dr. Jawaid Abdul Ghani",
    creator: "Raftar Now",
    topic: "AI Risk & Responsibility",
    context:
      "A perspective on AI's potential risks, connected here to the broader questions of evaluation and responsible system design.",
    statuses: ["watched"],
    related: [
      { label: "Evaluation & safety", href: "/ai-systems/evaluation-safety" },
      { label: "Research", href: "/research" },
    ],
  },
];
