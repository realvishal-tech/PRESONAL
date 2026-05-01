"use client";

import { useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";
import { fallbackBlogs } from "@/data/fallback";
import { fetchCollection } from "@/lib/firestore";
import { GlowCard } from "../shared/GlowCard";
import { SectionHeader } from "../shared/SectionHeader";

interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  tag: string;
  createdAt: string | { toDate?: () => Date };
}

export const BlogSection = () => {
  const [posts, setPosts] = useState<BlogPost[]>(fallbackBlogs);

  useEffect(() => {
    const loadPosts = async () => {
      const data = await fetchCollection<BlogPost>("blogs");
      if (data.length) {
        setPosts(data);
      }
    };
    loadPosts();
  }, []);

  return (
    <section id="blog" className="py-20">
      <div className="mx-auto max-w-6xl px-6">
        <SectionHeader
          title="Blog & Learning"
          subtitle="Coding Journal"
        />
        <div className="mt-10 grid gap-6 lg:grid-cols-2">
          {posts.map((post) => {
            const dateLabel =
              typeof post.createdAt === "string"
                ? post.createdAt
                : post.createdAt?.toDate?.().toISOString().slice(0, 10) || "";

            return (
              <GlowCard key={post.id} className="space-y-4">
                <div className="flex items-center justify-between text-xs uppercase tracking-[0.3em] text-cyan-300/70">
                  <span>{post.tag}</span>
                  <span>{dateLabel}</span>
                </div>
                <h3 className="text-xl font-semibold text-white">
                  {post.title}
                </h3>
                <p className="text-sm text-white/70">{post.excerpt}</p>
                <div className="rounded-2xl border border-white/10 bg-black/40 p-4 text-sm text-white/70">
                  <ReactMarkdown>{post.content}</ReactMarkdown>
                </div>
              </GlowCard>
            );
          })}
        </div>
      </div>
    </section>
  );
};
