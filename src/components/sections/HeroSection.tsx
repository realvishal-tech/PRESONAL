"use client";

import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { TypeAnimation } from "react-type-animation";
import { PrimaryButton } from "../shared/PrimaryButton";

export const HeroSection = () => {
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 300], [0, 60]);

  return (
    <section
      id="home"
      className="relative overflow-hidden pt-24 md:pt-32"
    >
      <div className="mx-auto flex max-w-6xl flex-col items-center gap-12 px-6 lg:flex-row">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-xl"
        >
          <p className="text-sm uppercase tracking-[0.35em] text-cyan-300/80">
            Futuristic Developer Portfolio
          </p>
          <h1 className="mt-6 text-4xl font-semibold leading-tight text-white md:text-5xl">
            Vishal – Aspiring Full Stack Developer
          </h1>
          <div className="mt-6 text-lg text-cyan-100/80">
            <TypeAnimation
              sequence={["Web Developer", 2000, "Learner", 2000, "Creator", 2000]}
              speed={50}
              repeat={Infinity}
            />
          </div>
          <p className="mt-6 text-base text-white/70">
            Building premium, product-level web experiences with bold design,
            precision, and performance.
          </p>
          <div className="mt-8 flex flex-wrap gap-4">
            <PrimaryButton href="#projects">Explore Projects</PrimaryButton>
            <a
              href="#contact"
              className="inline-flex items-center justify-center rounded-full border border-white/20 px-6 py-3 text-sm font-semibold text-white/80 transition hover:border-cyan-300"
            >
              Let&apos;s Collaborate
            </a>
          </div>
        </motion.div>
        <motion.div
          style={{ y }}
          className="relative flex w-full max-w-md items-center justify-center"
        >
          <div className="absolute -left-6 top-10 hidden h-28 w-28 rounded-3xl border border-white/20 bg-white/10 backdrop-blur lg:block" />
          <Image
            src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=900&q=80"
            alt="Vishal portrait"
            width={420}
            height={520}
            className="relative z-10 rounded-[2.5rem] border border-white/20 object-cover shadow-[0_40px_80px_rgba(0,0,0,0.45)]"
            priority
          />
          <Image
            src="https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=500&q=80"
            alt="Vishal side portrait"
            width={180}
            height={220}
            className="absolute -bottom-10 right-4 hidden rounded-3xl border border-white/20 object-cover shadow-[0_20px_40px_rgba(0,0,0,0.45)] md:block"
          />
          <div className="absolute -right-10 top-10 hidden w-40 rounded-3xl border border-white/20 bg-black/40 p-4 text-xs text-white/70 shadow-[0_20px_40px_rgba(0,0,0,0.45)] backdrop-blur md:block animate-float">
            <p className="text-[10px] uppercase tracking-[0.3em] text-cyan-200">
              Featured
            </p>
            <p className="mt-2 text-sm font-semibold text-white">
              VISHAL🖤
            </p>
            <p className="mt-1 text-[11px] text-white/60">
              Building the future of web experiences.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
