"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { fallbackSkills } from "@/data/fallback";
import { fetchCollection } from "@/lib/firestore";
import { GlowCard } from "../shared/GlowCard";
import { SectionHeader } from "../shared/SectionHeader";

interface Skill {
  id: string;
  name: string;
  level: number;
  category: string;
}

export const SkillsSection = () => {
  const [skills, setSkills] = useState<Skill[]>(fallbackSkills);

  useEffect(() => {
    const loadSkills = async () => {
      const data = await fetchCollection<Skill>("skills");
      if (data.length) {
        setSkills(data);
      }
    };
    loadSkills();
  }, []);

  return (
    <section id="skills" className="py-20">
      <div className="mx-auto max-w-6xl px-6">
        <SectionHeader
          title="Skills & Tech Stack"
          subtitle="Leveling Up"
        />
        <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {skills.map((skill) => (
            <GlowCard key={skill.id} className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-semibold text-white">
                    {skill.name}
                  </h3>
                  <p className="text-xs uppercase tracking-[0.3em] text-cyan-300/70">
                    {skill.category}
                  </p>
                </div>
                <span className="text-sm text-white/60">
                  {skill.level}%
                </span>
              </div>
              <div className="h-2 w-full rounded-full bg-white/10">
                <motion.div
                  initial={{ width: 0 }}
                  whileInView={{ width: `${skill.level}%` }}
                  viewport={{ once: true }}
                  transition={{ duration: 1 }}
                  className="h-2 rounded-full bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500"
                />
              </div>
            </GlowCard>
          ))}
        </div>
      </div>
    </section>
  );
};
