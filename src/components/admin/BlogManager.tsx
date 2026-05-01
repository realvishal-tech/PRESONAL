"use client";

import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import {
  addDocument,
  deleteDocument,
  fetchCollection,
  updateDocument,
} from "@/lib/firestore";
import { fallbackBlogs } from "@/data/fallback";

interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  tag: string;
  createdAt: string;
}

const initialForm = {
  title: "",
  excerpt: "",
  content: "",
  tag: "Learning",
  createdAt: new Date().toISOString().slice(0, 10),
};

export const BlogManager = () => {
  const [posts, setPosts] = useState<BlogPost[]>(fallbackBlogs);
  const [form, setForm] = useState(initialForm);
  const [editingId, setEditingId] = useState<string | null>(null);

  const refreshPosts = async () => {
    const data = await fetchCollection<BlogPost>("blogs");
    if (data.length) {
      setPosts(data);
    }
  };

  useEffect(() => {
    Promise.resolve().then(() => refreshPosts());
  }, []);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      if (editingId) {
        await updateDocument("blogs", editingId, form);
        toast.success("Blog updated");
      } else {
        await addDocument("blogs", form);
        toast.success("Blog added");
      }
      setForm(initialForm);
      setEditingId(null);
      refreshPosts();
    } catch {
      toast.error("Configure Firebase to manage blogs.");
    }
  };

  const handleEdit = (post: BlogPost) => {
    setEditingId(post.id);
    setForm({
      title: post.title,
      excerpt: post.excerpt,
      content: post.content,
      tag: post.tag,
      createdAt: post.createdAt,
    });
  };

  const handleDelete = async (id: string) => {
    try {
      await deleteDocument("blogs", id);
      toast.success("Blog removed");
      refreshPosts();
    } catch {
      toast.error("Unable to delete blog.");
    }
  };

  return (
    <div className="space-y-6 rounded-3xl border border-white/10 bg-white/5 p-6">
      <h2 className="text-lg font-semibold">Blogs</h2>
      <form onSubmit={handleSubmit} className="grid gap-4">
        <input
          placeholder="Title"
          value={form.title}
          onChange={(event) => setForm({ ...form, title: event.target.value })}
          className="rounded-2xl border border-white/10 bg-black/40 px-4 py-2 text-sm"
        />
        <input
          placeholder="Tag"
          value={form.tag}
          onChange={(event) => setForm({ ...form, tag: event.target.value })}
          className="rounded-2xl border border-white/10 bg-black/40 px-4 py-2 text-sm"
        />
        <input
          type="date"
          value={form.createdAt}
          onChange={(event) =>
            setForm({ ...form, createdAt: event.target.value })
          }
          className="rounded-2xl border border-white/10 bg-black/40 px-4 py-2 text-sm"
        />
        <textarea
          placeholder="Excerpt"
          value={form.excerpt}
          onChange={(event) => setForm({ ...form, excerpt: event.target.value })}
          className="min-h-[80px] rounded-2xl border border-white/10 bg-black/40 px-4 py-2 text-sm"
        />
        <textarea
          placeholder="Markdown content"
          value={form.content}
          onChange={(event) => setForm({ ...form, content: event.target.value })}
          className="min-h-[140px] rounded-2xl border border-white/10 bg-black/40 px-4 py-2 text-sm"
        />
        <button
          type="submit"
          className="rounded-full bg-cyan-500/20 px-4 py-2 text-sm"
        >
          {editingId ? "Update Blog" : "Add Blog"}
        </button>
      </form>
      <div className="space-y-3">
        {posts.map((post) => (
          <div
            key={post.id}
            className="flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-white/10 bg-black/40 px-4 py-3 text-sm"
          >
            <div>
              <p className="font-semibold text-white">{post.title}</p>
              <p className="text-white/60">{post.tag}</p>
            </div>
            <div className="flex gap-3">
              <button
                type="button"
                onClick={() => handleEdit(post)}
                className="text-cyan-200"
              >
                Edit
              </button>
              <button
                type="button"
                onClick={() => handleDelete(post.id)}
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
