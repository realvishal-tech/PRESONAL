"use client";

import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import {
  addDocument,
  deleteDocument,
  fetchCollection,
  updateDocument,
} from "@/lib/firestore";
import { fallbackSkills } from "@/data/fallback";

interface Skill {
  id: string;
  name: string;
  level: number;
  category: string;
}

const initialForm = { name: "", level: 70, category: "Web" };

export const SkillsManager = () => {
  const [skills, setSkills] = useState<Skill[]>(fallbackSkills);
  const [form, setForm] = useState(initialForm);
  const [editingId, setEditingId] = useState<string | null>(null);

  const refreshSkills = async () => {
    const data = await fetchCollection<Skill>("skills");
    if (data.length) {
      setSkills(data);
    }
  };

  useEffect(() => {
    Promise.resolve().then(() => refreshSkills());
  }, []);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      if (editingId) {
        await updateDocument("skills", editingId, form);
        toast.success("Skill updated");
      } else {
        await addDocument("skills", form);
        toast.success("Skill added");
      }
      setForm(initialForm);
      setEditingId(null);
      refreshSkills();
    } catch {
      toast.error("Configure Firebase to manage skills.");
    }
  };

  const handleEdit = (skill: Skill) => {
    setEditingId(skill.id);
    setForm({ name: skill.name, level: skill.level, category: skill.category });
  };

  const handleDelete = async (id: string) => {
    try {
      await deleteDocument("skills", id);
      toast.success("Skill removed");
      refreshSkills();
    } catch {
      toast.error("Unable to delete skill.");
    }
  };

  return (
    <div className="space-y-6 rounded-3xl border border-white/10 bg-white/5 p-6">
      <h2 className="text-lg font-semibold">Skills</h2>
      <form onSubmit={handleSubmit} className="grid gap-4 md:grid-cols-3">
        <input
          placeholder="Skill name"
          value={form.name}
          onChange={(event) => setForm({ ...form, name: event.target.value })}
          className="rounded-2xl border border-white/10 bg-black/40 px-4 py-2 text-sm"
        />
        <input
          type="number"
          min={1}
          max={100}
          value={form.level}
          onChange={(event) =>
            setForm({ ...form, level: Number(event.target.value) })
          }
          className="rounded-2xl border border-white/10 bg-black/40 px-4 py-2 text-sm"
        />
        <input
          placeholder="Category"
          value={form.category}
          onChange={(event) =>
            setForm({ ...form, category: event.target.value })
          }
          className="rounded-2xl border border-white/10 bg-black/40 px-4 py-2 text-sm"
        />
        <button
          type="submit"
          className="rounded-full bg-cyan-500/20 px-4 py-2 text-sm md:col-span-3"
        >
          {editingId ? "Update Skill" : "Add Skill"}
        </button>
      </form>
      <div className="space-y-3">
        {skills.map((skill) => (
          <div
            key={skill.id}
            className="flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-white/10 bg-black/40 px-4 py-3 text-sm"
          >
            <div>
              <p className="font-semibold text-white">{skill.name}</p>
              <p className="text-white/60">{skill.category}</p>
            </div>
            <div className="flex gap-3">
              <button
                type="button"
                onClick={() => handleEdit(skill)}
                className="text-cyan-200"
              >
                Edit
              </button>
              <button
                type="button"
                onClick={() => handleDelete(skill.id)}
                className="text-red-300"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
