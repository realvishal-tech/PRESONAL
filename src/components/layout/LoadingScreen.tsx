"use client";

import { useEffect, useState } from "react";

export const LoadingScreen = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1400);
    return () => clearTimeout(timer);
  }, []);

  if (!loading) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-[80] flex items-center justify-center bg-black/90">
      <div className="flex flex-col items-center gap-4">
        <div className="h-16 w-16 animate-spin rounded-full border-4 border-cyan-400/60 border-t-transparent" />
        <p className="text-sm uppercase tracking-[0.35em] text-cyan-200">
          Booting Vishal&apos;s Portfolio
        </p>
      </div>
    </div>
  );
};
