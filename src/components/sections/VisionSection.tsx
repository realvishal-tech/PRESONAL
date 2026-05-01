"use client";

import { motion } from "framer-motion";
import { SectionHeader } from "../shared/SectionHeader";

export const VisionSection = () => (
  <section id="vision" className="py-20">
    <div className="mx-auto max-w-6xl px-6">
      <SectionHeader
        title="Future Vision"
        subtitle="What I'm Building"
      />
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="mt-10 rounded-3xl border border-white/10 bg-white/5 p-8 text-white/70 backdrop-blur"
      >
        <p className="text-lg text-white">
          Becoming a Full Stack Developer
        </p>
        <p className="mt-4">
          I’m focused on building scalable, impactful tech products that feel
          premium and solve real problems. Every day I’m improving my front-end
          craft, strengthening my backend fundamentals, and learning how to
          deliver production-ready experiences.
        </p>
      </motion.div>
    </div>
  </section>
);
