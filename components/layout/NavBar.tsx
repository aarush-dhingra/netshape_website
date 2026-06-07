"use client";

import { useState } from "react";
import { Menu, X } from "lucide-react";
import clsx from "clsx";
import { useScrollSpy } from "@/hooks/useScrollSpy";
import { NAV_SECTIONS } from "@/lib/data";

function GitHubIcon({ size = 18 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
    </svg>
  );
}

export function NavBar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const sectionIds = NAV_SECTIONS.map((s) => s.id);
  const activeId = useScrollSpy(sectionIds);

  const scrollTo = (id: string) => {
    setMobileOpen(false);
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <header className="sticky top-0 z-50 border-b border-terminal-border bg-terminal-bg/80 backdrop-blur-md">
      <nav className="max-w-6xl mx-auto px-6 h-14 flex items-center justify-between">
        <button
          onClick={() => scrollTo("hero")}
          className="font-mono text-accent-green text-base hover:opacity-80 transition-opacity"
        >
          <span className="text-gray-600">$</span> netshape
        </button>

        <div className="hidden md:flex items-center gap-1">
          {NAV_SECTIONS.map((section) => (
            <button
              key={section.id}
              onClick={() => scrollTo(section.id)}
              className={clsx(
                "px-3 py-1.5 rounded text-sm font-sans transition-colors",
                activeId === section.id
                  ? "text-accent-green bg-accent-green/10"
                  : "text-gray-400 hover:text-gray-200 hover:bg-terminal-surface",
              )}
            >
              {section.label}
            </button>
          ))}

          <a
            href="https://github.com/netshape/netshape"
            target="_blank"
            rel="noopener noreferrer"
            className="ml-2 p-2 text-gray-400 hover:text-white transition-colors rounded hover:bg-terminal-surface"
            aria-label="GitHub"
          >
            <GitHubIcon size={18} />
          </a>
        </div>

        <button
          className="md:hidden p-2 text-gray-400 hover:text-white"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle menu"
        >
          {mobileOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </nav>

      {mobileOpen && (
        <div className="md:hidden border-t border-terminal-border bg-terminal-bg/95 backdrop-blur-md">
          <div className="px-6 py-3 flex flex-col gap-1">
            {NAV_SECTIONS.map((section) => (
              <button
                key={section.id}
                onClick={() => scrollTo(section.id)}
                className={clsx(
                  "px-3 py-2 rounded text-sm font-sans text-left transition-colors",
                  activeId === section.id
                    ? "text-accent-green bg-accent-green/10"
                    : "text-gray-400 hover:text-gray-200",
                )}
              >
                {section.label}
              </button>
            ))}
            <a
              href="https://github.com/netshape/netshape"
              target="_blank"
              rel="noopener noreferrer"
              className="px-3 py-2 text-sm font-sans text-gray-400 hover:text-gray-200 flex items-center gap-2"
            >
              <GitHubIcon size={16} /> GitHub
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
