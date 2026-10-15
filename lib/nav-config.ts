export type NavItem = { label: string; href: string; description?: string };

export const primaryNav: NavItem[] = [
  { label: "Research", href: "/research" },
  { label: "Knowledge", href: "/knowledge" },
  { label: "AI Systems", href: "/ai-systems" },
  { label: "Projects", href: "/projects" },
  { label: "Video", href: "/video" },
  { label: "Books", href: "/books" },
];

export const exploreGroups: { heading: string; items: NavItem[] }[] = [
  {
    heading: "Systems thinking",
    items: [
      {
        label: "Architecture",
        href: "/architecture",
        description: "System design case studies",
      },
      {
        label: "Playbooks",
        href: "/playbooks",
        description: "Step-by-step engineering blueprints",
      },
    ],
  },
  {
    heading: "Story",
    items: [
      {
        label: "Journey",
        href: "/journey",
        description: "The path from software to AI systems",
      },
      {
        label: "Writing",
        href: "/writing",
        description: "Long-form engineering essays",
      },
    ],
  },
  {
    heading: "Learn & build",
    items: [
      {
        label: "Roadmaps",
        href: "/roadmaps",
        description: "Public learning maps",
      },
      {
        label: "Reading Room",
        href: "/reading-room",
        description: "Curated books, papers, courses",
      },
      {
        label: "Ventures",
        href: "/ventures",
        description: "Products and startup concepts",
      },
    ],
  },
];

export const secondaryNav: NavItem[] = [
  { label: "Case Studies", href: "/case-studies" },
  { label: "Datasets", href: "/datasets" },
  { label: "Toolbox", href: "/toolbox" },
  { label: "Talks", href: "/talks" },
  { label: "Now", href: "/now" },
];

export const workWithMe: NavItem = {
  label: "Work with me",
  href: "/work-with-me",
};
