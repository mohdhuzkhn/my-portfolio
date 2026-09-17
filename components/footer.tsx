import Link from "next/link";
import {
  exploreGroups,
  primaryNav,
  secondaryNav,
  workWithMe,
} from "@/lib/nav-config";

export function Footer() {
  const allLinks = [
    ...primaryNav,
    ...exploreGroups.flatMap((g) => g.items),
    ...secondaryNav,
    workWithMe,
  ];

  return (
    <footer className="mt-auto border-t border-line">
      <div className="mx-auto max-w-6xl px-6 py-12">
        <div className="mb-10 grid grid-cols-2 gap-x-8 gap-y-3 text-sm text-foreground-dim sm:grid-cols-4">
          {allLinks.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="transition-colors hover:text-foreground"
            >
              {item.label}
            </Link>
          ))}
        </div>
        <div className="flex flex-col items-start justify-between gap-4 border-t border-line pt-6 text-xs text-foreground-faint sm:flex-row sm:items-center">
          <span>
            © {new Date().getFullYear()} Muhammad Huzaifa. Built with intent.
          </span>
          <div className="flex gap-5">
            <a
              href="https://github.com/mohdhuzkhn"
              target="_blank"
              rel="noreferrer"
              className="hover:text-foreground-dim"
            >
              GitHub
            </a>
            <a
              href="https://www.linkedin.com/in/muhammad-huzaifa-6b396a26a/"
              target="_blank"
              rel="noreferrer"
              className="hover:text-foreground-dim"
            >
              LinkedIn
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
