"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { getSession, signIn, useSession } from "@/lib/auth-client";
import { dashboardPathForRole, normalizeRole } from "@/lib/roles";

export default function LoginPage() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const router = useRouter();
  const { data: session, isPending: isSessionPending } = useSession();

  useEffect(() => {
    if (!isSessionPending && session?.user) {
      const currentRole = normalizeRole((session.user as { role?: unknown }).role);
      router.replace(dashboardPathForRole(currentRole));
    }
  }, [isSessionPending, router, session]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErrorMessage(null);
    setIsLoading(true);

    const { error } = await signIn.email({
      email: formData.email,
      password: formData.password,
    });

    if (error) {
      setErrorMessage(error.message || "Invalid credentials. Please try again.");
      setIsLoading(false);
      return;
    }

    const sessionResponse = await getSession();
    const role = normalizeRole((sessionResponse?.data?.user as { role?: unknown } | undefined)?.role);
    router.replace(dashboardPathForRole(role));
    setIsLoading(false);
  };

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4 font-sans">
      <div className="bg-white border border-slate-100 p-8 rounded-healora shadow-md max-w-md w-full space-y-6">
        
        {/* Header Summary */}
        <div className="text-center space-y-1">
          <h1 className="text-2xl font-black text-neutral-text tracking-tight">Welcome Back</h1>
          <p className="text-xs text-slate-500 font-medium">Log into your secure Healora account</p>
        </div>

        {/* Credentials Form Layout */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-1">
            <label className="text-xs font-bold text-slate-700">Email Address</label>
            <input
              type="email"
              name="email"
              required
              disabled={isLoading}
              value={formData.email}
              onChange={handleChange}
              placeholder="name@example.com"
              className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-healora text-xs focus:outline-none focus:border-brand-primary focus:bg-white transition-all font-medium disabled:opacity-60"
            />
          </div>

          <div className="space-y-1">
            <div className="flex items-center justify-between">
              <label className="text-xs font-bold text-slate-700">Password</label>
              <Link href="/forgot-password" className="text-[11px] text-slate-400 hover:text-brand-primary transition-colors font-medium">
                Forgot password?
              </Link>
            </div>
            <input
              type="password"
              name="password"
              required
              disabled={isLoading}
              value={formData.password}
              onChange={handleChange}
              placeholder="••••••••"
              className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-healora text-xs focus:outline-none focus:border-brand-primary focus:bg-white transition-all font-medium disabled:opacity-60"
            />
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-3 text-white font-bold text-xs bg-brand-primary hover:bg-brand-primary/90 rounded-healora transition-all shadow-sm hover:shadow-md cursor-pointer text-center flex items-center justify-center disabled:opacity-60"
          >
            {isLoading ? (
              <svg className="animate-spin h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
              </svg>
            ) : (
              "Sign In"
            )}
          </button>

          {errorMessage && (
            <p className="text-[11px] font-semibold text-red-600 bg-red-50 border border-red-100 rounded-healora px-3 py-2">
              {errorMessage}
            </p>
          )}
        </form>

        {/* Alternate Route Redirect Link */}
        <div className="text-center pt-2 border-t border-slate-100 text-[11px] font-medium text-slate-400">
          Don&apos;t have an account yet?{" "}
          <Link href="/register" className="text-brand-primary hover:underline font-bold">
            Sign up here
          </Link>
        </div>

      </div>
    </div>
  );
}