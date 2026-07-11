"use client";

import { useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useSession } from "@/lib/auth-client";
import { dashboardPathForRole, normalizeRole } from "@/lib/roles";

export default function DoctorDashboardPage() {
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
    if (role !== "doctor") {
      router.replace(dashboardPathForRole(role));
    }
  }, [isPending, router, session]);

  return (
    <main className="min-h-screen flex items-center justify-center p-4 bg-slate-50">
      <div className="w-full max-w-lg rounded-healora border border-slate-200 bg-white p-8 shadow-sm space-y-3">
        <h1 className="text-2xl font-black text-neutral-text tracking-tight">Doctor Dashboard</h1>
        <p className="text-sm text-slate-600">Your role-based doctor space is active. You can now add schedules, patient queues, and consultation workflows.</p>
        <Link href="/" className="inline-flex text-xs font-bold text-brand-primary hover:underline">
          Back to Home
        </Link>
      </div>
    </main>
  );
}
