import Link from "next/link";
import { ReactNode } from "react";

interface PrimaryButtonProps {
  href: string;
  children: ReactNode;
}

export const PrimaryButton = ({ href, children }: PrimaryButtonProps) => (
  <Link
    href={href}
    className="inline-flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500 px-6 py-3 text-sm font-semibold text-black shadow-[0_0_20px_rgba(56,189,248,0.4)] transition hover:scale-[1.02]"
  >
    {children}
  </Link>
);
