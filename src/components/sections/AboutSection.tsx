"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { fallbackAbout } from "@/data/fallback";
import { fetchCollection } from "@/lib/firestore";
import { useEffect, useState } from "react";
import { GlowCard } from "../shared/GlowCard";
import { SectionHeader } from "../shared/SectionHeader";

interface AboutDoc {
  id: string;
  headline: string;
  story: string;
  highlights: string[];
}

export const AboutSection = () => {
  const [about, setAbout] = useState<AboutDoc>(fallbackAbout);

  useEffect(() => {
    const loadAbout = async () => {
      const data = await fetchCollection<AboutDoc>("about");
      if (data.length) {
        setAbout(data[0]);
      }
    };
    loadAbout();
  }, []);

  return (
    <section id="about" className="py-20">
      <div className="mx-auto max-w-6xl px-6">
        <SectionHeader
          title="About Me"
          subtitle="My Journey"
        />
        <div className="mt-10 grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="space-y-6 text-white/70"
          >
            <p className="text-lg text-white">{about.headline}</p>
            <p>{about.story}</p>
            <div className="grid gap-4 sm:grid-cols-3">
              {(about.highlights?.length
                ? about.highlights
                : fallbackAbout.highlights
              ).map((item) => (
                <GlowCard key={item} className="p-4 text-sm">
                  {item}
                </GlowCard>
              ))}
            </div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative"
          >
            <div className="absolute -top-6 right-6 h-24 w-24 rounded-full bg-cyan-400/20 blur-2xl" />
            <Image
              src="https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=700&q=80"
              alt="Vishal coding"
              width={520}
              height={620}
              className="rounded-[2rem] border border-white/20 object-cover shadow-[0_30px_60px_rgba(0,0,0,0.5)]"
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
};
