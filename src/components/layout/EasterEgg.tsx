"use client";

import { useEffect } from "react";
import toast from "react-hot-toast";

const secret = "vishal";

export const EasterEgg = () => {
  useEffect(() => {
    let buffer = "";
    const handler = (event: KeyboardEvent) => {
      buffer = `${buffer}${event.key.toLowerCase()}`.slice(-secret.length);
      if (buffer === secret) {
        toast.success("✨ You discovered Vishal's hidden easter egg!", {
          icon: "🖤",
        });
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, []);

  return null;
};
