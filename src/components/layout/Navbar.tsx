"use client";

import Link from "next/link";

const links = [
  { label: "About", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Projects", href: "#projects" },
  { label: "Education", href: "#education" },
  { label: "Blog", href: "#blog" },
  { label: "Contact", href: "#contact" },
];

export const Navbar = () => (
  <nav className="fixed top-0 left-0 right-0 z-[50] border-b border-white/10 bg-black/40 backdrop-blur">
    <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
      <Link href="#home" className="text-sm font-semibold uppercase tracking-[0.3em] text-white">
        Vishal
      </Link>
      <div className="hidden items-center gap-6 text-xs uppercase tracking-[0.3em] text-white/70 md:flex">
        {links.map((link) => (
          <a key={link.label} href={link.href} className="transition hover:text-cyan-200">
            {link.label}
          </a>
        ))}
      </div>
      <a
        href="#contact"
        className="rounded-full border border-white/20 px-4 py-2 text-xs uppercase tracking-[0.3em] text-white/80"
      >
        Hire Me
      </a>
    </div>
  </nav>
);
