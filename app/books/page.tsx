import type { Metadata } from "next";
import { BookLibrary } from "@/components/books/book-library";

export const metadata: Metadata = {
  title: "Books",
  description:
    "My AI engineering reading shelf: books I am reading now and plan to read next, from machine learning foundations to foundation model applications.",
};

export default function BooksPage() {
  return (
    <div className="mx-auto max-w-6xl px-6 py-16">
      <div className="mb-2 font-mono text-xs uppercase tracking-wide text-foreground-faint">
        The reading shelf
      </div>
      <h1 className="font-display text-3xl font-semibold">Books</h1>
      <p className="mt-3 max-w-2xl leading-relaxed text-foreground-dim">
        What I’m reading now and exploring next, from machine learning
        foundations to building AI applications.
      </p>
      <BookLibrary />
    </div>
  );
}
