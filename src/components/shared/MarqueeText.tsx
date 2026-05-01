interface MarqueeTextProps {
  text: string;
}

export const MarqueeText = ({ text }: MarqueeTextProps) => (
  <div className="overflow-hidden whitespace-nowrap border-y border-white/10 py-4">
    <div className="animate-marquee text-3xl font-semibold uppercase tracking-[0.5em] text-white/80">
      {text}
    </div>
  </div>
);
