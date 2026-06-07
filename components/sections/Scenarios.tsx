"use client";

import { motion } from "framer-motion";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { TerminalFrame } from "@/components/ui/TerminalFrame";
import { CodeBlock } from "@/components/ui/CodeBlock";
import { Badge } from "@/components/ui/Badge";

const scenarios = [
  {
    name: "Subway Commute",
    emoji: "🚇",
    description:
      "Urban transit simulation. Platform 4G → tunnel dead zone → 2G re-emergence. 5 phases over 2 minutes.",
    yaml: `name: "Subway Commute"
phases:
  - name: "Platform — 4G"
    duration: "30s"
    profile: "4g"
  - name: "Entering Tunnel"
    duration: "8s"
    bandwidth: "2mbps"
    latency: "300ms"
  - name: "Tunnel — Dead Zone"
    duration: "20s"
    profile: "offline"
  - name: "Emerging — 2G"
    duration: "20s"
    profile: "edge"
  - name: "Reconnected — 4G"
    duration: "30s"
    profile: "4g"`,
  },
  {
    name: "Flight Mode",
    emoji: "✈️",
    description:
      "Airport Wi-Fi → in-flight high latency → offline → landing. Perfect for testing offline-first apps.",
    yaml: `name: "Flight Mode"
phases:
  - name: "Airport Wi-Fi"
    duration: "20s"
    profile: "wifi"
  - name: "Boarding"
    duration: "15s"
    bandwidth: "5mbps"
    latency: "400ms"
  - name: "In Flight — Offline"
    duration: "40s"
    profile: "offline"
  - name: "Landing — 4G"
    duration: "20s"
    profile: "4g"`,
  },
  {
    name: "Coffee Shop Wi-Fi",
    emoji: "☕",
    description:
      "Quiet morning → lunch rush congestion → packet-loss misery → recovery. Tests degradation tolerance.",
    yaml: `name: "Coffee Shop Wi-Fi"
phases:
  - name: "Quiet Morning"
    duration: "15s"
    profile: "wifi"
  - name: "Lunch Rush"
    duration: "25s"
    profile: "congested"
  - name: "Packet-Loss Hell"
    duration: "15s"
    bandwidth: "1mbps"
    loss: "8%"
    latency: "300ms"
  - name: "Recovery"
    duration: "15s"
    profile: "wifi"`,
  },
  {
    name: "Satellite Link",
    emoji: "🛰️",
    description:
      "Clear sky → cloud cover → rain fade → outage → restoration. Real geostationary link behavior.",
    yaml: `name: "Satellite Link"
phases:
  - name: "Clear Sky"
    duration: "15s"
    profile: "satellite"
  - name: "Cloud Cover"
    duration: "20s"
    bandwidth: "8mbps"
    latency: "800ms"
    loss: "1%"
  - name: "Rain Fade"
    duration: "20s"
    loss: "8%"
    bandwidth: "500kbps"
  - name: "Outage"
    duration: "10s"
    profile: "offline"
  - name: "Restored"
    duration: "15s"
    profile: "satellite"`,
  },
];

export function Scenarios() {
  return (
    <section id="scenarios" className="max-w-6xl mx-auto px-6 py-24">
      <SectionHeading
        title="Scenario Scripting"
        subtitle="Simulate dynamic network conditions over time. YAML-based, live-updated, auto-restored on completion."
      />

      <div className="grid md:grid-cols-2 gap-6">
        {scenarios.map((scenario, i) => (
          <motion.div
            key={scenario.name}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.4, delay: i * 0.1 }}
          >
            <TerminalFrame title={`scenario — ${scenario.name.toLowerCase().replace(/\s+/g, "-")}.yaml`}>
              <div className="space-y-3 not-mono">
                <div className="flex items-center gap-2">
                  <span className="text-xl">{scenario.emoji}</span>
                  <h3 className="font-sans font-semibold text-white">{scenario.name}</h3>
                  <Badge text="built-in" variant="cyan" />
                </div>
                <p className="text-gray-400 text-sm font-sans leading-relaxed">
                  {scenario.description}
                </p>
              </div>
              <div className="mt-4">
                <CodeBlock
                  code={scenario.yaml}
                  language="yaml"
                  showCopy={false}
                  className="text-xs"
                />
              </div>
            </TerminalFrame>
          </motion.div>
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 0.4, delay: 0.2 }}
        className="mt-6"
      >
        <CodeBlock
          code={`# Run a built-in scenario
netshape scenario run --builtin subway

# Run a custom YAML file
netshape scenario run ./my-scenario.yaml

# Start in background
netshape scenario run --builtin satellite --no-wait

# Stop and restore pre-scenario config
netshape scenario stop`}
          language="bash"
        />
      </motion.div>
    </section>
  );
}
