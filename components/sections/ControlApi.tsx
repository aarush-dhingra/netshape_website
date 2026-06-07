"use client";

import { motion } from "framer-motion";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { CodeBlock } from "@/components/ui/CodeBlock";

const endpoints = [
  { method: "GET", path: "/status", desc: "Full session status + throttle config" },
  { method: "POST", path: "/configure", desc: "Update throttle settings live" },
  { method: "POST", path: "/shutdown", desc: "Gracefully shut down the proxy" },
  { method: "GET", path: "/metrics", desc: "Prometheus text exposition format" },
  { method: "GET", path: "/metrics?format=json", desc: "All 12 metrics as JSON" },
  { method: "GET", path: "/rules", desc: "List all per-endpoint throttle rules" },
  { method: "POST", path: "/rules", desc: "Add a new throttle rule" },
  { method: "DELETE", path: "/rules/{id}", desc: "Remove a rule by UUID" },
  { method: "GET", path: "/scenarios", desc: "List built-in scenario names" },
  { method: "POST", path: "/scenario/start", desc: "Start a built-in or custom scenario" },
  { method: "POST", path: "/scenario/stop", desc: "Stop running scenario, restore config" },
  { method: "GET", path: "/scenario/status", desc: "Current scenario phase and progress" },
  { method: "GET", path: "/events", desc: "Server-Sent Events stream (1 update/s)" },
  { method: "GET", path: "/logs", desc: "Last 200 proxy log lines as JSON" },
  { method: "GET", path: "/dashboard", desc: "Web dashboard HTML" },
];

const methodColors: Record<string, string> = {
  GET: "text-accent-green border-accent-green/30 bg-accent-green/5",
  POST: "text-accent-cyan border-accent-cyan/30 bg-accent-cyan/5",
  DELETE: "text-accent-red border-accent-red/30 bg-accent-red/5",
};

export function ControlApi() {
  return (
    <section id="control-api" className="max-w-6xl mx-auto px-4 sm:px-6 py-16 sm:py-24">
      <SectionHeading
        title="Control API"
        subtitle="REST API on port 8091 (127.0.0.1 only). Every endpoint returns JSON. No authentication needed — local-only access."
      />

      <div className="grid md:grid-cols-2 gap-8">
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5 }}
        >
          <div className="border border-terminal-border rounded-lg overflow-hidden">
            <div className="px-4 py-2.5 border-b border-terminal-border bg-terminal-surface">
              <span className="text-xs text-gray-500 font-mono">REST API — 127.0.0.1:8091</span>
            </div>
            <div className="divide-y divide-terminal-border/50">
              {endpoints.map((ep) => (
                <div
                  key={ep.path + ep.method}
                  className="px-4 py-3 flex items-start gap-3 hover:bg-terminal-surface/50 transition-colors"
                >
                  <span
                    className={`inline-flex px-2 py-0.5 rounded text-xs font-mono border ${methodColors[ep.method]}`}
                  >
                    {ep.method}
                  </span>
                  <div className="min-w-0">
                    <code className="text-white font-mono text-sm break-all">{ep.path}</code>
                    <p className="text-gray-500 text-xs font-sans mt-0.5">{ep.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="space-y-4"
        >
          <CodeBlock
            code={`# Get current session status
curl -s http://127.0.0.1:8091/status | python -m json.tool`}
            language="bash"
          />

          <CodeBlock
            code={`# Adjust throttle settings live
curl -s -X POST http://127.0.0.1:8091/configure \\
  -H "Content-Type: application/json" \\
  -d '{"bandwidth_bps": 2000000, "latency_ms": 100}'`}
            language="bash"
          />

          <CodeBlock
            code={`# Get Prometheus metrics
curl -s http://127.0.0.1:8091/metrics

# Or as JSON
curl -s "http://127.0.0.1:8091/metrics?format=json"`}
            language="bash"
          />

          <CodeBlock
            code={`# Start a built-in scenario
curl -s -X POST http://127.0.0.1:8091/scenario/start \\
  -H "Content-Type: application/json" \\
  -d '{"builtin": "subway"}'`}
            language="bash"
          />
        </motion.div>
      </div>
    </section>
  );
}
