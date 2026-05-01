"use client";

import { useEffect, useRef, useState } from "react";
import { Music2 } from "lucide-react";

export const MusicToggle = () => {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    audioRef.current = new Audio("/audio/neon-wave.wav");
    audioRef.current.loop = true;
    audioRef.current.volume = 0.4;

    return () => {
      audioRef.current?.pause();
      audioRef.current = null;
    };
  }, []);

  const toggleAudio = async () => {
    if (!audioRef.current) {
      return;
    }
    if (enabled) {
      audioRef.current.pause();
      setEnabled(false);
    } else {
      await audioRef.current.play();
      setEnabled(true);
    }
  };

  return (
    <button
      type="button"
      onClick={toggleAudio}
      className={`fixed bottom-8 right-8 z-[70] flex h-12 w-12 items-center justify-center rounded-full border border-white/10 bg-white/5 text-cyan-200 shadow-lg backdrop-blur transition ${
        enabled ? "shadow-[0_0_30px_rgba(34,211,238,0.6)]" : ""
      }`}
      aria-label="Toggle background music"
    >
      <Music2 size={18} />
    </button>
  );
};
