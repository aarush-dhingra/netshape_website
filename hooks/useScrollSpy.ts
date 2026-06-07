"use client";

import { useState, useEffect, useRef, useCallback } from "react";

export function useScrollSpy(sectionIds: string[], offset = 80) {
  const [activeId, setActiveId] = useState<string>(sectionIds[0] ?? "");
  const sectionsRef = useRef(sectionIds);
  const lockedRef = useRef<string | null>(null);
  const scrollEndTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  sectionsRef.current = sectionIds;

  const navigateTo = useCallback((id: string) => {
    lockedRef.current = id;
    setActiveId(id);

    // Clear any existing timer
    if (scrollEndTimer.current) clearTimeout(scrollEndTimer.current);

    // Unlock after smooth scroll finishes (~300ms is enough for most scrollIntoView animations)
    scrollEndTimer.current = setTimeout(() => {
      lockedRef.current = null;
    }, 800);

    const el = document.getElementById(id);
    el?.scrollIntoView({ behavior: "smooth" });
  }, []);

  useEffect(() => {
    const elements = sectionsRef.current
      .map((id) => document.getElementById(id))
      .filter(Boolean) as HTMLElement[];

    if (elements.length === 0) return;

    const handleScroll = () => {
      // If locked to a target, don't update
      if (lockedRef.current) return;

      const viewportBottom = window.innerHeight + window.scrollY;
      const pageBottom = document.documentElement.scrollHeight - 2;

      if (viewportBottom >= pageBottom) {
        const lastId = sectionsRef.current[sectionsRef.current.length - 1];
        setActiveId(lastId);
        return;
      }

      const targetY = window.scrollY + offset;
      let closest: { id: string; top: number } | null = null;

      for (const el of elements) {
        const top = el.getBoundingClientRect().top + window.scrollY;
        if (top <= targetY + 50) {
          if (!closest || top > closest.top) {
            closest = { id: el.id, top };
          }
        }
      }

      if (closest) {
        setActiveId(closest.id);
      }
    };

    const onScroll = () => {
      requestAnimationFrame(handleScroll);
    };

    handleScroll();

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (scrollEndTimer.current) clearTimeout(scrollEndTimer.current);
    };
  }, [offset]);

  return { activeId, navigateTo };
}
