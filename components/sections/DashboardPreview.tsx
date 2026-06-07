"use client";

import { motion } from "framer-motion";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { TerminalFrame } from "@/components/ui/TerminalFrame";
import { Activity, ArrowDown, ArrowUp, Wifi, Gauge } from "lucide-react";

export function DashboardPreview() {
  return (
    <section id="dashboard" className="max-w-6xl mx-auto px-4 sm:px-6 py-16 sm:py-24">
      <SectionHeading
        title="Web Dashboard"
        subtitle="Live visual controls built into the proxy. Open localhost:8091 in your browser while a session is active."
      />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.5 }}
      >
        <TerminalFrame title="dashboard — http://127.0.0.1:8091/dashboard">
          <div className="space-y-4 not-mono">
            <div className="flex items-center gap-2 px-3 py-2 rounded bg-accent-amber/10 border border-accent-amber/20">
              <Activity size={16} className="text-accent-amber" />
              <span className="text-accent-amber font-sans text-sm font-semibold">SLOW</span>
              <span className="text-gray-500 font-mono text-xs">· 780 kbps · 200ms · 1% loss</span>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1">
                <span className="text-gray-500 font-sans text-xs">Download</span>
                <div className="flex items-end gap-1">
                  <ArrowDown size={14} className="text-accent-green" />
                  <span className="text-white font-mono text-lg">384</span>
                  <span className="text-gray-500 font-mono text-xs mb-0.5">kbps</span>
                </div>
              </div>
              <div className="space-y-1">
                <span className="text-gray-500 font-sans text-xs">Upload</span>
                <div className="flex items-end gap-1">
                  <ArrowUp size={14} className="text-accent-cyan" />
                  <span className="text-white font-mono text-lg">42</span>
                  <span className="text-gray-500 font-mono text-xs mb-0.5">kbps</span>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1">
                <span className="text-gray-500 font-sans text-xs">Throughput</span>
                <div className="h-16 flex items-end gap-0.5">
                  {[40, 65, 35, 80, 45, 70, 55, 90, 30, 60, 75, 50, 85, 40, 70, 55, 65, 80, 45, 60].map(
                    (h, i) => (
                      <div
                        key={i}
                        className="flex-1 bg-accent-green/60 rounded-t-sm"
                        style={{ height: `${h}%` }}
                      />
                    ),
                  )}
                </div>
              </div>
              <div className="space-y-1">
                <span className="text-gray-500 font-sans text-xs">Latency</span>
                <div className="h-16 flex items-end gap-0.5">
                  {[60, 55, 70, 45, 65, 50, 80, 55, 60, 45, 50, 65, 55, 70, 50, 60, 45, 55, 65, 50].map(
                    (h, i) => (
                      <div
                        key={i}
                        className="flex-1 bg-accent-cyan/60 rounded-t-sm"
                        style={{ height: `${h}%` }}
                      />
                    ),
                  )}
                </div>
              </div>
            </div>

            <div className="border-t border-terminal-border pt-4 space-y-3">
              <div className="space-y-2 font-sans">
                <div className="flex items-center justify-between">
                  <span className="text-gray-400 text-xs">Bandwidth</span>
                  <span className="text-accent-green font-mono text-xs">780 kbps</span>
                </div>
                <div className="h-1.5 bg-terminal-dim rounded-full overflow-hidden">
                  <div className="h-full bg-accent-green w-[15%] rounded-full" />
                </div>
              </div>

              <div className="space-y-2 font-sans">
                <div className="flex items-center justify-between">
                  <span className="text-gray-400 text-xs">Latency</span>
                  <span className="text-accent-cyan font-mono text-xs">200 ms</span>
                </div>
                <div className="h-1.5 bg-terminal-dim rounded-full overflow-hidden">
                  <div className="h-full bg-accent-cyan w-[20%] rounded-full" />
                </div>
              </div>

              <div className="space-y-2 font-sans">
                <div className="flex items-center justify-between">
                  <span className="text-gray-400 text-xs">Packet Loss</span>
                  <span className="text-accent-amber font-mono text-xs">1%</span>
                </div>
                <div className="h-1.5 bg-terminal-dim rounded-full overflow-hidden">
                  <div className="h-full bg-accent-amber w-[5%] rounded-full" />
                </div>
              </div>

              <div className="flex items-center justify-between text-xs text-gray-500 pt-2 border-t border-terminal-border">
                <div className="flex items-center gap-1">
                  <Wifi size={12} className="text-green-400" />
                  <span>Connected</span>
                </div>
                <div className="flex items-center gap-1">
                  <Gauge size={12} />
                  <span className="font-mono">127.0.0.1:8090</span>
                </div>
              </div>
            </div>
          </div>
        </TerminalFrame>
      </motion.div>
    </section>
  );
}
