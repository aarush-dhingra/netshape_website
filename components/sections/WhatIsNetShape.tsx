"use client";

import { motion } from "framer-motion";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Shield, Cpu, Globe, Zap } from "lucide-react";

const advantages = [
  {
    icon: Shield,
    title: "Proxy-based approach",
    description:
      "NetShape runs a local HTTP/SOCKS5 forward proxy that your app routes traffic through. No MITM, no certificate installation — HTTPS is tunneled transparently via CONNECT.",
  },
  {
    icon: Zap,
    title: "Process death = auto-revert",
    description:
      "When the proxy process exits, your network reverts instantly. No lingering OS rules, no cleanup commands, no safety concerns. Crash-safe by design.",
  },
  {
    icon: Cpu,
    title: "Zero admin privileges",
    description:
      "Everything runs in userspace. No sudo, no administrator prompts, no security policy exceptions. Works on locked-down corporate machines without IT approval.",
  },
  {
    icon: Globe,
    title: "Cross-platform from day one",
    description:
      "Identical experience on macOS, Windows, and Linux. No platform-specific backends, no native binaries, no compatibility matrix. One Python package everywhere.",
  },
];

export function WhatIsNetShape() {
  return (
    <section id="what-is-netshape" className="max-w-6xl mx-auto px-6 py-24">
      <SectionHeading
        title="What is NetShape?"
        subtitle="A local throttling proxy that lets developers test desktop apps under degraded network conditions — no OS-level rules, no admin required."
      />

      <div className="grid md:grid-cols-2 gap-8 mb-16">
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5 }}
          className="space-y-6"
        >
          <p className="text-gray-300 font-sans leading-relaxed">
            You type <code className="text-accent-green bg-terminal-surface px-1.5 py-0.5 rounded font-mono text-sm">netshape run --profile 3g -- your-app</code>{" "}
            and NetShape launches your app inside a simulated network environment. Every HTTP request,
            every WebSocket connection, every API call — all go through the throttling proxy.
          </p>
          <p className="text-gray-400 font-sans leading-relaxed">
            Open another terminal and run{" "}
            <code className="text-accent-green bg-terminal-surface px-1.5 py-0.5 rounded font-mono text-sm">netshape adjust --latency 500ms</code>{" "}
            — changes take effect instantly. No restart, no rebuild, no waiting.
          </p>
          <p className="text-gray-400 font-sans leading-relaxed">
            When your app exits or you press Ctrl-C, the proxy dies. Your network reverts
            immediately. Nothing lingers. No cleanup needed.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="bg-terminal-surface border border-terminal-border rounded-lg p-6 font-mono text-sm space-y-4"
        >
          <div className="flex items-center gap-3 pb-4 border-b border-terminal-border">
            <div className="w-8 h-8 rounded bg-accent-green/10 flex items-center justify-center">
              <span className="text-accent-green text-xs">◈</span>
            </div>
            <div>
              <div className="text-white">NetShape Proxy</div>
              <div className="text-gray-500 text-xs">127.0.0.1:8090</div>
            </div>
          </div>

          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <span className="text-accent-green text-xs">→</span>
              <span className="text-gray-300">Token Bucket (bandwidth)</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-accent-amber text-xs">⏱</span>
              <span className="text-gray-300">Delay (latency + jitter)</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-accent-red text-xs">✕</span>
              <span className="text-gray-300">Random drop (packet loss)</span>
            </div>
          </div>

          <div className="pt-4 border-t border-terminal-border">
            <div className="flex items-center gap-3">
              <div className="flex-1 text-center py-2 rounded bg-terminal-dim text-gray-400 text-xs">
                App
              </div>
              <div className="text-accent-green text-xs">⇄</div>
              <div className="flex-1 text-center py-2 rounded bg-terminal-dim text-gray-400 text-xs">
                Internet
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.5 }}
      >
        <h3 className="font-sans text-xl font-bold text-white mb-8 text-center">
          Why proxy over OS-level rules?
        </h3>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {advantages.map((item) => (
            <div
              key={item.title}
              className="p-5 rounded-lg border border-terminal-border bg-terminal-surface hover:border-accent-green/30 transition-colors group"
            >
              <item.icon size={24} className="text-accent-green mb-3 group-hover:scale-110 transition-transform" />
              <h4 className="font-sans font-semibold text-white mb-2 text-sm">{item.title}</h4>
              <p className="text-gray-400 text-sm font-sans leading-relaxed">{item.description}</p>
            </div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
