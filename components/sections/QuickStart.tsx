"use client";

import { motion } from "framer-motion";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { TerminalFrame } from "@/components/ui/TerminalFrame";
import { CodeBlock } from "@/components/ui/CodeBlock";

const steps = [
  {
    number: "1",
    title: "Install",
    code: "pip install netshape",
    language: "bash",
  },
  {
    number: "2",
    title: "Run your app through the proxy",
    code: "# Start a session with 3G throttling\nnetshape run --profile 3g -- your-app\n\n# Or with custom settings\nnetshape run --bandwidth 500kbps --latency 300ms -- your-app",
    language: "bash",
  },
  {
    number: "3",
    title: "Adjust live in another terminal",
    code: "# Change bandwidth on the fly\nnetshape adjust --bandwidth 10mbps\n\n# Switch to a different profile\nnetshape adjust --profile satellite\n\n# Check status\nnetshape status\n\n# Stop when done\nnetshape stop",
    language: "bash",
  },
];

export function QuickStart() {
  return (
    <section id="quick-start" className="max-w-6xl mx-auto px-6 py-24">
      <SectionHeading
        title="Quick Start"
        subtitle="Get throttling in 30 seconds. No sign-up, no config files, no admin prompts."
      />

      <div className="space-y-8">
        {steps.map((step, i) => (
          <motion.div
            key={step.number}
            initial={{ opacity: 0, x: i % 2 === 0 ? -20 : 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.5, delay: i * 0.1 }}
            className="flex gap-6"
          >
            <div className="flex-shrink-0 w-10 h-10 rounded-full border border-accent-green/30 bg-accent-green/10 flex items-center justify-center font-mono text-accent-green font-bold">
              {step.number}
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="font-sans font-semibold text-white text-lg mb-3">{step.title}</h3>
              <CodeBlock code={step.code} language={step.language} />
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
