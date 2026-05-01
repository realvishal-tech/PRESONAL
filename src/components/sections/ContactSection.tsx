"use client";

import { useState } from "react";
import toast from "react-hot-toast";
import { fallbackSocials } from "@/data/fallback";
import { addDocument, recordAnalytics } from "@/lib/firestore";
import { SectionHeader } from "../shared/SectionHeader";

export const ContactSection = () => {
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormState((prev) => ({
      ...prev,
      [event.target.name]: event.target.value,
    }));
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!formState.name || !formState.email || !formState.message) {
      toast.error("Please fill out all fields.");
      return;
    }
    setLoading(true);
    try {
      await addDocument("contacts", formState);
      await recordAnalytics("interactions", 1);
      toast.success("Message sent successfully!");
      setFormState({ name: "", email: "", message: "" });
    } catch {
      toast.error("Unable to send message. Configure Firebase first.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="contact" className="py-20">
      <div className="mx-auto max-w-6xl px-6">
        <SectionHeader
          title="Contact"
          subtitle="Let’s Connect"
        />
        <div className="mt-10 grid gap-8 lg:grid-cols-[1fr_0.8fr]">
          <form
            onSubmit={handleSubmit}
            className="space-y-4 rounded-3xl border border-white/10 bg-white/5 p-8 backdrop-blur"
          >
            <div className="grid gap-4 md:grid-cols-2">
              <input
                name="name"
                value={formState.name}
                onChange={handleChange}
                placeholder="Your name"
                className="rounded-2xl border border-white/10 bg-black/40 px-4 py-3 text-sm text-white outline-none focus:border-cyan-300"
              />
              <input
                name="email"
                type="email"
                value={formState.email}
                onChange={handleChange}
                placeholder="Email address"
                className="rounded-2xl border border-white/10 bg-black/40 px-4 py-3 text-sm text-white outline-none focus:border-cyan-300"
              />
            </div>
            <textarea
              name="message"
              value={formState.message}
              onChange={handleChange}
              rows={5}
              placeholder="Tell Vishal about your project..."
              className="w-full rounded-2xl border border-white/10 bg-black/40 px-4 py-3 text-sm text-white outline-none focus:border-cyan-300"
            />
            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-full bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500 px-6 py-3 text-sm font-semibold text-black shadow-lg transition hover:scale-[1.01]"
            >
              {loading ? "Sending..." : "Send Message"}
            </button>
          </form>
          <div className="space-y-6 rounded-3xl border border-white/10 bg-white/5 p-8 text-white/70 backdrop-blur">
            <p className="text-lg text-white">
              Ready to collaborate or just say hello? I respond quickly.
            </p>
            <div className="space-y-3">
              {fallbackSocials.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  className="flex items-center justify-between rounded-2xl border border-white/10 bg-black/40 px-4 py-3 text-sm"
                  target="_blank"
                  rel="noreferrer"
                >
                  <span>{social.label}</span>
                  <span className="text-cyan-200">Visit</span>
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
