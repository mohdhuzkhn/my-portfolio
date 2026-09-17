import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  Cloud,
  Code2,
  Database,
  Gauge,
  Layers3,
  LockKeyhole,
  Rocket,
} from "lucide-react";

type DetailSection = {
  title: string;
  description: string;
  items: { name: string; role: string }[];
};

type DomainDetail = {
  index: string;
  title: string;
  shortTitle: string;
  description: string;
  flow: string[];
  stack: DetailSection[];
  deployment: string[];
  productionChecks: string[];
};

const domainDetails: Record<string, DomainDetail> = {
  rag: {
    index: "01",
    title: "Retrieval-Augmented Generation",
    shortTitle: "RAG",
    description:
      "A production reference for grounding model responses in private, changing, or domain-specific knowledge.",
    flow: [
      "Source",
      "Parse",
      "Chunk",
      "Embed",
      "Index",
      "Retrieve",
      "Rerank",
      "Generate",
    ],
    stack: [
      {
        title: "Application & API",
        description: "The user-facing and service boundary of the system.",
        items: [
          {
            name: "Next.js",
            role: "Web application, streaming UI, authentication",
          },
          {
            name: "FastAPI",
            role: "Typed async APIs and orchestration endpoints",
          },
          {
            name: "Pydantic",
            role: "Request, response, and configuration schemas",
          },
        ],
      },
      {
        title: "Retrieval layer",
        description: "Transforms source material into ranked evidence.",
        items: [
          {
            name: "Unstructured / custom parsers",
            role: "PDF, DOCX, HTML, table, and image extraction",
          },
          {
            name: "BGE-M3 or OpenAI embeddings",
            role: "Dense semantic representations",
          },
          {
            name: "Qdrant",
            role: "Vector storage, metadata filters, hybrid retrieval",
          },
          {
            name: "BGE Reranker v2",
            role: "Cross-encoder relevance reranking",
          },
        ],
      },
      {
        title: "Models & orchestration",
        description: "Builds grounded context and produces the final response.",
        items: [
          {
            name: "LangGraph",
            role: "Explicit retrieval and generation workflow",
          },
          {
            name: "OpenAI / Claude / Gemini",
            role: "Generation and structured synthesis",
          },
          {
            name: "Prompt templates",
            role: "Grounding, citations, and abstention policy",
          },
        ],
      },
      {
        title: "Platform & operations",
        description: "Durability, performance, and production visibility.",
        items: [
          {
            name: "PostgreSQL",
            role: "Document registry, users, permissions, metadata",
          },
          {
            name: "Redis",
            role: "Response cache, jobs, rate limits, session state",
          },
          {
            name: "LangSmith / Phoenix",
            role: "Traces, latency, tokens, retrieval diagnostics",
          },
          {
            name: "Ragas / DeepEval",
            role: "Faithfulness, relevance, precision, and recall",
          },
        ],
      },
    ],
    deployment: [
      "Containerize API and workers",
      "Run ingestion asynchronously",
      "Separate online retrieval from offline indexing",
      "Autoscale generation workers",
      "Back up source registry and vector snapshots",
    ],
    productionChecks: [
      "Every answer preserves source references",
      "Retrieval is evaluated separately from generation",
      "Tenant and document permissions filter before retrieval",
      "Latency, token cost, and cache hit rate are traced",
      "The system abstains when evidence is insufficient",
    ],
  },
  agents: {
    index: "02",
    title: "Agent Systems",
    shortTitle: "Agents",
    description:
      "A controlled architecture for agents that plan, use tools, persist state, recover from failures, and request human judgment.",
    flow: [
      "Goal",
      "Context",
      "Plan",
      "Select tool",
      "Act",
      "Observe",
      "Evaluate",
      "Finish",
    ],
    stack: [
      {
        title: "Agent runtime",
        description: "Defines the execution graph and decision loop.",
        items: [
          {
            name: "LangGraph",
            role: "Stateful graphs, checkpoints, interrupts, recovery",
          },
          {
            name: "Reasoning model",
            role: "Planning, decisions, and structured outputs",
          },
          {
            name: "FastAPI",
            role: "Runs, events, callbacks, and control endpoints",
          },
        ],
      },
      {
        title: "Tools & knowledge",
        description: "Capabilities and evidence available to the agent.",
        items: [
          {
            name: "Typed tool contracts",
            role: "Validated inputs, outputs, and errors",
          },
          {
            name: "RAG services",
            role: "Grounded domain knowledge and citations",
          },
          {
            name: "MCP / provider APIs",
            role: "External systems and business actions",
          },
        ],
      },
      {
        title: "State & memory",
        description: "Separates current workflow state from long-term memory.",
        items: [
          {
            name: "PostgreSQL",
            role: "Run history, durable state, audit records",
          },
          {
            name: "Redis",
            role: "Short-lived state, queues, locks, rate limits",
          },
          {
            name: "Vector memory",
            role: "Selective long-term semantic recall",
          },
        ],
      },
      {
        title: "Control & observability",
        description: "Makes autonomous execution bounded and explainable.",
        items: [
          {
            name: "Allow-listed tools",
            role: "Least-privilege capability control",
          },
          {
            name: "Human-in-the-loop",
            role: "Approval for costly or irreversible actions",
          },
          {
            name: "LangSmith / OpenTelemetry",
            role: "Step traces, tool errors, cost, latency",
          },
          {
            name: "Agent evals",
            role: "Task success, tool success, and recovery rate",
          },
        ],
      },
    ],
    deployment: [
      "Package the graph as a versioned service",
      "Use durable queues for long-running work",
      "Make every tool call idempotent",
      "Checkpoint before external side effects",
      "Scale workers independently from the API",
    ],
    productionChecks: [
      "Tools expose narrow, typed permissions",
      "Critical actions require explicit approval",
      "Runs resume safely after process failure",
      "Iteration and cost limits prevent runaway loops",
      "End-to-end task success is evaluated continuously",
    ],
  },
  "model-adaptation": {
    index: "03",
    title: "Model Adaptation",
    shortTitle: "Fine-tuning",
    description:
      "A repeatable path from domain data to a measured, versioned, and efficiently served adapted model.",
    flow: [
      "Collect",
      "Clean",
      "Label",
      "Split",
      "Fine-tune",
      "Evaluate",
      "Compress",
      "Serve",
    ],
    stack: [
      {
        title: "Data foundation",
        description: "Creates trustworthy and reproducible training material.",
        items: [
          {
            name: "Parquet / object storage",
            role: "Versioned training and evaluation datasets",
          },
          {
            name: "Label Studio",
            role: "Human annotation and review workflows",
          },
          { name: "DVC / lakeFS", role: "Dataset lineage and reproducibility" },
        ],
      },
      {
        title: "Training",
        description: "Adapts model behavior without unnecessary compute.",
        items: [
          { name: "PyTorch", role: "Core training runtime" },
          {
            name: "Hugging Face Transformers",
            role: "Models, tokenizers, and trainers",
          },
          {
            name: "PEFT / LoRA / QLoRA",
            role: "Parameter-efficient adaptation",
          },
          {
            name: "Accelerate / DeepSpeed",
            role: "Distributed and memory-efficient training",
          },
        ],
      },
      {
        title: "Experiment management",
        description: "Compares every run against a reproducible baseline.",
        items: [
          {
            name: "Weights & Biases / MLflow",
            role: "Metrics, artifacts, and run comparison",
          },
          {
            name: "Model registry",
            role: "Versioning, promotion, and rollback",
          },
          {
            name: "Evaluation suites",
            role: "Quality, safety, robustness, and regression tests",
          },
        ],
      },
      {
        title: "Inference platform",
        description:
          "Serves the selected model at a predictable cost and latency.",
        items: [
          { name: "vLLM / TGI", role: "High-throughput model serving" },
          { name: "AWQ / GPTQ", role: "Quantization for lower memory use" },
          { name: "FastAPI", role: "Inference gateway and business API" },
          {
            name: "Kubernetes / GPU cloud",
            role: "Scheduling, scaling, and rollout",
          },
        ],
      },
    ],
    deployment: [
      "Freeze a baseline before training",
      "Train and evaluate in isolated jobs",
      "Register model, adapter, tokenizer, and dataset together",
      "Use canary releases against production traffic",
      "Retain instant rollback to the previous model",
    ],
    productionChecks: [
      "Training and test data have no leakage",
      "Adaptation beats prompting and RAG baselines",
      "Safety and domain regressions block promotion",
      "Serving cost and p95 latency meet targets",
      "Production drift triggers re-evaluation before retraining",
    ],
  },
  "evaluation-safety": {
    index: "04",
    title: "Evaluation & Safety",
    shortTitle: "AI assurance",
    description:
      "A continuous assurance layer that measures system quality and constrains unsafe, non-compliant, or expensive behavior.",
    flow: [
      "Define",
      "Dataset",
      "Run",
      "Score",
      "Trace",
      "Review",
      "Gate",
      "Monitor",
    ],
    stack: [
      {
        title: "Evaluation design",
        description:
          "Connects technical quality to the intended business outcome.",
        items: [
          {
            name: "Golden datasets",
            role: "Curated expected behavior and edge cases",
          },
          { name: "Ragas / DeepEval", role: "RAG and LLM application metrics" },
          {
            name: "Promptfoo",
            role: "Prompt, model, and red-team comparisons",
          },
          { name: "Human review", role: "Nuanced quality and domain judgment" },
        ],
      },
      {
        title: "Observability",
        description:
          "Explains system behavior across models, retrieval, and tools.",
        items: [
          {
            name: "LangSmith / Phoenix",
            role: "LLM traces, datasets, and experiments",
          },
          {
            name: "OpenTelemetry",
            role: "Distributed service traces and metrics",
          },
          { name: "MLflow", role: "Model and experiment lineage" },
        ],
      },
      {
        title: "Guardrails",
        description: "Applies controls before and after model execution.",
        items: [
          { name: "Presidio", role: "PII detection and redaction" },
          {
            name: "Guardrails AI / schemas",
            role: "Validated structured outputs",
          },
          {
            name: "Moderation models",
            role: "Content and policy classification",
          },
          {
            name: "Prompt-injection defenses",
            role: "Untrusted-content isolation and detection",
          },
        ],
      },
      {
        title: "Governance & operations",
        description: "Turns assurance into release and runtime controls.",
        items: [
          {
            name: "Policy engine",
            role: "Business rules and permission checks",
          },
          { name: "Audit log", role: "Immutable decisions and action history" },
          {
            name: "Release gates",
            role: "Quality and safety thresholds in CI/CD",
          },
          {
            name: "Cost controls",
            role: "Budgets, rate limits, and circuit breakers",
          },
        ],
      },
    ],
    deployment: [
      "Run deterministic tests on every change",
      "Schedule full evaluation suites against candidate releases",
      "Gate deployment on agreed thresholds",
      "Shadow high-risk changes before canary release",
      "Monitor production samples and feed failures back into datasets",
    ],
    productionChecks: [
      "Metrics cover correctness, safety, performance, and value",
      "Evaluation datasets represent real traffic and edge cases",
      "Input, output, privacy, tool, and operational guardrails are layered",
      "High-risk decisions have accountable human review",
      "Every incident becomes a permanent regression test",
    ],
  },
};

export function generateStaticParams() {
  return Object.keys(domainDetails).map((domain) => ({ domain }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ domain: string }>;
}): Promise<Metadata> {
  const { domain } = await params;
  const detail = domainDetails[domain];
  return detail
    ? { title: `${detail.shortTitle} Stack`, description: detail.description }
    : {};
}

export default async function DomainDetailPage({
  params,
}: {
  params: Promise<{ domain: string }>;
}) {
  const { domain } = await params;
  const detail = domainDetails[domain];
  if (!detail) notFound();

  return (
    <div className="mx-auto max-w-6xl px-6 py-16 sm:py-20">
      <Link
        href={`/ai-systems#${domain}`}
        className="inline-flex items-center gap-2 text-sm text-foreground-dim transition-colors hover:text-accent"
      >
        <ArrowLeft size={16} aria-hidden="true" /> Back to AI Systems
      </Link>

      <header className="mt-10 border-b border-line pb-12">
        <div className="font-mono text-xs uppercase tracking-[0.18em] text-accent">
          {detail.index} / Production reference
        </div>
        <h1 className="mt-4 max-w-4xl font-display text-4xl font-semibold leading-tight sm:text-6xl">
          {detail.title}
        </h1>
        <p className="mt-6 max-w-3xl text-lg leading-8 text-foreground-dim">
          {detail.description}
        </p>
      </header>

      <section className="py-12">
        <SectionHeading
          icon={Layers3}
          eyebrow="Architecture"
          title="End-to-end system flow"
        />
        <div className="mt-6 overflow-x-auto rounded-[var(--radius-m)] border border-line bg-surface p-5">
          <ol className="flex min-w-max items-center">
            {detail.flow.map((step, index) => (
              <li key={step} className="flex items-center">
                <span className="min-w-[112px] rounded-[var(--radius-s)] border border-line bg-background px-3 py-3 text-center font-mono text-xs">
                  {step}
                </span>
                {index < detail.flow.length - 1 && (
                  <ArrowRight
                    size={15}
                    className="mx-2 text-foreground-faint"
                    aria-hidden="true"
                  />
                )}
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="border-t border-line py-12">
        <SectionHeading
          icon={Code2}
          eyebrow="Technology"
          title="Stack by system layer"
        />
        <div className="mt-7 grid gap-px overflow-hidden rounded-[var(--radius-m)] border border-line bg-line md:grid-cols-2">
          {detail.stack.map((section) => (
            <article key={section.title} className="bg-background p-6 sm:p-7">
              <h2 className="font-display text-xl font-semibold">
                {section.title}
              </h2>
              <p className="mt-2 text-sm leading-6 text-foreground-dim">
                {section.description}
              </p>
              <dl className="mt-5 space-y-4">
                {section.items.map((item) => (
                  <div key={item.name}>
                    <dt className="font-mono text-xs font-medium text-accent">
                      {item.name}
                    </dt>
                    <dd className="mt-1 text-sm leading-6 text-foreground-dim">
                      {item.role}
                    </dd>
                  </div>
                ))}
              </dl>
            </article>
          ))}
        </div>
      </section>

      <div className="grid gap-8 border-t border-line py-12 lg:grid-cols-2">
        <section>
          <SectionHeading
            icon={Rocket}
            eyebrow="Platform & deployment"
            title="Production delivery"
          />
          <Checklist items={detail.deployment} />
        </section>
        <section>
          <SectionHeading
            icon={LockKeyhole}
            eyebrow="Quality & control"
            title="Production readiness"
          />
          <Checklist items={detail.productionChecks} />
        </section>
      </div>

      <section className="grid gap-px overflow-hidden rounded-[var(--radius-m)] border border-line bg-line sm:grid-cols-4">
        {[
          { icon: Cloud, label: "Deploy", value: "Containerized" },
          { icon: Database, label: "State", value: "Durable" },
          { icon: Gauge, label: "Observe", value: "End-to-end" },
          { icon: LockKeyhole, label: "Control", value: "Least privilege" },
        ].map((item) => {
          const Icon = item.icon;
          return (
            <div key={item.label} className="bg-background p-5">
              <Icon size={18} className="text-accent" aria-hidden="true" />
              <div className="mt-4 font-mono text-[10px] uppercase tracking-[0.16em] text-foreground-faint">
                {item.label}
              </div>
              <div className="mt-1 text-sm font-medium">{item.value}</div>
            </div>
          );
        })}
      </section>
    </div>
  );
}

function SectionHeading({
  icon: Icon,
  eyebrow,
  title,
}: {
  icon: typeof Layers3;
  eyebrow: string;
  title: string;
}) {
  return (
    <div>
      <div className="flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.16em] text-foreground-faint">
        <Icon size={15} className="text-accent" aria-hidden="true" /> {eyebrow}
      </div>
      <h2 className="mt-3 font-display text-2xl font-semibold">{title}</h2>
    </div>
  );
}

function Checklist({ items }: { items: string[] }) {
  return (
    <ul className="mt-6 space-y-3">
      {items.map((item) => (
        <li
          key={item}
          className="flex gap-3 text-sm leading-6 text-foreground-dim"
        >
          <CheckCircle2
            size={16}
            className="mt-1 shrink-0 text-live"
            aria-hidden="true"
          />{" "}
          {item}
        </li>
      ))}
    </ul>
  );
}
