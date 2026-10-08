import type { Metadata } from "next";
import { VideoLibrary } from "@/components/video/video-library";

export const metadata: Metadata = {
  title: "Video",
  description:
    "Videos I have watched, am watching, and plan to explore — connected to AI systems, research, and projects in my Second Brain.",
};

export default function VideoPage() {
  return (
    <div className="mx-auto max-w-6xl px-6 py-16">
      <div className="mb-2 font-mono text-xs uppercase tracking-wide text-foreground-faint">
        Learning in context
      </div>
      <h1 className="font-display text-3xl font-semibold">Video</h1>
      <p className="mt-3 max-w-2xl leading-relaxed text-foreground-dim">
        A personal library of conversations and technical deep dives I have
        watched, am watching, and plan to explore — connected to the systems,
        research, and projects in my Second Brain.
      </p>
      <VideoLibrary />
    </div>
  );
}
