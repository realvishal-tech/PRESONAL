"use client";

import { useEffect, useState } from "react";

export const CustomCursor = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [active, setActive] = useState(false);

  useEffect(() => {
    const handleMove = (event: MouseEvent) => {
      setPosition({ x: event.clientX, y: event.clientY });
    };
    const handleDown = () => setActive(true);
    const handleUp = () => setActive(false);

    window.addEventListener("mousemove", handleMove);
    window.addEventListener("mousedown", handleDown);
    window.addEventListener("mouseup", handleUp);

    return () => {
      window.removeEventListener("mousemove", handleMove);
      window.removeEventListener("mousedown", handleDown);
      window.removeEventListener("mouseup", handleUp);
    };
  }, []);

  return (
    <div
      className={`pointer-events-none fixed z-[100] hidden md:block transition-transform duration-150 ${
        active ? "scale-75" : "scale-100"
      }`}
      style={{
        transform: `translate3d(${position.x - 14}px, ${position.y - 14}px, 0)`,
      }}
    >
      <div className="h-7 w-7 rounded-full border border-cyan-300/70 shadow-[0_0_20px_rgba(34,211,238,0.6)]" />
    </div>
  );
};
