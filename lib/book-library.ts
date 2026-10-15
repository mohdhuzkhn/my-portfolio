export type BookStatus = "reading" | "next";

export type LearningBook = {
  id: string;
  title: string;
  author: string;
  edition?: string;
  domain: string;
  description: string;
  status: BookStatus;
  cover: string;
  publisherUrl: string;
};

// Descriptions and covers come from the publisher pages linked below.
// Publisher cover originals (600px wide):
// https://www.oreilly.com/covers/urn%3Aorm%3Abook%3A9781491962282/600w/?format=webp
// https://www.oreilly.com/covers/urn%3Aorm%3Abook%3A9781098166298/600w/?format=webp
export const learningBooks: LearningBook[] = [
  {
    id: "hands-on-machine-learning",
    title: "Hands-On Machine Learning with Scikit-Learn and TensorFlow",
    author: "Aurélien Géron",
    edition: "First edition",
    domain: "Machine Learning",
    description:
      "Practical foundations in data preparation, model evaluation, classical machine learning, and neural networks with Scikit-Learn and TensorFlow.",
    status: "reading",
    cover: "/books/hands-on-machine-learning.webp",
    publisherUrl:
      "https://www.oreilly.com/library/view/hands-on-machine-learning/9781491962282/",
  },
  {
    id: "ai-engineering",
    title: "AI Engineering",
    author: "Chip Huyen",
    domain: "Foundation Model Applications",
    description:
      "Building applications with foundation models, covering evaluation, prompt engineering, RAG, agents, and deployment trade-offs.",
    status: "next",
    cover: "/books/ai-engineering.webp",
    publisherUrl:
      "https://www.oreilly.com/library/view/ai-engineering/9781098166298/",
  },
];
