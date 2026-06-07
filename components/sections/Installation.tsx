"use client";

import { motion } from "framer-motion";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { CodeBlock } from "@/components/ui/CodeBlock";
import { Check } from "lucide-react";

const requirements = [
  "Python ≥ 3.10",
  "pip (comes with Python)",
  "No admin/sudo needed",
  "No native binaries",
  "No platform-specific backends",
];

export function Installation() {
  return (
    <section id="installation" className="max-w-6xl mx-auto px-6 py-24">
      <SectionHeading
        title="Installation"
        subtitle="One command. Zero dependencies beyond Python. Cross-platform."
      />

      <div className="grid md:grid-cols-2 gap-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5 }}
        >
          <CodeBlock code="pip install netshape" language="bash" />

          <div className="mt-6 space-y-4">
            <div>
              <h3 className="font-mono text-accent-green text-sm mb-2">
                Dev install (editable)
              </h3>
              <CodeBlock
                code={`git clone https://github.com/aarush-dhingra/netshape\ncd netshape\npip install -e ".[dev,scenarios]"`}
                language="bash"
                showCopy={false}
              />
            </div>

            <div>
              <h3 className="font-mono text-accent-green text-sm mb-2">
                Verify installation
              </h3>
              <CodeBlock
                code={`netshape --version\n# netshape 0.1.0`}
                language="bash"
                showCopy={false}
              />
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <div className="border border-terminal-border rounded-lg p-6 bg-terminal-surface">
            <h3 className="font-sans font-semibold text-white mb-4">Requirements</h3>
            <ul className="space-y-3">
              {requirements.map((req) => (
                <li key={req} className="flex items-start gap-3 text-sm font-sans">
                  <Check size={16} className="text-accent-green mt-0.5 flex-shrink-0" />
                  <span className="text-gray-300">{req}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="mt-6 border border-terminal-border rounded-lg p-6 bg-terminal-surface">
            <h3 className="font-sans font-semibold text-white mb-4">Optional extras</h3>
            <div className="space-y-3">
              <div>
                <code className="text-accent-cyan font-mono text-sm">
                  netshape[scenarios]
                </code>
                <p className="text-gray-400 text-sm font-sans mt-1">
                  Adds PyYAML for custom scenario files. Built-in scenarios work without it.
                </p>
              </div>
              <div>
                <code className="text-accent-cyan font-mono text-sm">netshape[dev]</code>
                <p className="text-gray-400 text-sm font-sans mt-1">
                  pytest, pytest-asyncio, bandit, pip-audit — for contributing.
                </p>
              </div>
              <div>
                <code className="text-accent-cyan font-mono text-sm">netshape[all]</code>
                <p className="text-gray-400 text-sm font-sans mt-1">
                  Everything above.
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
