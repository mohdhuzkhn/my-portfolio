"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Play } from "lucide-react";
import { learningVideos, type VideoStatus } from "@/lib/video-library";

const filters: { id: "all" | VideoStatus; label: string }[] = [
  { id: "all", label: "All videos" },
  { id: "watching", label: "Watching now" },
  { id: "watched", label: "Watched" },
  { id: "later", label: "Watch later" },
];

export function VideoLibrary() {
  const [filter, setFilter] = useState<"all" | VideoStatus>("all");
  const videos = learningVideos.filter(
    (video) => filter === "all" || video.statuses.includes(filter),
  );

  return (
    <>
      <div
        aria-label="Filter videos by watch status"
        className="mt-8 flex flex-wrap gap-2"
      >
        {filters.map(({ id, label }) => {
          const count = learningVideos.filter(
            (video) => id === "all" || video.statuses.includes(id),
          ).length;
          return (
            <button
              key={id}
              type="button"
              aria-pressed={filter === id}
              onClick={() => setFilter(id)}
              className={`rounded-[var(--radius-s)] border px-4 py-2 text-sm transition-colors focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent ${filter === id ? "border-accent bg-accent-dim text-foreground" : "border-line text-foreground-dim hover:border-foreground-faint hover:text-foreground"}`}
            >
              {label} <span className="ml-2 font-mono text-xs">{count}</span>
            </button>
          );
        })}
      </div>
      <p role="status" className="mt-4 text-sm text-foreground-dim">
        {videos.length} {videos.length === 1 ? "video" : "videos"}
        {filter !== "all"
          ? ` · ${filters.find((item) => item.id === filter)?.label}`
          : " in the learning library"}
      </p>
      {videos.length === 0 ? (
        <div className="mt-6 rounded-[var(--radius-m)] border border-line p-8 sm:p-10">
          <h2 className="font-display text-xl font-semibold">
            Nothing queued yet
          </h2>
          <p className="mt-3 max-w-xl text-foreground-dim">
            Future selections will appear here as I add them to my watch list.
            Explore the videos I am watching now or have already watched.
          </p>
          <button
            type="button"
            onClick={() => setFilter("all")}
            className="mt-5 text-sm text-accent underline underline-offset-4 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent"
          >
            Browse all videos
          </button>
        </div>
      ) : (
        <div className="mt-6 grid gap-6 md:grid-cols-2">
          {videos.map((video) => {
            const rewatching =
              video.statuses.includes("watching") &&
              video.statuses.includes("watched");
            const url = `https://www.youtube.com/watch?v=${video.id}`;
            return (
              <article
                key={video.id}
                className="flex min-w-0 flex-col overflow-hidden rounded-[var(--radius-m)] border border-line bg-background"
              >
                <a
                  href={url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`Watch ${video.title} on YouTube (opens in a new tab)`}
                  className="group relative block aspect-video overflow-hidden bg-surface focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-accent"
                >
                  <Image
                    src={`https://i.ytimg.com/vi/${video.id}/hqdefault.jpg`}
                    alt=""
                    fill
                    unoptimized
                    className="object-cover"
                    sizes="(min-width: 768px) 540px, 100vw"
                  />
                  <span className="absolute inset-0 flex items-center justify-center bg-black/15 transition-colors group-hover:bg-black/30">
                    <span className="rounded-full bg-black/70 p-3 text-white">
                      <Play size={22} aria-hidden="true" />
                    </span>
                  </span>
                </a>
                <div className="flex flex-1 flex-col p-6">
                  <div className="mb-3 flex flex-wrap items-center gap-2 font-mono text-[11px] uppercase tracking-wide">
                    <span className="text-accent">{video.topic}</span>
                    <span className="rounded border border-line px-2 py-1 text-foreground-dim">
                      {rewatching
                        ? "Rewatching · watched before"
                        : video.statuses.includes("watching")
                          ? "Watching now"
                          : video.statuses.includes("watched")
                            ? "Watched"
                            : "Watch later"}
                    </span>
                  </div>
                  <h2 className="font-display text-xl font-semibold leading-snug">
                    {video.title}
                  </h2>
                  <p className="mt-2 text-sm text-foreground-dim">
                    {video.creator}
                  </p>
                  <p className="mt-4 text-sm leading-relaxed text-foreground-dim">
                    {video.context}
                  </p>
                  <div className="mt-5">
                    <p className="font-mono text-xs text-foreground-dim">
                      Explore related work
                    </p>
                    <div className="mt-2 flex flex-wrap gap-x-4 gap-y-2">
                      {video.related.map((item) => (
                        <Link
                          key={item.href}
                          href={item.href}
                          className="text-sm text-accent underline-offset-4 hover:underline"
                        >
                          {item.label}
                        </Link>
                      ))}
                    </div>
                  </div>
                  <div className="mt-auto flex flex-wrap gap-x-5 gap-y-3 pt-6">
                    <a
                      href={url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-sm font-medium text-accent hover:underline"
                    >
                      Watch on YouTube{" "}
                      <ArrowUpRight size={15} aria-hidden="true" />
                    </a>
                    {video.resumeSeconds && (
                      <a
                        href={`${url}&t=${video.resumeSeconds}s`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm text-foreground-dim hover:text-foreground"
                      >
                        Continue at 28:21 &rarr;
                      </a>
                    )}
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      )}
    </>
  );
}
