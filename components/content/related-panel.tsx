import Link from "next/link";

type Linked = { title: string; url: string; type: string };

const typeLabels: Record<string, string> = {
  ResearchPaper: "Research",
  KnowledgeArticle: "Knowledge",
  ArchitectureDoc: "Architecture",
  WritingPost: "Writing",
  Project: "Project",
  LabExperiment: "Lab",
  JourneyMilestone: "Journey",
  Roadmap: "Roadmap",
  Venture: "Venture",
  Playbook: "Playbook",
  CaseStudy: "Case Study",
  Talk: "Talk",
  Dataset: "Dataset",
  ToolboxEntry: "Toolbox",
};

function LinkedList({ items }: { items: Linked[] }) {
  if (!items.length) return <p className="text-sm text-foreground-faint">None yet.</p>;
  return (
    <ul className="space-y-2.5">
      {items.map((item) => (
        <li key={item.url}>
          <Link href={item.url} className="group flex items-start gap-2 text-sm">
            <span className="mt-0.5 shrink-0 rounded-full border border-line px-2 py-0.5 font-mono text-[10px] text-foreground-faint">
              {typeLabels[item.type] ?? item.type}
            </span>
            <span className="text-foreground-dim group-hover:text-accent">{item.title}</span>
          </Link>
        </li>
      ))}
    </ul>
  );
}

export function RelatedPanel({
  related,
  backlinks,
}: {
  related: Linked[];
  backlinks: Linked[];
}) {
  return (
    <div className="space-y-8">
      <div>
        <div className="mb-3 font-mono text-xs uppercase tracking-wide text-foreground-faint">
          Related
        </div>
        <LinkedList items={related} />
      </div>
      <div>
        <div className="mb-3 font-mono text-xs uppercase tracking-wide text-foreground-faint">
          Backlinks
        </div>
        <LinkedList items={backlinks} />
      </div>
    </div>
  );
}
