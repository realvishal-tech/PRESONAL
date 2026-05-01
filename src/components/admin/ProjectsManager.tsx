"use client";

import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import {
  addDocument,
  deleteDocument,
  fetchCollection,
  updateDocument,
  uploadFile,
} from "@/lib/firestore";
import { fallbackProjects } from "@/data/fallback";

interface Project {
  id: string;
  title: string;
  description: string;
  image: string;
  stack: string[];
  category: string;
  liveUrl: string;
}

const initialForm = {
  title: "",
  description: "",
  image: "",
  stack: "",
  category: "Web",
  liveUrl: "",
};

export const ProjectsManager = () => {
  const [projects, setProjects] = useState<Project[]>(fallbackProjects);
  const [form, setForm] = useState(initialForm);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [file, setFile] = useState<File | null>(null);

  const refreshProjects = async () => {
    const data = await fetchCollection<Project>("projects");
    if (data.length) {
      setProjects(data);
    }
  };

  useEffect(() => {
    Promise.resolve().then(() => refreshProjects());
  }, []);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      let imageUrl = form.image;
      if (file) {
        imageUrl = await uploadFile(file, "projects");
      }
      const payload = {
        ...form,
        image: imageUrl,
        stack: form.stack.split(",").map((item) => item.trim()),
      };
      if (editingId) {
        await updateDocument("projects", editingId, payload);
        toast.success("Project updated");
      } else {
        await addDocument("projects", payload);
        toast.success("Project added");
      }
      setForm(initialForm);
      setEditingId(null);
      setFile(null);
      refreshProjects();
    } catch {
      toast.error("Configure Firebase to manage projects.");
    }
  };

  const handleEdit = (project: Project) => {
    setEditingId(project.id);
    setForm({
      title: project.title,
      description: project.description,
      image: project.image,
      stack: project.stack.join(", "),
      category: project.category,
      liveUrl: project.liveUrl,
    });
  };

  const handleDelete = async (id: string) => {
    try {
      await deleteDocument("projects", id);
      toast.success("Project removed");
      refreshProjects();
    } catch {
      toast.error("Unable to delete project.");
    }
  };

  return (
    <div className="space-y-6 rounded-3xl border border-white/10 bg-white/5 p-6">
      <h2 className="text-lg font-semibold">Projects</h2>
      <form onSubmit={handleSubmit} className="grid gap-4 md:grid-cols-2">
        <input
          placeholder="Project title"
          value={form.title}
          onChange={(event) => setForm({ ...form, title: event.target.value })}
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
        <input
          placeholder="Stack (comma separated)"
          value={form.stack}
          onChange={(event) => setForm({ ...form, stack: event.target.value })}
          className="rounded-2xl border border-white/10 bg-black/40 px-4 py-2 text-sm md:col-span-2"
        />
        <input
          placeholder="Live URL"
          value={form.liveUrl}
          onChange={(event) => setForm({ ...form, liveUrl: event.target.value })}
          className="rounded-2xl border border-white/10 bg-black/40 px-4 py-2 text-sm"
        />
        <input
          placeholder="Image URL"
          value={form.image}
          onChange={(event) => setForm({ ...form, image: event.target.value })}
          className="rounded-2xl border border-white/10 bg-black/40 px-4 py-2 text-sm"
        />
        <textarea
          placeholder="Description"
          value={form.description}
          onChange={(event) =>
            setForm({ ...form, description: event.target.value })
          }
          className="min-h-[120px] rounded-2xl border border-white/10 bg-black/40 px-4 py-2 text-sm md:col-span-2"
        />
        <input
          type="file"
          onChange={(event) => setFile(event.target.files?.[0] || null)}
          className="rounded-2xl border border-white/10 bg-black/40 px-4 py-2 text-sm md:col-span-2"
        />
        <button
          type="submit"
          className="rounded-full bg-cyan-500/20 px-4 py-2 text-sm"
        >
          {editingId ? "Update Project" : "Add Project"}
        </button>
      </form>
      <div className="space-y-3">
        {projects.map((project) => (
          <div
            key={project.id}
            className="flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-white/10 bg-black/40 px-4 py-3 text-sm"
          >
            <div>
              <p className="font-semibold text-white">{project.title}</p>
              <p className="text-white/60">{project.category}</p>
            </div>
            <div className="flex gap-3">
              <button
                type="button"
                onClick={() => handleEdit(project)}
                className="text-cyan-200"
              >
                Edit
              </button>
              <button
                type="button"
                onClick={() => handleDelete(project.id)}
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
