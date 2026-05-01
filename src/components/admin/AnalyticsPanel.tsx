"use client";

import { useEffect, useState } from "react";
import { fetchCollection } from "@/lib/firestore";

interface AnalyticsDoc {
  id: string;
  visitors?: number;
  clicks?: number;
  interactions?: number;
}

export const AnalyticsPanel = () => {
  const [metrics, setMetrics] = useState<AnalyticsDoc>({
    id: "metrics",
    visitors: 0,
    clicks: 0,
    interactions: 0,
  });

  useEffect(() => {
    const loadAnalytics = async () => {
      const data = await fetchCollection<AnalyticsDoc>("analytics");
      if (data.length) {
        setMetrics(data[0]);
      }
    };
    loadAnalytics();
  }, []);

  return (
    <div className="space-y-6 rounded-3xl border border-white/10 bg-white/5 p-6">
      <h2 className="text-lg font-semibold">Dashboard Analytics</h2>
      <div className="grid gap-4 md:grid-cols-3">
        {[
          { label: "Visitors", value: metrics.visitors ?? 0 },
          { label: "Clicks", value: metrics.clicks ?? 0 },
          { label: "Interactions", value: metrics.interactions ?? 0 },
        ].map((item) => (
          <div
            key={item.label}
            className="rounded-2xl border border-white/10 bg-black/40 px-4 py-3 text-sm"
          >
            <p className="text-xs uppercase tracking-[0.3em] text-cyan-300/70">
              {item.label}
            </p>
            <p className="mt-2 text-xl font-semibold text-white">
              {item.value}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};
