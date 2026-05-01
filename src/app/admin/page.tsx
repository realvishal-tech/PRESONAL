"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { signInWithEmailAndPassword } from "firebase/auth";
import toast from "react-hot-toast";
import { firebaseAuth, hasFirebaseConfig } from "@/lib/firebase";

const ADMIN_EMAIL =
  process.env.NEXT_PUBLIC_ADMIN_EMAIL || "admin@vishal.dev";

export default function AdminLoginPage() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!hasFirebaseConfig || !firebaseAuth) {
      toast.error("Firebase is not configured yet.");
      return;
    }

    setLoading(true);
    try {
      const email = username === "admin" ? ADMIN_EMAIL : username;
      await signInWithEmailAndPassword(firebaseAuth, email, password);
      toast.success("Welcome back, Vishal!");
      router.push("/admin/dashboard");
    } catch {
      toast.error("Invalid credentials.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-black/90 px-6 text-white">
      <div className="w-full max-w-md rounded-3xl border border-white/10 bg-white/5 p-8 backdrop-blur">
        <p className="text-xs uppercase tracking-[0.35em] text-cyan-300/70">
          Admin Access
        </p>
        <h1 className="mt-4 text-2xl font-semibold">Secure Login</h1>
        <p className="mt-2 text-sm text-white/60">
          Username: <span className="text-cyan-200">admin</span>
        </p>
        <form onSubmit={handleLogin} className="mt-6 space-y-4">
          <input
            value={username}
            onChange={(event) => setUsername(event.target.value)}
            placeholder="Username or admin email"
            className="w-full rounded-2xl border border-white/10 bg-black/40 px-4 py-3 text-sm"
          />
          <input
            type="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            placeholder="Password"
            className="w-full rounded-2xl border border-white/10 bg-black/40 px-4 py-3 text-sm"
          />
          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-full bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500 px-6 py-3 text-sm font-semibold text-black"
          >
            {loading ? "Authenticating..." : "Login"}
          </button>
        </form>
        {!hasFirebaseConfig && (
          <p className="mt-4 text-xs text-red-300">
            Configure Firebase credentials in .env.local to enable admin login.
          </p>
        )}
      </div>
    </div>
  );
}
