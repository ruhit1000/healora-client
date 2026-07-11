"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "@/lib/auth-client";
import { dashboardPathForRole, normalizeRole } from "@/lib/roles";

export default function DashboardRedirectPage() {
  const router = useRouter();
  const { data: session, isPending } = useSession();

  useEffect(() => {
    if (isPending) {
      return;
    }

    if (!session?.user) {
      router.replace("/login");
      return;
    }

    const role = normalizeRole((session.user as { role?: unknown }).role);
    router.replace(dashboardPathForRole(role));
  }, [isPending, router, session]);

  return (
    <main className="min-h-screen flex items-center justify-center p-4 bg-slate-50">
      <p className="text-sm font-semibold text-slate-600">Routing your dashboard...</p>
    </main>
  );
}
