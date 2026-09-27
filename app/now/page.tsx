import type { Metadata } from "next";
import { BookOpen, Rocket } from "lucide-react";

export const metadata: Metadata = {
  title: "Now",
  description:
    "What Muhammad Huzaifa is currently building and learning in public.",
};

const currentWork = [
  {
    label: "Building",
    title: "Working on a startup",
    description:
      "I am currently building a startup from the ground up—turning an early idea into a focused product and a real operating business.",
    Icon: Rocket,
  },
  {
    label: "Teaching",
    title: "The complete ML Maths playbook",
    description:
      "I am building a complete, practical playbook for the mathematics behind machine learning, which I will publish on my YouTube channel.",
    Icon: BookOpen,
  },
] as const;

export default function NowPage() {
  return (
    <div className="mx-auto max-w-6xl px-6 py-16 sm:py-20">
      <div className="mb-2 flex items-center gap-2 font-mono text-xs uppercase tracking-wide text-accent">
        <span className="h-1.5 w-1.5 rounded-full bg-live" />
        In progress
      </div>
      <h1 className="max-w-3xl font-display text-4xl font-semibold tracking-tight sm:text-5xl">
        What I&apos;m building now.
      </h1>
      <p className="mt-5 max-w-2xl text-lg leading-8 text-foreground-dim">
        A live snapshot of the work receiving most of my attention right now.
        Links, progress notes, and deeper build logs will be added as each
        project develops.
      </p>

      <div className="mt-14 grid gap-px overflow-hidden rounded-[var(--radius-m)] border border-line bg-line md:grid-cols-2">
        {currentWork.map(({ label, title, description, Icon }) => (
          <article
            key={title}
            className="flex min-h-80 flex-col bg-background p-7 sm:p-9"
          >
            <div className="flex items-center justify-between">
              <span className="font-mono text-xs uppercase tracking-wide text-foreground-faint">
                {label}
              </span>
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-accent-dim text-accent">
                <Icon aria-hidden="true" size={19} />
              </div>
            </div>
            <h2 className="mt-16 max-w-sm font-display text-2xl font-semibold leading-tight sm:text-3xl">
              {title}
            </h2>
            <p className="mt-4 max-w-md text-sm leading-7 text-foreground-dim">
              {description}
            </p>
            <div className="mt-auto pt-8 font-mono text-xs text-foreground-faint">
              Details and links coming soon
            </div>
          </article>
        ))}
      </div>

      <p className="mt-8 font-mono text-xs text-foreground-faint">
        Last updated September 2026
      </p>
    </div>
  );
}
