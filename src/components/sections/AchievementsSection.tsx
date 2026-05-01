"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { fallbackStats } from "@/data/fallback";
import { SectionHeader } from "../shared/SectionHeader";

const useCounter = (target: number) => {
  const [value, setValue] = useState(0);

  useEffect(() => {
    let start = 0;
    const step = Math.max(1, Math.round(target / 60));
    const interval = setInterval(() => {
      start += step;
      if (start >= target) {
        setValue(target);
        clearInterval(interval);
      } else {
        setValue(start);
      }
    }, 20);
    return () => clearInterval(interval);
  }, [target]);

  return value;
};

export const AchievementsSection = () => {
  const projects = useCounter(fallbackStats.projects);
  const skills = useCounter(fallbackStats.skills);
  const hours = useCounter(fallbackStats.learningHours);

  return (
    <section id="achievements" className="py-20">
      <div className="mx-auto max-w-6xl px-6">
        <SectionHeader
          title="Achievements & Stats"
          subtitle="Momentum"
        />
        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {[
            { label: "Projects Built", value: projects },
            { label: "Skills Gained", value: skills },
            { label: "Learning Hours", value: hours },
          ].map((item) => (
            <div
              key={item.label}
              className="rounded-3xl border border-white/10 bg-white/5 p-6 text-center backdrop-blur"
            >
              <p className="text-3xl font-semibold text-white">{item.value}+</p>
              <p className="mt-2 text-xs uppercase tracking-[0.3em] text-cyan-300/70">
                {item.label}
              </p>
            </div>
          ))}
        </div>
        <div className="mt-10 grid gap-6 lg:grid-cols-2">
          <div className="rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur">
            <p className="text-sm uppercase tracking-[0.35em] text-cyan-300/70">
              GitHub Activity
            </p>
            <div className="mt-4">
              <Image
                src="https://github-readme-stats.vercel.app/api?username=realvishal-tech&show_icons=true&theme=transparent"
                alt="GitHub stats"
                width={500}
                height={200}
                className="h-auto w-full"
                unoptimized
              />
            </div>
          </div>
          <div className="rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur">
            <p className="text-sm uppercase tracking-[0.35em] text-cyan-300/70">
              Top Languages
            </p>
            <div className="mt-4">
              <Image
                src="https://github-readme-stats.vercel.app/api/top-langs/?username=realvishal-tech&layout=compact&theme=transparent"
                alt="Top languages"
                width={500}
                height={200}
                className="h-auto w-full"
                unoptimized
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
