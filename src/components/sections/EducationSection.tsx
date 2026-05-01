"use client";

import { motion } from "framer-motion";
import { SectionHeader } from "../shared/SectionHeader";

const timeline = [
  {
    title: "L.N.D College",
    subtitle: "BCA — 1st Year",
    date: "2025 - Present",
    description: "Building strong foundations in computer applications.",
  },
];

export const EducationSection = () => (
  <section id="education" className="py-20">
    <div className="mx-auto max-w-6xl px-6">
      <SectionHeader
        title="Education Timeline"
        subtitle="Learning Path"
      />
      <div className="mt-10 space-y-6">
        {timeline.map((item, index) => (
          <motion.div
            key={item.title}
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
            className="relative rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur"
          >
            <div className="absolute -left-3 top-6 h-3 w-3 rounded-full bg-cyan-400 shadow-[0_0_20px_rgba(56,189,248,0.8)]" />
            <p className="text-xs uppercase tracking-[0.35em] text-cyan-300/70">
              {item.date}
            </p>
            <h3 className="mt-2 text-xl font-semibold text-white">
              {item.title}
            </h3>
            <p className="text-sm text-white/70">{item.subtitle}</p>
            <p className="mt-3 text-sm text-white/60">{item.description}</p>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);
