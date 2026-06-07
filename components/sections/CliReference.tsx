"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import clsx from "clsx";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { CodeBlock } from "@/components/ui/CodeBlock";

interface CommandOption {
  flag: string;
  description: string;
}

interface Command {
  name: string;
  description: string;
  options?: CommandOption[];
  examples: string[];
}

interface CommandGroup {
  title: string;
  commands: Command[];
}

const groups: CommandGroup[] = [
  {
    title: "Session",
    commands: [
      {
        name: "netshape run",
        description: "Start a new proxy session and launch a command inside it.",
        options: [
          { flag: "--profile, -p", description: "Built-in profile name (e.g. 3g, satellite)" },
          { flag: "--bandwidth, -b", description: "Bandwidth cap (1mbps, 500kbps)" },
          { flag: "--latency, -l", description: "Added latency per connection (200ms)" },
          { flag: "--loss", description: "Packet loss rate (5%, 0.05)" },
          { flag: "--jitter, -j", description: "Latency jitter (50ms)" },
          { flag: "--timeout, -t", description: "Auto-stop after duration (30m, 1h)" },
          { flag: "--port", description: "Traffic proxy port (default: 8090)" },
          { flag: "--log-file", description: "Write rotating JSON log lines to file" },
        ],
        examples: [
          "netshape run --profile 3g -- your-app",
          "netshape run --bandwidth 1mbps --latency 300ms -- curl http://example.com",
        ],
      },
      {
        name: "netshape adjust",
        description: "Change throttle settings on the currently running session.",
        options: [
          { flag: "--profile, -p", description: "Switch to a named profile" },
          { flag: "--bandwidth, -b", description: "New bandwidth cap" },
          { flag: "--latency, -l", description: "New latency" },
          { flag: "--loss", description: "New loss rate" },
          { flag: "--jitter, -j", description: "New jitter" },
        ],
        examples: [
          "netshape adjust --latency 500ms",
          "netshape adjust --profile satellite",
          "netshape adjust --bandwidth 0 --latency 0 --loss 0",
        ],
      },
      {
        name: "netshape status",
        description: "Show the active NetShape session status.",
        options: [
          { flag: "--json", description: "Print raw JSON payload" },
          { flag: "--watch, -w", description: "Refresh every second in a live table" },
        ],
        examples: ["netshape status", "netshape status --watch"],
      },
      {
        name: "netshape stop",
        description: "Stop the currently running proxy session. Restores network to normal.",
        examples: ["netshape stop"],
      },
    ],
  },
  {
    title: "Rules",
    commands: [
      {
        name: "netshape rule add",
        description: "Add a per-endpoint throttle rule with regex pattern matching.",
        options: [
          { flag: "--bandwidth, -b", description: "Bandwidth cap for matching connections" },
          { flag: "--latency, -l", description: "Latency for matching connections" },
          { flag: "--loss", description: "Packet loss for matching connections" },
          { flag: "--jitter, -j", description: "Jitter for matching connections" },
          { flag: "--comment, -c", description: "Human-readable label" },
        ],
        examples: [
          'netshape rule add "stripe\\.com" --bandwidth 1mbps --latency 200ms',
          'netshape rule add "api\\." --loss 5% --comment "flaky API"',
        ],
      },
      {
        name: "netshape rule list",
        description: "List all active throttle rules with their IDs and parameters.",
        options: [{ flag: "--json", description: "Print raw JSON" }],
        examples: ["netshape rule list", "netshape rule list --json"],
      },
      {
        name: "netshape rule remove",
        description: "Remove a rule by its UUID or unambiguous prefix (first 8 chars).",
        examples: ['netshape rule remove ab12cd34', 'netshape rule remove "payment API"'],
      },
      {
        name: "netshape rule enable / disable",
        description: "Enable or disable a per-endpoint throttle rule by id or comment.",
        examples: [
          'netshape rule enable "payment API"',
          'netshape rule disable ab12cd34',
        ],
      },
    ],
  },
  {
    title: "Scenarios",
    commands: [
      {
        name: "netshape scenario run",
        description: "Run a time-sequenced network condition scenario.",
        options: [
          { flag: "--builtin, -b", description: "Run a built-in scenario by name" },
          { flag: "--no-wait", description: "Submit and return immediately" },
        ],
        examples: [
          "netshape scenario run --builtin subway",
          "netshape scenario run my-scenario.yaml",
        ],
      },
      {
        name: "netshape scenario stop",
        description: "Stop the running scenario and restore pre-scenario config.",
        examples: ["netshape scenario stop"],
      },
      {
        name: "netshape scenario status",
        description: "Show current scenario phase and progress.",
        examples: ["netshape scenario status", "netshape scenario status --json"],
      },
      {
        name: "netshape scenario list",
        description: "List available built-in and user-saved scenarios.",
        examples: ["netshape scenario list"],
      },
    ],
  },
  {
    title: "Metrics & Testing",
    commands: [
      {
        name: "netshape metrics",
        description: "Print 12 tracked proxy metrics (bytes, connections, throttle, drops).",
        options: [{ flag: "--prometheus, -p", description: "Prometheus text format output" }],
        examples: ["netshape metrics", "netshape metrics --prometheus"],
      },
      {
        name: "netshape test",
        description: "Verify proxy traffic flow and measure throttle timing.",
        options: [
          { flag: "--profile, -p", description: "Profile to test (default: 3g)" },
          { flag: "--bytes", description: "Payload size to download (default: 64K)" },
        ],
        examples: ["netshape test --profile edge --bytes 131072"],
      },
      {
        name: "netshape profiles",
        description: "List all 12 built-in network profiles with parameters.",
        examples: ["netshape profiles"],
      },
      {
        name: "netshape setup",
        description: "Interactive setup wizard for first-time configuration.",
        examples: ["netshape setup"],
      },
    ],
  },
];

export function CliReference() {
  return (
    <section id="cli-reference" className="max-w-6xl mx-auto px-6 py-24">
      <SectionHeading
        title="CLI Reference"
        subtitle="Complete command reference. Every flag, every option, every example."
      />

      <div className="space-y-6">
        {groups.map((group, gi) => (
          <CommandGroupAccordion key={group.title} group={group} defaultOpen={gi === 0} index={gi} />
        ))}
      </div>
    </section>
  );
}

function CommandGroupAccordion({
  group,
  defaultOpen,
  index,
}: {
  group: CommandGroup;
  defaultOpen: boolean;
  index: number;
}) {
  const [open, setOpen] = useState(defaultOpen);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.4, delay: index * 0.08 }}
      className="border border-terminal-border rounded-lg overflow-hidden"
    >
      <button
        onClick={() => setOpen(!open)}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            setOpen(!open);
          }
        }}
        aria-expanded={open}
        className="w-full flex items-center justify-between px-5 py-4 bg-terminal-surface hover:bg-terminal-dim transition-colors text-left"
      >
        <h3 className="font-sans font-semibold text-white">{group.title}</h3>
        <ChevronDown
          size={18}
          className={clsx(
            "text-gray-400 transition-transform duration-200",
            open && "rotate-180",
          )}
        />
      </button>

      {open && (
        <div className="divide-y divide-terminal-border">
          {group.commands.map((cmd) => (
            <div key={cmd.name} className="p-5 space-y-3">
              <div>
                <h4 className="font-mono text-accent-green text-sm mb-1">{cmd.name}</h4>
                <p className="text-gray-400 text-sm font-sans">{cmd.description}</p>
              </div>

              {cmd.options && cmd.options.length > 0 && (
                <div className="grid sm:grid-cols-2 gap-2">
                  {cmd.options.map((opt) => (
                    <div key={opt.flag} className="flex gap-2 text-sm">
                      <code className="text-accent-cyan font-mono text-xs whitespace-nowrap">
                        {opt.flag}
                      </code>
                      <span className="text-gray-500 font-sans text-xs">{opt.description}</span>
                    </div>
                  ))}
                </div>
              )}

              {cmd.examples && cmd.examples.length > 0 && (
                <div className="space-y-1.5">
                  {cmd.examples.map((ex) => (
                    <CodeBlock key={ex} code={ex} language="bash" showCopy={false} />
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </motion.div>
  );
}
