import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRight,
  ArrowUpRight,
  Bot,
  BrainCircuit,
  CheckCircle2,
  Database,
  GitBranch,
  ShieldCheck,
} from "lucide-react";

export const metadata: Metadata = {
  title: "AI Systems",
  description:
    "Production-oriented reference stacks for RAG, AI agents, model adaptation, evaluation, and safety.",
};

type SystemDomain = {
  id: string;
  index: string;
  title: string;
  summary: string;
  icon: typeof Database;
  accent: string;
  panel: string;
  bar: string;
  pipeline: string[];
  layers: { label: string; tools: string[] }[];
  concerns: string[];
};

const domains: SystemDomain[] = [
  {
    id: "rag",
    index: "01",
    title: "Retrieval-Augmented Generation",
    summary:
      "Ground model responses in private knowledge with a measurable retrieval and generation pipeline.",
    icon: Database,
    accent: "text-sky-500",
    panel: "border-sky-500/20 bg-sky-500/[0.035]",
    bar: "bg-sky-500",
    pipeline: ["Ingest", "Chunk", "Embed", "Retrieve", "Rerank", "Generate"],
    layers: [
      { label: "Application", tools: ["Next.js", "FastAPI", "Pydantic"] },
      { label: "Retrieval", tools: ["Qdrant", "BGE-M3", "BGE Reranker v2"] },
      { label: "Models", tools: ["OpenAI", "Claude", "Gemini"] },
      { label: "Platform", tools: ["PostgreSQL", "Redis", "LangSmith"] },
    ],
    concerns: [
      "Hybrid search",
      "Source citations",
      "Context precision",
      "Latency and cost",
    ],
  },
  {
    id: "agents",
    index: "02",
    title: "Agent Systems",
    summary:
      "Build controlled, stateful systems that plan, use tools, recover from failure, and involve humans when needed.",
    icon: Bot,
    accent: "text-violet-500",
    panel: "border-violet-500/20 bg-violet-500/[0.035]",
    bar: "bg-violet-500",
    pipeline: ["Goal", "Plan", "Select tool", "Act", "Observe", "Evaluate"],
    layers: [
      {
        label: "Orchestration",
        tools: ["LangGraph", "State machines", "Structured outputs"],
      },
      {
        label: "Intelligence",
        tools: ["Reasoning model", "Context", "Knowledge"],
      },
      { label: "State", tools: ["PostgreSQL", "Redis", "Checkpointing"] },
      { label: "Control", tools: ["Permissions", "Human approval", "Tracing"] },
    ],
    concerns: [
      "Tool reliability",
      "State recovery",
      "Least privilege",
      "Task success rate",
    ],
  },
  {
    id: "model-adaptation",
    index: "03",
    title: "Model Adaptation",
    summary:
      "Adapt foundation models to a domain through careful data design, parameter-efficient training, and repeatable evaluation.",
    icon: BrainCircuit,
    accent: "text-amber-500",
    panel: "border-amber-500/20 bg-amber-500/[0.035]",
    bar: "bg-amber-500",
    pipeline: [
      "Curate",
      "Prepare",
      "Fine-tune",
      "Evaluate",
      "Compress",
      "Deploy",
    ],
    layers: [
      { label: "Data", tools: ["Dataset curation", "Labeling", "Versioning"] },
      { label: "Training", tools: ["PyTorch", "Transformers", "PEFT / LoRA"] },
      {
        label: "Tracking",
        tools: ["MLflow", "Weights & Biases", "Model registry"],
      },
      { label: "Serving", tools: ["vLLM", "Quantization", "FastAPI"] },
    ],
    concerns: [
      "Data quality",
      "Baseline comparison",
      "Drift",
      "Security and robustness",
    ],
  },
  {
    id: "evaluation-safety",
    index: "04",
    title: "Evaluation & Safety",
    summary:
      "Measure quality continuously and place explicit controls around inputs, outputs, data, tools, and operations.",
    icon: ShieldCheck,
    accent: "text-emerald-500",
    panel: "border-emerald-500/20 bg-emerald-500/[0.035]",
    bar: "bg-emerald-500",
    pipeline: ["Test set", "Run", "Score", "Trace", "Review", "Release"],
    layers: [
      { label: "Quality", tools: ["Ragas", "DeepEval", "Promptfoo"] },
      { label: "Observability", tools: ["LangSmith", "Phoenix", "MLflow"] },
      {
        label: "Guardrails",
        tools: ["Presidio", "Guardrails AI", "Moderation"],
      },
      {
        label: "Governance",
        tools: ["Allow lists", "Human review", "Audit logs"],
      },
    ],
    concerns: [
      "Faithfulness",
      "Task success",
      "PII protection",
      "Business value",
    ],
  },
];

export default function AISystemsPage() {
  return (
    <div className="mx-auto max-w-[1600px] px-6 py-16 lg:px-10 sm:py-20">
      <section className="border-b border-line pb-14">
        <div className="mb-5 flex items-center gap-2 font-mono text-xs uppercase tracking-[0.18em] text-accent">
          <GitBranch size={14} aria-hidden="true" />
          AI engineering field guide
        </div>
        <div className="grid gap-8 lg:grid-cols-[1.35fr_0.65fr] lg:items-end">
          <div>
            <h1 className="max-w-3xl font-display text-4xl font-semibold leading-[1.08] sm:text-6xl">
              Systems behind reliable AI products.
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-foreground-dim">
              A practical map of the components, tools, and engineering
              decisions behind production RAG, agents, model adaptation, and AI
              assurance.
            </p>
          </div>
          <div className="grid grid-cols-2 gap-px overflow-hidden rounded-[var(--radius-m)] border border-line bg-line">
            <div className="bg-background p-4">
              <div className="font-display text-2xl font-semibold">4</div>
              <div className="mt-1 text-xs text-foreground-faint">
                core domains
              </div>
            </div>
            <div className="bg-background p-4">
              <div className="font-display text-2xl font-semibold">24</div>
              <div className="mt-1 text-xs text-foreground-faint">
                system stages
              </div>
            </div>
          </div>
        </div>
        <nav
          aria-label="AI system domains"
          className="mt-10 flex flex-wrap gap-2"
        >
          {domains.map((domain) => (
            <a
              key={domain.id}
              href={`#${domain.id}`}
              className="rounded-full border border-line px-4 py-2 font-mono text-xs text-foreground-dim transition-colors hover:border-accent hover:text-accent"
            >
              {domain.index} / {domain.title}
            </a>
          ))}
        </nav>
      </section>

      <div className="space-y-8 pt-8">
        {domains.map((domain) => {
          const Icon = domain.icon;
          return (
            <section key={domain.id} id={domain.id} className="scroll-mt-24">
              <div className="relative overflow-hidden rounded-[var(--radius-m)] border border-line bg-background shadow-[0_18px_60px_rgba(0,0,0,0.08)]">
                <div className={`h-1 w-full ${domain.bar}`} />
                <div className="grid lg:grid-cols-[minmax(380px,1fr)_minmax(0,2fr)]">
                  <div
                    className={`border-b p-7 sm:p-9 lg:min-h-[610px] lg:border-b-0 lg:border-r ${domain.panel}`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <span className="rounded-full border border-line bg-background/70 px-2.5 py-1 font-mono text-[11px] text-foreground-faint">
                          SYSTEM {domain.index}
                        </span>
                        <Icon
                          className={domain.accent}
                          size={22}
                          aria-hidden="true"
                        />
                      </div>
                      <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-foreground-faint">
                        Production map
                      </span>
                    </div>
                    <h2 className="mt-8 max-w-md font-display text-3xl font-semibold leading-tight sm:text-4xl">
                      {domain.title}
                    </h2>
                    <p className="mt-5 max-w-md text-base leading-7 text-foreground-dim">
                      {domain.summary}
                    </p>
                    <Link
                      href={`/ai-systems/${domain.id}`}
                      className="mt-7 inline-flex items-center gap-2 rounded-[var(--radius-s)] border border-foreground/15 bg-background px-4 py-2.5 text-sm font-medium shadow-sm transition-all hover:-translate-y-0.5 hover:border-accent hover:text-accent"
                    >
                      Explore full stack
                      <ArrowUpRight size={15} aria-hidden="true" />
                    </Link>
                    <div className="mt-10 border-t border-foreground/10 pt-7">
                      <div className="mb-3 font-mono text-[11px] uppercase tracking-[0.16em] text-foreground-faint">
                        Engineering focus
                      </div>
                      <ul className="grid gap-3 text-sm text-foreground-dim sm:grid-cols-2">
                        {domain.concerns.map((concern) => (
                          <li key={concern} className="flex items-center gap-2">
                            <CheckCircle2
                              size={14}
                              className="text-live"
                              aria-hidden="true"
                            />
                            {concern}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  <div className="p-6 sm:p-9">
                    <div className="rounded-[var(--radius-m)] border border-line bg-surface p-5">
                      <div className="mb-4 font-mono text-[11px] uppercase tracking-[0.16em] text-foreground-faint">
                        Reference flow
                      </div>
                      <div className="overflow-x-auto pb-2">
                        <ol className="flex min-w-max items-center">
                          {domain.pipeline.map((step, index) => (
                            <li key={step} className="flex items-center">
                              <div className="min-w-[118px] rounded-[var(--radius-s)] border border-line bg-background px-3 py-2.5 text-center font-mono text-xs text-foreground">
                                {step}
                              </div>
                              {index < domain.pipeline.length - 1 && (
                                <ArrowRight
                                  size={15}
                                  className="mx-2 shrink-0 text-foreground-faint"
                                  aria-hidden="true"
                                />
                              )}
                            </li>
                          ))}
                        </ol>
                      </div>
                    </div>

                    <div className="mt-4 grid gap-px overflow-hidden rounded-[var(--radius-m)] border border-line bg-line sm:grid-cols-2">
                      {domain.layers.map((layer) => (
                        <div
                          key={layer.label}
                          className="group bg-background p-6 transition-colors hover:bg-surface"
                        >
                          <h3 className="font-mono text-[11px] uppercase tracking-[0.16em] text-foreground-faint">
                            {layer.label}
                          </h3>
                          <div className="mt-3 flex flex-wrap gap-2">
                            {layer.tools.map((tool) => (
                              <span
                                key={tool}
                                className="rounded bg-surface px-2.5 py-1.5 text-xs text-foreground-dim"
                              >
                                {tool}
                              </span>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </section>
          );
        })}
      </div>

      <section className="mt-8 rounded-[var(--radius-m)] border border-line bg-surface p-6 sm:flex sm:items-center sm:justify-between sm:p-8">
        <div>
          <div className="font-mono text-xs uppercase tracking-[0.16em] text-foreground-faint">
            Operating principle
          </div>
          <p className="mt-3 max-w-2xl font-display text-xl font-medium leading-8">
            A stack is only useful when its quality, cost, latency, and failure
            modes are visible.
          </p>
        </div>
        <ShieldCheck
          className="mt-6 text-live sm:mt-0"
          size={34}
          aria-hidden="true"
        />
      </section>
    </div>
  );
}
