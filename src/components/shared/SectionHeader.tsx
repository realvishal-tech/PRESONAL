import { ReactNode } from "react";

interface SectionHeaderProps {
  title: string;
  subtitle?: string;
  action?: ReactNode;
}

export const SectionHeader = ({ title, subtitle, action }: SectionHeaderProps) => (
  <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
    <div>
      <p className="text-sm uppercase tracking-[0.35em] text-cyan-300/80">
        {subtitle}
      </p>
      <h2 className="mt-2 text-3xl font-semibold text-white md:text-4xl">
        {title}
      </h2>
    </div>
    {action}
  </div>
);
