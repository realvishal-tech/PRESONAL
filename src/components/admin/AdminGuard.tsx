"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { onAuthStateChanged } from "firebase/auth";
import { firebaseAuth, hasFirebaseConfig } from "@/lib/firebase";

interface AdminGuardProps {
  children: React.ReactNode;
}

export const AdminGuard = ({ children }: AdminGuardProps) => {
  const router = useRouter();
  const [ready, setReady] = useState(!hasFirebaseConfig);

  useEffect(() => {
    if (!hasFirebaseConfig || !firebaseAuth) {
      return;
    }

    const unsubscribe = onAuthStateChanged(firebaseAuth, (user) => {
      if (!user) {
        router.replace("/admin");
      } else {
        setReady(true);
      }
    });

    return () => unsubscribe();
  }, [router]);

  if (!ready) {
    return (
      <div className="flex min-h-screen items-center justify-center text-white/70">
        Checking credentials...
      </div>
    );
  }

  if (!hasFirebaseConfig) {
    return (
      <div className="flex min-h-screen items-center justify-center text-white/70">
        Configure Firebase to unlock the admin dashboard.
      </div>
    );
  }

  return <>{children}</>;
};
