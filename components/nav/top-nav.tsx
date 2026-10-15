"use client";

import * as React from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown, Menu, Search, X } from "lucide-react";
import { ThemeToggle } from "./theme-toggle";
import {
  exploreGroups,
  primaryNav,
  secondaryNav,
  workWithMe,
} from "@/lib/nav-config";

export function TopNav() {
  const [exploreOpen, setExploreOpen] = React.useState(false);
  const [mobileOpen, setMobileOpen] = React.useState(false);

  // ⌘K / Ctrl+K shortcut reserved for Phase 6 global search.
  React.useEffect(() => {
    function onKeyDown(e: KeyboardEvent) {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        window.dispatchEvent(new CustomEvent("open-command-palette"));
      }
    }
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  return (
    <header
      className={`sticky top-0 z-50 border-b border-line ${mobileOpen ? "bg-background" : "bg-background/85 backdrop-blur-md"}`}
    >
      <nav className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6">
        <Link
          href="/"
          className="flex items-center gap-2 font-display text-[17px] font-semibold"
        >
          <span
            className="h-[7px] w-[7px] rounded-full bg-live"
            style={{ boxShadow: "0 0 8px var(--live)" }}
          />
          huzaifa.ai
        </Link>

        <div className="hidden items-center gap-5 text-sm text-foreground-dim lg:flex xl:gap-7">
          {primaryNav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="transition-colors hover:text-foreground"
            >
              {item.label}
            </Link>
          ))}

          <div
            className="relative"
            onMouseEnter={() => setExploreOpen(true)}
            onMouseLeave={() => setExploreOpen(false)}
          >
            <button
              className="flex items-center gap-1 transition-colors hover:text-foreground"
              aria-expanded={exploreOpen}
              onClick={() => setExploreOpen((v) => !v)}
            >
              Explore <ChevronDown size={14} />
            </button>
            <AnimatePresence>
              {exploreOpen && (
                <motion.div
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 6 }}
                  transition={{ duration: 0.15 }}
                  className="absolute left-1/2 top-full grid w-[560px] -translate-x-1/2 grid-cols-3 gap-6 rounded-[var(--radius-m)] border border-line bg-surface p-6 shadow-2xl"
                >
                  {exploreGroups.map((group) => (
                    <div key={group.heading}>
                      <div className="mb-3 font-mono text-[11px] uppercase tracking-wide text-foreground-faint">
                        {group.heading}
                      </div>
                      <ul className="space-y-3">
                        {group.items.map((item) => (
                          <li key={item.href}>
                            <Link
                              href={item.href}
                              className="block text-sm text-foreground hover:text-accent"
                            >
                              {item.label}
                              {item.description && (
                                <span className="mt-0.5 block text-xs text-foreground-faint">
                                  {item.description}
                                </span>
                              )}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button
            aria-label="Search"
            onClick={() =>
              window.dispatchEvent(new CustomEvent("open-command-palette"))
            }
            className="hidden h-8 w-8 items-center justify-center rounded-[var(--radius-s)] text-foreground-dim transition-colors hover:text-foreground lg:flex"
          >
            <Search size={16} />
          </button>
          <ThemeToggle />
          <Link
            href={workWithMe.href}
            className="hidden rounded-[var(--radius-s)] border border-line px-4 py-2 text-sm transition-colors hover:border-accent hover:text-accent lg:inline-block"
          >
            {workWithMe.label}
          </Link>
          <button
            className="text-foreground lg:hidden"
            aria-label="Open menu"
            onClick={() => setMobileOpen(true)}
          >
            <Menu size={22} />
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "tween", duration: 0.2 }}
            className="fixed inset-0 z-50 flex h-dvh flex-col overflow-y-auto bg-background p-6 lg:hidden"
          >
            <div className="mb-8 flex items-center justify-between">
              <span className="font-display text-lg font-semibold">Menu</span>
              <button
                aria-label="Close menu"
                onClick={() => setMobileOpen(false)}
              >
                <X size={22} />
              </button>
            </div>
            <ul className="space-y-5 text-lg">
              {[
                ...primaryNav,
                ...exploreGroups.flatMap((g) => g.items),
                ...secondaryNav,
                workWithMe,
              ].map((item) => (
                <li key={item.href}>
                  <Link href={item.href} onClick={() => setMobileOpen(false)}>
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
