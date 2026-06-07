"use client";

import { CopyToClipboard } from "react-copy-to-clipboard";
import { useState } from "react";
import { motion } from "framer-motion";
import { Check, Copy, Star } from "lucide-react";

function GitHubIcon({ size = 18 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
    </svg>
  );
}
import { useTypewriter } from "@/hooks/useTypewriter";
import { HERO_LINES, TYPING_SPEED, PAUSE_BETWEEN, INSTALL_COMMAND } from "@/lib/data";

export function Hero() {
  const { displayedLines, isComplete } = useTypewriter(HERO_LINES, TYPING_SPEED, PAUSE_BETWEEN);
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section
      id="hero"
      className="min-h-[90vh] flex flex-col items-center justify-center px-6 pt-20 pb-16"
    >
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="max-w-4xl w-full text-center"
      >
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.1, duration: 0.5 }}
          className="font-mono text-accent-green text-sm mb-6"
        >
          $ pip install netshape
        </motion.p>

        <h1 className="font-sans text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight text-white leading-tight mb-6">
          Simulate any network.
          <br />
          <span className="text-accent-green">No admin</span>, no OS rules,
          <br />
          no friction.
        </h1>

        <p className="text-gray-400 text-lg md:text-xl font-sans max-w-2xl mx-auto mb-10">
          See how your desktop app behaves on 2G, satellite, congested networks —
          all from a single command. Cross-platform. Open source.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 mb-12">
          <div className="w-full sm:w-auto flex items-center bg-terminal-surface border border-terminal-border rounded-lg px-4 py-3 font-mono text-sm">
            <span className="text-accent-green mr-2">$</span>
            <span className="text-gray-300 flex-1 text-left">{INSTALL_COMMAND}</span>
            <CopyToClipboard text={INSTALL_COMMAND} onCopy={handleCopy}>
              <button
                className="ml-3 p-1.5 rounded text-gray-500 hover:text-white hover:bg-terminal-dim transition-colors"
                aria-label="Copy install command"
              >
                {copied ? <Check size={16} className="text-accent-green" /> : <Copy size={16} />}
              </button>
            </CopyToClipboard>
          </div>

          <a
            href="https://github.com/netshape/netshape"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-4 py-3 rounded-lg border border-terminal-border bg-terminal-surface text-gray-300 hover:text-white hover:border-gray-600 transition-colors font-sans text-sm"
          >
            <GitHubIcon size={18} />
            <span>View on GitHub</span>
            <Star size={14} className="text-accent-amber" />
          </a>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, duration: 0.6 }}
        className="w-full max-w-2xl"
      >
        <div className="rounded-lg border border-terminal-border bg-[#0d0d0d] overflow-hidden shadow-2xl shadow-accent-green/5">
          <div className="flex items-center gap-2 px-4 py-2.5 border-b border-terminal-border bg-[#0a0a0a]">
            <div className="flex gap-1.5">
              <span className="w-3 h-3 rounded-full bg-red-500/80" />
              <span className="w-3 h-3 rounded-full bg-amber-500/80" />
              <span className="w-3 h-3 rounded-full bg-green-500/80" />
            </div>
            <span className="text-xs text-gray-500 font-mono ml-2 select-none">
              terminal — zsh
            </span>
          </div>
          <div className="p-5 font-mono text-sm leading-relaxed min-h-[100px]">
            {displayedLines.map((line, i) => (
              <div key={i} className="text-[#e0e0e0]">
                {line}
                {i === displayedLines.length - 1 && !isComplete && (
                  <span className="inline-block w-2 h-4 bg-accent-green ml-0.5 animate-blink align-middle" />
                )}
              </div>
            ))}
            {displayedLines.length === 0 && (
              <span className="inline-block w-2 h-4 bg-accent-green animate-blink align-middle" />
            )}
          </div>
        </div>
      </motion.div>
    </section>
  );
}
