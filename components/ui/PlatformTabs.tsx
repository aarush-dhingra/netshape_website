"use client";

import { useState } from "react";
import clsx from "clsx";

interface Tab {
  label: string;
  content: string;
}

interface PlatformTabsProps {
  tabs: Tab[];
}

export function PlatformTabs({ tabs }: PlatformTabsProps) {
  const [active, setActive] = useState(0);

  return (
    <div>
      <div className="flex border-b border-terminal-border mb-4">
        {tabs.map((tab, i) => (
          <button
            key={tab.label}
            onClick={() => setActive(i)}
            className={clsx(
              "px-4 py-2 text-sm font-mono transition-colors border-b-2 -mb-px",
              i === active
                ? "border-accent-green text-accent-green"
                : "border-transparent text-gray-500 hover:text-gray-300",
            )}
          >
            {tab.label}
          </button>
        ))}
      </div>
      <CodeBlockPlain code={tabs[active].content} />
    </div>
  );
}

function CodeBlockPlain({ code }: { code: string }) {
  return (
    <div className="rounded-lg bg-[#0d0d0d] border border-terminal-border overflow-hidden">
      <pre className="overflow-x-auto px-4 py-3 text-sm leading-relaxed font-mono">
        <code className="text-[#e0e0e0]">{code}</code>
      </pre>
    </div>
  );
}
