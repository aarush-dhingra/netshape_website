"use client";

import { useState } from "react";
import { Copy, Check } from "lucide-react";
import { CopyToClipboard } from "react-copy-to-clipboard";
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

  const handleCopy = () => {
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div
      className={clsx(
        "relative group rounded-lg bg-[#0d0d0d] border border-terminal-border overflow-hidden",
        className,
      )}
    >
      {showCopy && (
        <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity z-10">
          <CopyToClipboard text={code} onCopy={handleCopy}>
            <button
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
          </CopyToClipboard>
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
