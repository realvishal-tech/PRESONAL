"use client";

import { useRouter } from "next/navigation";
import { signOut } from "firebase/auth";
import { firebaseAuth } from "@/lib/firebase";

interface AdminLayoutProps {
  children: React.ReactNode;
}

export const AdminLayout = ({ children }: AdminLayoutProps) => {
  const router = useRouter();

  const handleLogout = async () => {
    if (firebaseAuth) {
      await signOut(firebaseAuth);
    }
    router.replace("/admin");
  };

  return (
    <div className="min-h-screen bg-black/90 text-white">
      <div className="mx-auto flex max-w-6xl flex-col gap-6 px-6 py-10">
        <div className="flex flex-wrap items-center justify-between gap-4 rounded-3xl border border-white/10 bg-white/5 p-6">
          <div>
            <p className="text-xs uppercase tracking-[0.35em] text-cyan-300/70">
              Admin Dashboard
            </p>
            <h1 className="mt-2 text-2xl font-semibold">
              Vishal Portfolio Control Center
            </h1>
          </div>
          <button
            type="button"
            onClick={handleLogout}
            className="rounded-full border border-white/20 px-4 py-2 text-xs uppercase tracking-[0.3em]"
          >
            Log out
          </button>
        </div>
        {children}
      </div>
    </div>
  );
};
