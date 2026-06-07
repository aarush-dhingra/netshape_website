"use client";

import { motion } from "framer-motion";
import { SectionHeading } from "@/components/ui/SectionHeading";
import {
  Antenna,
  SlidersHorizontal,
  Monitor,
  Regex,
  Play,
  BarChart3,
  Globe,
  Zap,
} from "lucide-react";
import { FEATURES } from "@/lib/data";

const iconMap: Record<string, React.ComponentType<{ size?: number; className?: string }>> = {
  Antenna,
  SlidersHorizontal,
  Monitor,
  Regex,
  Play,
  BarChart3,
  Globe,
  Zap,
};

export function FeaturesGrid() {
  return (
    <section id="features" className="max-w-6xl mx-auto px-4 sm:px-6 py-16 sm:py-24">
      <SectionHeading
        title="Features"
        subtitle="Everything you need to test app behavior under real-world network conditions."
      />

      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {FEATURES.map((feature, i) => {
          const Icon = iconMap[feature.icon];
          return (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.4, delay: i * 0.05 }}
              className="group p-5 rounded-lg border border-terminal-border bg-terminal-surface hover:border-accent-green/20 transition-all duration-300 hover:shadow-lg hover:shadow-accent-green/5"
            >
              {Icon && (
                <Icon
                  size={28}
                  className="text-accent-green mb-3 group-hover:scale-110 transition-transform"
                />
              )}
              <h3 className="font-sans font-semibold text-white mb-2 text-sm">
                {feature.title}
              </h3>
              <p className="text-gray-400 text-sm font-sans leading-relaxed">
                {feature.description}
              </p>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
