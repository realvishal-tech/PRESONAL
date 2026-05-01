"use client";

import { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import {
  fallbackProjects,
  projectCategories,
} from "@/data/fallback";
import { fetchCollection, recordAnalytics } from "@/lib/firestore";
import { GlowCard } from "../shared/GlowCard";
import { SectionHeader } from "../shared/SectionHeader";

interface Project {
  id: string;
  title: string;
  description: string;
  image: string;
  stack: string[];
  category: string;
  liveUrl: string;
}

export const ProjectsSection = () => {
  const [projects, setProjects] = useState<Project[]>(fallbackProjects);
  const [activeCategory, setActiveCategory] = useState("All");

  useEffect(() => {
    const loadProjects = async () => {
      const data = await fetchCollection<Project>("projects");
      if (data.length) {
        setProjects(data);
      }
    };
    loadProjects();
  }, []);

  const filteredProjects = useMemo(() => {
    if (activeCategory === "All") {
      return projects;
    }
    return projects.filter((project) => project.category === activeCategory);
  }, [projects, activeCategory]);

  return (
    <section id="projects" className="py-20">
      <div className="mx-auto max-w-6xl px-6">
        <SectionHeader
          title="Featured Projects"
          subtitle="Dynamic Builds"
          action={
            <div className="flex flex-wrap gap-2">
              {projectCategories.map((category) => (
                <button
                  key={category}
                  type="button"
                  onClick={() => setActiveCategory(category)}
                  className={`rounded-full border px-4 py-2 text-xs uppercase tracking-[0.25em] transition ${
                    activeCategory === category
                      ? "border-cyan-300 text-cyan-200"
                      : "border-white/10 text-white/50"
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          }
        />
        <div className="mt-10 grid gap-6 lg:grid-cols-3">
          {filteredProjects.map((project) => (
            <GlowCard key={project.id} className="space-y-4">
              <div className="relative h-44 overflow-hidden rounded-2xl border border-white/10">
                <Image
                  src={project.image}
                  alt={project.title}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="space-y-3">
                <h3 className="text-lg font-semibold text-white">
                  {project.title}
                </h3>
                <p className="text-sm text-white/70">{project.description}</p>
                <div className="flex flex-wrap gap-2 text-xs text-cyan-200/80">
                  {project.stack.map((item) => (
                    <span
                      key={item}
                      className="rounded-full border border-white/10 px-3 py-1"
                    >
                      {item}
                    </span>
                  ))}
                </div>
                <motion.a
                  whileHover={{ scale: 1.03 }}
                  href={project.liveUrl}
                  target="_blank"
                  rel="noreferrer"
                  onClick={() => recordAnalytics("clicks", 1)}
                  className="inline-flex items-center justify-center rounded-full border border-cyan-300/40 px-4 py-2 text-xs font-semibold uppercase tracking-[0.25em] text-cyan-200"
                >
                  Live Preview
                </motion.a>
              </div>
            </GlowCard>
          ))}
        </div>
      </div>
    </section>
  );
};
