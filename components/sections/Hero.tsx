"use client";

import { useState, useCallback } from "react";
import { motion } from "framer-motion";
import { Check, Copy, Star } from "lucide-react";
import { GitHubIcon } from "@/components/ui/GitHubIcon";
import { TerminalFrame } from "@/components/ui/TerminalFrame";
import { useTypewriter } from "@/hooks/useTypewriter";
import { HERO_LINES, TYPING_SPEED, PAUSE_BETWEEN, INSTALL_COMMAND } from "@/lib/data";

export function Hero() {
  const { displayedLines, isComplete } = useTypewriter(HERO_LINES, TYPING_SPEED, PAUSE_BETWEEN);
  const [copied, setCopied] = useState(false);

  const handleCopy = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(INSTALL_COMMAND);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // clipboard API unavailable — silently ignore
    }
  }, []);

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
          See how your app behaves on 2G, satellite, congested networks —
          all from a single command. Cross-platform. Open source.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 mb-12">
          <div className="w-full sm:w-auto flex items-center bg-terminal-surface border border-terminal-border rounded-lg px-4 py-3 font-mono text-sm">
            <span className="text-accent-green mr-2">$</span>
            <span className="text-gray-300 flex-1 text-left">{INSTALL_COMMAND}</span>
            <button
              onClick={handleCopy}
              className="ml-3 p-1.5 rounded text-gray-500 hover:text-white hover:bg-terminal-dim transition-colors"
              aria-label="Copy install command"
            >
              {copied ? <Check size={16} className="text-accent-green" /> : <Copy size={16} />}
            </button>
          </div>

          <a
            href="https://github.com/aarush-dhingra/netshape"
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
        <TerminalFrame title="terminal — zsh" className="shadow-2xl shadow-accent-green/5">
          <div className="font-mono text-sm leading-relaxed min-h-[100px]">
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
        </TerminalFrame>
      </motion.div>
    </section>
  );
}
