"use client";

import { useState, useCallback } from "react";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import clsx from "clsx";
import { useScrollSpy } from "@/hooks/useScrollSpy";
import { NAV_SECTIONS } from "@/lib/data";

import { GitHubIcon } from "@/components/ui/GitHubIcon";

export function NavBar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();
  const isHome = pathname === "/";
  const sectionIds = NAV_SECTIONS.map((s) => s.id);
  const { activeId, navigateTo: scrollTo } = useScrollSpy(isHome ? sectionIds : []);

  const navigateTo = useCallback((id: string) => {
    setMobileOpen(false);
    if (isHome) {
      scrollTo(id);
    } else {
      window.location.href = `/#${id}`;
    }
  }, [isHome, scrollTo]);

  const goHome = useCallback(() => {
    setMobileOpen(false);
    if (isHome) {
      scrollTo("hero");
    } else {
      window.location.href = "/";
    }
  }, [isHome, scrollTo]);

  const isActive = (id: string) => isHome && activeId === id;

  return (
    <header className="sticky top-0 z-50 border-b border-terminal-border bg-terminal-bg/80 backdrop-blur-md">
      <nav className="max-w-6xl mx-auto px-6 h-14 flex items-center justify-between">
        <button
          onClick={goHome}
          className="flex items-center gap-2.5 hover:opacity-80 transition-opacity"
          aria-label="NetShape — home"
        >
          <img src="/logo-mark.svg" alt="" width={36} height={30} />
          <span className="font-sans font-bold text-white text-lg tracking-tight">NetShape</span>
        </button>

        <div className="hidden md:flex items-center gap-1">
          {NAV_SECTIONS.map((section) => (
            <button
              key={section.id}
              onClick={() => navigateTo(section.id)}
              className={clsx(
                "px-3 py-1.5 rounded text-sm font-sans transition-colors",
                isActive(section.id)
                  ? "text-accent-green bg-accent-green/10"
                  : "text-gray-400 hover:text-gray-200 hover:bg-terminal-surface",
              )}
            >
              {section.label}
            </button>
          ))}

          <a
            href="/docs"
            className={clsx(
              "px-3 py-1.5 rounded text-sm font-sans transition-colors",
              pathname === "/docs"
                ? "text-accent-green bg-accent-green/10"
                : "text-gray-400 hover:text-gray-200 hover:bg-terminal-surface",
            )}
          >
            Docs
          </a>

          <a
            href="https://github.com/aarush-dhingra/netshape"
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
                onClick={() => navigateTo(section.id)}
                aria-label={`Scroll to ${section.label}`}
                aria-current={isActive(section.id) ? "page" : undefined}
                className={clsx(
                  "px-3 py-2 rounded text-sm font-sans text-left transition-colors",
                  isActive(section.id)
                    ? "text-accent-green bg-accent-green/10"
                    : "text-gray-400 hover:text-gray-200",
                )}
              >
                {section.label}
              </button>
            ))}
            <a
              href="/docs"
              className={clsx(
                "px-3 py-2 text-sm font-sans transition-colors",
                pathname === "/docs"
                  ? "text-accent-green bg-accent-green/10"
                  : "text-gray-400 hover:text-gray-200",
              )}
            >
              Docs
            </a>
            <a
              href="https://github.com/aarush-dhingra/netshape"
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
