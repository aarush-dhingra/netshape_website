import { type ReactNode } from "react";

interface TerminalFrameProps {
  title?: string;
  children: ReactNode;
  className?: string;
}

export function TerminalFrame({
  title = "terminal",
  children,
  className = "",
}: TerminalFrameProps) {
  return (
    <div
      className={`rounded-lg border border-terminal-border bg-[#0d0d0d] overflow-hidden ${className}`}
    >
      <div className="flex items-center gap-2 px-4 py-2.5 border-b border-terminal-border bg-[#0a0a0a]">
        <div className="flex gap-1.5">
          <span className="w-3 h-3 rounded-full bg-red-500/80" />
          <span className="w-3 h-3 rounded-full bg-amber-500/80" />
          <span className="w-3 h-3 rounded-full bg-green-500/80" />
        </div>
        <span className="text-xs text-gray-500 font-mono ml-2 select-none">
          {title}
        </span>
      </div>
      <div className="p-4 font-mono text-sm leading-relaxed">{children}</div>
    </div>
  );
}
