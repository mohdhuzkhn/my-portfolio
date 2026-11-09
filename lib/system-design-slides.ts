export type SystemDesignSlide = {
  title: string;
  image: string;
  alt: string;
  caption: string;
};

// Add future system design material here; the slide viewer adapts automatically.
export const systemDesignSlides: SystemDesignSlide[] = [
  {
    title: "Four Pillars of System Design",
    image: "/system-design/four-pillars.png",
    alt: "Overview of the four system design pillars: performance, scalability, reliability, and security",
    caption: "A framework for evaluating the quality of a system.",
  },
  {
    title: "Performance",
    image: "/system-design/performance.png",
    alt: "Latency and throughput explained with a road traffic analogy",
    caption: "Latency measures how long an operation takes; throughput measures how much work a system handles over time.",
  },
  {
    title: "Scalability",
    image: "/system-design/scalability.png",
    alt: "Scalability explained through a restaurant adapting to more customers",
    caption: "A scalable system adapts to a growing number of users without slowing down or failing.",
  },
  {
    title: "Reliability",
    image: "/system-design/reliability.png",
    alt: "Single point of failure diagram showing how one failed web server can interrupt an application",
    caption: "Reliable systems keep working through component failures and unexpected conditions.",
  },
  {
    title: "Security",
    image: "/system-design/security.png",
    alt: "Overview of AWS security, identity, and compliance services",
    caption: "Security protects identities, infrastructure, data, and incident response paths.",
  },
];
