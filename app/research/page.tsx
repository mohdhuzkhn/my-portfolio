import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { getPublishedByType } from "@/lib/content";

export const metadata = {
  title: "Research",
  description:
    "A curated library of foundational AI papers, plus original research notes and work in progress.",
};

const foundationalPapers = [
  {
    title: "Attention Is All You Need",
    authors: "Vaswani et al.",
    year: "2017",
    area: "Transformers",
    href: "https://arxiv.org/abs/1706.03762",
    note: "Introduced the Transformer: an attention-only architecture that became the foundation of modern language models.",
  },
  {
    title: "BERT: Pre-training of Deep Bidirectional Transformers",
    authors: "Devlin et al.",
    year: "2018",
    area: "Pre-training",
    href: "https://arxiv.org/abs/1810.04805",
    note: "Established deep bidirectional pre-training and a simple fine-tuning recipe for language understanding tasks.",
  },
  {
    title: "Language Models are Few-Shot Learners",
    authors: "Brown et al.",
    year: "2020",
    area: "Scaling",
    href: "https://arxiv.org/abs/2005.14165",
    note: "Showed how scale enables strong zero- and few-shot performance without task-specific gradient updates.",
  },
  {
    title: "Retrieval-Augmented Generation for Knowledge-Intensive NLP Tasks",
    authors: "Lewis et al.",
    year: "2020",
    area: "RAG",
    href: "https://arxiv.org/abs/2005.11401",
    note: "Combined parametric language models with retrievable external memory—the core pattern behind modern RAG systems.",
  },
  {
    title: "LoRA: Low-Rank Adaptation of Large Language Models",
    authors: "Hu et al.",
    year: "2021",
    area: "Fine-tuning",
    href: "https://arxiv.org/abs/2106.09685",
    note: "Made model adaptation dramatically cheaper by training small low-rank matrices while freezing base-model weights.",
  },
  {
    title:
      "Chain-of-Thought Prompting Elicits Reasoning in Large Language Models",
    authors: "Wei et al.",
    year: "2022",
    area: "Reasoning",
    href: "https://arxiv.org/abs/2201.11903",
    note: "Demonstrated that intermediate reasoning examples can unlock stronger arithmetic, symbolic, and commonsense reasoning.",
  },
  {
    title: "ReAct: Synergizing Reasoning and Acting in Language Models",
    authors: "Yao et al.",
    year: "2022",
    area: "Agents",
    href: "https://arxiv.org/abs/2210.03629",
    note: "Introduced an agent pattern that interleaves reasoning traces with actions against tools and external environments.",
  },
  {
    title: "QLoRA: Efficient Finetuning of Quantized LLMs",
    authors: "Dettmers et al.",
    year: "2023",
    area: "Fine-tuning",
    href: "https://arxiv.org/abs/2305.14314",
    note: "Combined 4-bit quantization with LoRA to make high-quality fine-tuning practical on far less hardware.",
  },
] as const;

const layerLabels: Record<string, string> = {
  PAPER: "Papers",
  NOTE: "Notes",
  IDEA: "Ideas",
};

export default function ResearchIndexPage() {
  const papers = getPublishedByType("RESEARCH");
  const byLayer: Record<string, typeof papers> = {
    PAPER: [],
    NOTE: [],
    IDEA: [],
  };
  for (const paper of papers) byLayer[paper.layer]?.push(paper);

  return (
    <div className="mx-auto max-w-6xl px-6 py-16 sm:py-20">
      <div className="mb-2 font-mono text-xs uppercase tracking-wide text-accent">
        Research library
      </div>
      <h1 className="max-w-3xl font-display text-4xl font-semibold tracking-tight sm:text-5xl">
        Papers that shaped modern AI engineering.
      </h1>
      <p className="mt-5 max-w-2xl text-lg leading-8 text-foreground-dim">
        A growing reading list of foundational work behind transformers,
        language models, retrieval, fine-tuning, reasoning, and agents—kept here
        as part of my public second brain.
      </p>

      <section className="mt-14" aria-labelledby="foundational-papers">
        <div className="flex items-end justify-between gap-6 border-b border-line pb-4">
          <div>
            <div className="font-mono text-xs uppercase tracking-wide text-foreground-faint">
              Curated reading
            </div>
            <h2
              id="foundational-papers"
              className="mt-1 font-display text-2xl font-semibold"
            >
              Foundational papers
            </h2>
          </div>
          <span className="hidden font-mono text-xs text-foreground-faint sm:block">
            {foundationalPapers.length} papers
          </span>
        </div>

        <div className="grid gap-px overflow-hidden rounded-b-[var(--radius-m)] border-x border-b border-line bg-line md:grid-cols-2">
          {foundationalPapers.map((paper, index) => (
            <a
              key={paper.href}
              href={paper.href}
              target="_blank"
              rel="noreferrer"
              className="group flex min-h-64 flex-col bg-background p-6 transition-colors hover:bg-surface sm:p-7"
            >
              <div className="flex items-start justify-between gap-4">
                <span className="font-mono text-xs text-foreground-faint">
                  {String(index + 1).padStart(2, "0")} / {paper.area}
                </span>
                <ArrowUpRight
                  aria-hidden="true"
                  className="shrink-0 text-foreground-faint transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-accent"
                  size={18}
                />
              </div>
              <h3 className="mt-6 font-display text-xl font-semibold leading-snug group-hover:text-accent">
                {paper.title}
              </h3>
              <p className="mt-2 font-mono text-xs text-foreground-faint">
                {paper.authors} · {paper.year}
              </p>
              <p className="mt-5 text-sm leading-6 text-foreground-dim">
                {paper.note}
              </p>
              <span className="mt-auto pt-6 text-sm font-medium text-foreground group-hover:text-accent">
                Read on arXiv
              </span>
            </a>
          ))}
        </div>
      </section>

      <section className="mt-20" aria-labelledby="original-research">
        <div className="border-b border-line pb-4">
          <div className="font-mono text-xs uppercase tracking-wide text-foreground-faint">
            From the lab
          </div>
          <h2
            id="original-research"
            className="mt-1 font-display text-2xl font-semibold"
          >
            Original research &amp; working notes
          </h2>
          <p className="mt-2 max-w-2xl text-sm leading-6 text-foreground-dim">
            Ideas, experiments, and finished work—published with the process and
            limitations visible.
          </p>
        </div>

        {(["PAPER", "NOTE", "IDEA"] as const).map((layer) => (
          <div
            key={layer}
            className="grid gap-4 border-b border-line py-8 sm:grid-cols-[150px_1fr]"
          >
            <h3 className="font-mono text-xs uppercase tracking-wide text-foreground-faint">
              {layerLabels[layer]}
            </h3>
            {byLayer[layer].length === 0 ? (
              <p className="text-sm text-foreground-faint">
                Nothing published in this layer yet.
              </p>
            ) : (
              <div className="space-y-7">
                {byLayer[layer].map((doc) => (
                  <Link key={doc.slug} href={doc.url} className="block group">
                    <div className="mb-1 flex items-center gap-2 font-mono text-xs text-foreground-faint">
                      <span>{doc.category}</span>
                      <span>·</span>
                      <span>{doc.readingTime} min read</span>
                    </div>
                    <h4 className="text-lg font-medium group-hover:text-accent">
                      {doc.title}
                    </h4>
                    <p className="mt-1 max-w-2xl text-sm leading-6 text-foreground-dim">
                      {doc.summary}
                    </p>
                  </Link>
                ))}
              </div>
            )}
          </div>
        ))}
      </section>
    </div>
  );
}
