"use client";

import { useMDXComponent } from "next-contentlayer2/hooks";

const mdxComponents = {
  // Custom MDX component overrides land here as content needs them
  // (Callout, KatexBlock, DiagramEmbed, etc.) — plain HTML elements are
  // styled globally via .prose-institute in app/globals.css for now.
};

export function MdxContent({ code }: { code: string }) {
  const Component = useMDXComponent(code);
  return (
    <div className="prose-institute">
      {/* useMDXComponent memoizes internally by `code`; this rule's static
          analysis can't see that and treats the returned component as
          freshly created every render. Known false positive for this
          Contentlayer/MDX-hook pattern. */}
      {/* eslint-disable-next-line react-hooks/static-components */}
      <Component components={mdxComponents} />
    </div>
  );
}
