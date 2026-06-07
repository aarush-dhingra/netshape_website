"use client";

import { motion } from "framer-motion";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Badge } from "@/components/ui/Badge";
import { TerminalFrame } from "@/components/ui/TerminalFrame";
import { PROFILES } from "@/lib/data";
import clsx from "clsx";

const tierColors: Record<string, string> = {
  good: "border-l-accent-green/60 bg-accent-green/[0.02]",
  ok: "border-l-accent-cyan/60 bg-accent-cyan/[0.02]",
  slow: "border-l-accent-amber/60 bg-accent-amber/[0.02]",
  dead: "border-l-accent-red/60 bg-accent-red/[0.02]",
};

const tierBadge: Record<string, { text: string; variant: "green" | "cyan" | "amber" | "gray" }> = {
  good: { text: "fast", variant: "green" },
  ok: { text: "ok", variant: "cyan" },
  slow: { text: "slow", variant: "amber" },
  dead: { text: "offline", variant: "gray" },
};

export function ProfilesTable() {
  return (
    <section id="profiles" className="max-w-6xl mx-auto px-6 py-24">
      <SectionHeading
        title="Built-in Profiles"
        subtitle="12 curated network presets — from 2G mobile to gigabit fiber. Every profile is a combination of bandwidth, latency, packet loss, and jitter."
      />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.5 }}
      >
        <TerminalFrame title="$ netshape profiles">
          {/* Desktop/tablet table */}
          <div className="hidden sm:block overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-terminal-dim text-left text-gray-500 font-mono text-xs">
                  <th className="py-3 px-4 font-normal">Profile</th>
                  <th className="py-3 px-4 font-normal">Bandwidth</th>
                  <th className="py-3 px-4 font-normal hidden md:table-cell">Latency</th>
                  <th className="py-3 px-4 font-normal hidden md:table-cell">Loss</th>
                  <th className="py-3 px-4 font-normal hidden lg:table-cell">Jitter</th>
                  <th className="py-3 px-4 font-normal">Description</th>
                  <th className="py-3 px-4 font-normal w-20"></th>
                </tr>
              </thead>
              <tbody className="font-mono">
                {PROFILES.map((profile) => (
                  <tr
                    key={profile.name}
                    className={clsx(
                      "border-b border-terminal-dim/50 border-l-2 transition-colors hover:bg-terminal-surface/50",
                      tierColors[profile.tier],
                    )}
                  >
                    <td className="py-3 px-4">
                      <span className="text-white font-semibold">{profile.name}</span>
                    </td>
                    <td className="py-3 px-4 text-gray-300">{profile.bandwidth}</td>
                    <td className="py-3 px-4 text-gray-400 hidden md:table-cell">
                      {profile.latency}
                    </td>
                    <td className="py-3 px-4 text-gray-400 hidden md:table-cell">
                      {profile.loss}
                    </td>
                    <td className="py-3 px-4 text-gray-400 hidden lg:table-cell">
                      {profile.jitter}
                    </td>
                    <td className="py-3 px-4 text-gray-500">{profile.description}</td>
                    <td className="py-3 px-4">
                      <Badge
                        text={tierBadge[profile.tier].text}
                        variant={tierBadge[profile.tier].variant}
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Mobile stacked cards */}
          <div className="sm:hidden divide-y divide-terminal-border/50">
            {PROFILES.map((profile) => (
              <div
                key={profile.name}
                className={clsx(
                  "p-4 border-l-2",
                  tierColors[profile.tier],
                )}
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="text-white font-semibold font-mono">{profile.name}</span>
                  <Badge
                    text={tierBadge[profile.tier].text}
                    variant={tierBadge[profile.tier].variant}
                  />
                </div>
                <div className="grid grid-cols-2 gap-x-4 gap-y-1 font-mono text-xs">
                  <span className="text-gray-500">Bandwidth</span>
                  <span className="text-gray-300 text-right">{profile.bandwidth}</span>
                  <span className="text-gray-500">Latency</span>
                  <span className="text-gray-400 text-right">{profile.latency}</span>
                  <span className="text-gray-500">Loss</span>
                  <span className="text-gray-400 text-right">{profile.loss}</span>
                  <span className="text-gray-500">Jitter</span>
                  <span className="text-gray-400 text-right">{profile.jitter}</span>
                </div>
                <p className="text-gray-500 text-xs font-sans mt-2">{profile.description}</p>
              </div>
            ))}
          </div>
        </TerminalFrame>
      </motion.div>
    </section>
  );
}
