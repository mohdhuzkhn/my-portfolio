"use client";

import { useState } from "react";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { learningBooks, type BookStatus } from "@/lib/book-library";

const filters: { id: "all" | BookStatus; label: string }[] = [
  { id: "all", label: "All books" },
  { id: "reading", label: "Currently reading" },
  { id: "next", label: "Reading next" },
];

export function BookLibrary() {
  const [filter, setFilter] = useState<"all" | BookStatus>("all");
  const books = learningBooks.filter(
    (book) => filter === "all" || book.status === filter,
  );

  return (
    <>
      <div
        aria-label="Filter books by reading status"
        className="mt-8 flex flex-wrap gap-2"
      >
        {filters.map(({ id, label }) => (
          <button
            key={id}
            type="button"
            aria-pressed={filter === id}
            onClick={() => setFilter(id)}
            className={`rounded-[var(--radius-s)] border px-4 py-2 text-sm transition-colors focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent ${filter === id ? "border-accent bg-accent-dim text-foreground" : "border-line text-foreground-dim hover:border-foreground-faint hover:text-foreground"}`}
          >
            {label}
            <span className="ml-2 font-mono text-xs">
              {
                learningBooks.filter(
                  (book) => id === "all" || book.status === id,
                ).length
              }
            </span>
          </button>
        ))}
      </div>
      <p role="status" className="mt-4 text-sm text-foreground-dim">
        {books.length} {books.length === 1 ? "book" : "books"}
        {filter === "all"
          ? " on the reading shelf"
          : ` · ${filters.find((item) => item.id === filter)?.label}`}
      </p>
      <div className="mt-6 space-y-4">
        {books.map((book) => (
          <article
            key={book.id}
            className="grid min-w-0 grid-cols-[88px_minmax(0,1fr)] gap-4 rounded-[var(--radius-m)] border border-line bg-background p-5 sm:grid-cols-[144px_minmax(0,1fr)] sm:gap-6 sm:p-6"
          >
            <a
              href={book.publisherUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`View ${book.title} on O'Reilly (opens in a new tab)`}
              className="block self-start overflow-hidden rounded-[var(--radius-s)] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent"
            >
              <Image
                src={book.cover}
                alt={`${book.title} book cover`}
                width={600}
                height={787}
                sizes="(min-width: 640px) 144px, 88px"
                className="h-auto w-full"
              />
            </a>
            <div className="min-w-0">
              <div className="mb-3 flex flex-wrap items-center gap-2 font-mono text-[11px] uppercase tracking-wide">
                <span className="text-accent">{book.domain}</span>
                <span className="rounded border border-line px-2 py-1 text-foreground-dim">
                  {book.status === "reading"
                    ? "Currently reading"
                    : "Reading next"}
                </span>
              </div>
              <h2 className="font-display text-lg font-semibold leading-snug sm:text-xl">
                {book.title}
              </h2>
              <p className="mt-2 text-sm text-foreground-dim">
                {book.author}
                {book.edition && ` · ${book.edition}`}
              </p>
              <p className="mt-3 max-w-2xl text-sm leading-relaxed text-foreground-dim">
                {book.description}
              </p>
              <a
                href={book.publisherUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-accent hover:underline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent"
              >
                Book details <ArrowUpRight size={15} aria-hidden="true" />
              </a>
            </div>
          </article>
        ))}
      </div>
    </>
  );
}
