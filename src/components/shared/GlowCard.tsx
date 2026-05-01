import { ReactNode } from "react";

interface GlowCardProps {
  children: ReactNode;
  className?: string;
}

export const GlowCard = ({ children, className }: GlowCardProps) => (
  <div
    className={`relative overflow-hidden rounded-3xl border border-white/10 bg-white/5 p-6 shadow-[0_0_30px_rgba(56,189,248,0.15)] backdrop-blur ${
      className || ""
    }`}
  >
    <div className="absolute inset-0 opacity-0 transition hover:opacity-100">
      <div className="absolute -left-12 top-0 h-24 w-24 rounded-full bg-cyan-400/20 blur-2xl" />
      <div className="absolute bottom-0 right-0 h-24 w-24 rounded-full bg-purple-400/20 blur-2xl" />
    </div>
    <div className="relative z-10">{children}</div>
  </div>
);
