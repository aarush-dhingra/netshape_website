"use client";

import { useState, useCallback } from "react";
import { Copy, Check } from "lucide-react";
import clsx from "clsx";

interface CodeBlockProps {
  code: string;
  language?: string;
  className?: string;
  showCopy?: boolean;
}

export function CodeBlock({
  code,
  language,
  className,
  showCopy = true,
}: CodeBlockProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // clipboard API unavailable — silently ignore
    }
  }, [code]);

  return (
    <div
      className={clsx(
        "relative group rounded-lg bg-[#0d0d0d] border border-terminal-border overflow-x-auto",
        className,
      )}
    >
      {showCopy && (
        <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity z-10">
          <button
            onClick={handleCopy}
            className="flex items-center gap-1 px-2 py-1 rounded text-xs bg-terminal-dim text-gray-400 hover:text-white hover:bg-terminal-border transition-colors font-sans"
            aria-label="Copy code"
          >
            {copied ? (
              <>
                <Check size={12} className="text-accent-green" />
                <span className="text-accent-green">Copied</span>
              </>
            ) : (
              <>
                <Copy size={12} />
                <span>Copy</span>
              </>
            )}
          </button>
        </div>
      )}
      {language && (
        <div className="px-4 pt-3 pb-1 font-sans text-xs text-gray-500 select-none">
          {language}
        </div>
      )}
      <pre className="overflow-x-auto px-4 py-3 text-sm leading-relaxed font-mono">
        <code className="text-[#e0e0e0]">{code}</code>
      </pre>
    </div>
  );
}
