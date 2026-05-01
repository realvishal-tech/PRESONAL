"use client";

import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { fallbackAbout } from "@/data/fallback";
import { fetchCollection, setDocument } from "@/lib/firestore";

interface AboutDoc {
  id: string;
  headline: string;
  story: string;
  highlights: string[];
}

export const AboutManager = () => {
  const [about, setAbout] = useState<AboutDoc>({
    id: "main",
    headline: fallbackAbout.headline,
    story: fallbackAbout.story,
    highlights: fallbackAbout.highlights,
  });

  useEffect(() => {
    const loadAbout = async () => {
      const data = await fetchCollection<AboutDoc>("about");
      if (data.length) {
        setAbout({ ...data[0], id: data[0].id || "main" });
      }
    };
    loadAbout();
  }, []);

  const handleSave = async () => {
    try {
      await setDocument("about", about.id || "main", {
        headline: about.headline,
        story: about.story,
        highlights: about.highlights,
      });
      toast.success("About section updated");
    } catch {
      toast.error("Unable to update about section.");
    }
  };

  return (
    <div className="space-y-4 rounded-3xl border border-white/10 bg-white/5 p-6">
      <h2 className="text-lg font-semibold">About Section</h2>
      <input
        value={about.headline}
        onChange={(event) =>
          setAbout({ ...about, headline: event.target.value })
        }
        className="w-full rounded-2xl border border-white/10 bg-black/40 px-4 py-2 text-sm"
        placeholder="Headline"
      />
      <textarea
        value={about.story}
        onChange={(event) => setAbout({ ...about, story: event.target.value })}
        className="min-h-[120px] w-full rounded-2xl border border-white/10 bg-black/40 px-4 py-2 text-sm"
        placeholder="Story"
      />
      <input
        value={about.highlights.join(", ")}
        onChange={(event) =>
          setAbout({
            ...about,
            highlights: event.target.value
              .split(",")
              .map((item) => item.trim()),
          })
        }
        className="w-full rounded-2xl border border-white/10 bg-black/40 px-4 py-2 text-sm"
        placeholder="Highlights (comma separated)"
      />
      <button
        type="button"
        onClick={handleSave}
        className="rounded-full bg-cyan-500/20 px-4 py-2 text-sm"
      >
        Save About Section
      </button>
    </div>
  );
};
